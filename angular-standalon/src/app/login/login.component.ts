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
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Giriş Yap</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
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
                loginForm.get('email')?.invalid &&
                loginForm.get('email')?.touched
              "
              class="error-message"
            >
              <span *ngIf="loginForm.get('email')?.errors?.['required']"
                >Email alanı zorunludur</span
              >
              <span *ngIf="loginForm.get('email')?.errors?.['email']"
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
                loginForm.get('password')?.invalid &&
                loginForm.get('password')?.touched
              "
              class="error-message"
            >
              <span *ngIf="loginForm.get('password')?.errors?.['required']"
                >Şifre alanı zorunludur</span
              >
              <span *ngIf="loginForm.get('password')?.errors?.['minlength']"
                >Şifre en az 6 karakter olmalıdır</span
              >
            </div>
          </div>

          <button type="submit" [disabled]="loginForm.invalid || isLoading">
            {{ isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap' }}
          </button>

          <div *ngIf="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <div class="register-link">
            Hesabınız yok mu? <a routerLink="/register">Kayıt Ol</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f5f5f5;
      }

      .login-card {
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

      .register-link {
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
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        this.errorMessage =
          error.error?.message || 'Giriş yapılırken bir hata oluştu.';
      },
    });
  }
}
