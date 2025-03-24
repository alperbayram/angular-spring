import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface FormErrors {
  [key: string]: string;
}

export interface ValidationMessages {
  [key: string]: {
    [key: string]: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = 'https://api.example.com'; // API URL'inizi buraya ekleyin

  // Validasyon mesajları - ihtiyaca göre özelleştirilebilir
  validationMessages: ValidationMessages = {
    name: {
      required: 'İsim alanı zorunludur.',
      minlength: 'İsim en az 2 karakter olmalıdır.',
      maxlength: 'İsim 50 karakterden fazla olamaz.',
    },
    email: {
      required: 'E-posta alanı zorunludur.',
      email: 'Geçerli bir e-posta adresi girin.',
    },
    password: {
      required: 'Şifre alanı zorunludur.',
      minlength: 'Şifre en az 6 karakter olmalıdır.',
      pattern:
        'Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.',
    },
    phoneNumber: {
      required: 'Telefon numarası zorunludur.',
      pattern: 'Geçerli bir telefon numarası girin.',
    },
  };

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  /**
   * Kullanıcı kaydı için form oluşturur
   */
  createUserForm(): FormGroup {
    return this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/),
        ],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
    });
  }

  /**
   * Form hata mesajlarını alır
   */
  getFormErrors(form: FormGroup): FormErrors {
    const errors: FormErrors = {};

    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      if (control && !control.valid && (control.touched || control.dirty)) {
        const messages = this.validationMessages[key];
        if (messages) {
          errors[key] = '';
          for (const errorKey in control.errors) {
            if (messages[errorKey]) {
              errors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });

    return errors;
  }

  /**
   * Form verilerini API'ye gönderir
   */
  submitForm(endpoint: string, formData: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.post(url, formData).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        let errorMsg = 'Form gönderilirken bir hata oluştu.';
        if (error.error instanceof ErrorEvent) {
          // İstemci taraflı hata
          errorMsg = `Hata: ${error.error.message}`;
        } else {
          // Sunucu taraflı hata
          errorMsg = `Hata Kodu: ${error.status}, Mesaj: ${error.message}`;
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  /**
   * Form doğrulama işlemi
   */
  validateAllFormFields(form: FormGroup): void {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }
}
