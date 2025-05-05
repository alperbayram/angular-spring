import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h2>Kayıt Ol</h2>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              placeholder="Email adresinizi girin"
            />
            <div
              *ngIf="
                registerForm.get('email')?.invalid &&
                registerForm.get('email')?.touched
              "
              class="error-message"
            >
              <span *ngIf="registerForm.get('email')?.errors?.['required']"
                >Email alanı zorunludur</span
              >
              <span *ngIf="registerForm.get('email')?.errors?.['email']"
                >Geçerli bir email adresi girin</span
              >
            </div>
          </div>

          <div class="form-group">
            <label for="password">Şifre</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              placeholder="Şifrenizi girin"
            />
            <div
              *ngIf="
                registerForm.get('password')?.invalid &&
                registerForm.get('password')?.touched
              "
              class="error-message"
            >
              <span *ngIf="registerForm.get('password')?.errors?.['required']"
                >Şifre alanı zorunludur</span
              >
              <span *ngIf="registerForm.get('password')?.errors?.['minlength']"
                >Şifre en az 6 karakter olmalıdır</span
              >
            </div>
          </div>

          <div class="form-group">
            <label for="apartmentName">Apartman Adı</label>
            <input
              type="text"
              id="apartmentName"
              formControlName="apartmentName"
              placeholder="Apartman adını girin"
            />
            <div
              *ngIf="
                registerForm.get('apartmentName')?.invalid &&
                registerForm.get('apartmentName')?.touched
              "
              class="error-message"
            >
              <span
                *ngIf="registerForm.get('apartmentName')?.errors?.['required']"
                >Apartman adı zorunludur</span
              >
            </div>
          </div>

          <button type="submit" [disabled]="registerForm.invalid || isLoading">
            {{ isLoading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol' }}
          </button>

          <div *ngIf="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <div class="login-link">
            Zaten hesabınız var mı? <a routerLink="/login">Giriş Yap</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .register-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f5f5f5;
      }

      .register-card {
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
      }

      h2 {
        text-align: center;
        margin-bottom: 1.5rem;
        color: #333;
      }

      .form-group {
        margin-bottom: 1rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }

      input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
      }

      button {
        width: 100%;
        padding: 0.75rem;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        margin-top: 1rem;
      }

      button:disabled {
        background-color: #9e9e9e;
        cursor: not-allowed;
      }

      .error-message {
        color: #f44336;
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }

      .login-link {
        text-align: center;
        margin-top: 1rem;
        font-size: 0.9rem;
      }

      a {
        color: #2196f3;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      apartmentName: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password, apartmentName } = this.registerForm.value;

    this.authService.register(email, password, apartmentName).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login'], {
          queryParams: { registered: 'true' },
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          error.error?.message || 'Kayıt olurken bir hata oluştu.';
      },
    });
  }
}
