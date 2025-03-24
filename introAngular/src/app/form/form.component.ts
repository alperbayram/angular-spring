import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService, FormErrors } from './form.service';

@Component({
  selector: 'app-register',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup | undefined;
  formErrors: FormErrors = {};
  submitting = false;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    // Form oluşturma
    this.userForm = this.formService.createUserForm();

    // Form değişikliklerini dinleme
    this.userForm.valueChanges.subscribe(() => {
      if (this.submitted) {
        this.formErrors = this.formService.getFormErrors(this.userForm);
      }
    });
  }

  // Form gönderme işlemi
  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.formErrors = this.formService.getFormErrors(this.userForm);

    if (this.userForm.valid) {
      this.submitting = true;

      this.formService
        .submitForm('users/register', this.userForm.value)
        .subscribe({
          next: (response) => {
            this.successMessage = 'Kayıt işlemi başarıyla tamamlandı!';
            this.userForm.reset();
            this.submitted = false;
          },
          error: (error) => {
            this.errorMessage =
              error.message ||
              'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.';
          },
          complete: () => {
            this.submitting = false;
          },
        });
    } else {
      // Tüm form alanlarını doğrula ve hataları göster
      this.formService.validateAllFormFields(this.userForm);
      this.formErrors = this.formService.getFormErrors(this.userForm);
    }
  }

  // Bir form kontrolünün geçerli olup olmadığını kontrol eder
  isControlInvalid(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    return (
      !!control &&
      control.invalid &&
      (control.dirty || control.touched || this.submitted)
    );
  }
}
