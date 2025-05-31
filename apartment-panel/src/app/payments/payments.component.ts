import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from 'express';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-payments',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css',
})
export class PaymentsComponent {
  currentUser: any;
  paymentForm!: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  successMessage = '';

  fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private paymentService = inject(PaymentService);

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required],
      apartment: ['', Validators.required],
      daireNumarasi: ['', Validators.required],
    });
  }

  get f() {
    return this.paymentForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.paymentForm.invalid) {
      return;
    }
    this.loading = true;
    const paymentData = {
      title: this.f['title'].value,
      description: this.f['description'].value,
      amount: this.f['amount'].value,
      apartment: this.f['apartment'].value,
      daireNumarasi: this.f['daireNo'].value,
    };
    this.paymentService.createPayment(paymentData).subscribe({
      next: (response) => {
        this.successMessage = 'Payment successfully recorded!';
        this.loading = false;

        setTimeout(() => {
          this.paymentForm.reset();
          this.submitted = false;
          this.successMessage = '';
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Payment failed';
        this.loading = false;
      },
    });
  }
}
