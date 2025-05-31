import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApartmentService } from '../services/apartment.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  view: [number, number] = [600, 400];

  dashboardForm!: FormGroup;
  submitted = false;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private apartmentService: ApartmentService,
    private router: Router
  ) {
    this.dashboardForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      flatNumber: ['', Validators.required],
      floor: ['', Validators.required],
      type: ['', Validators.required],
      ownerName: ['', Validators.required],
      ownerPhone: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9\s-]{10,15}$/)],
      ],
    });
  }

  get f() {
    return this.dashboardForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.dashboardForm.invalid) {
      return;
    }
    this.loading = true;
    const apartmentData = {
      name: this.f['name'].value,
      address: this.f['address'].value,
      flatNumber: this.f['flatNumber'].value,
      floor: this.f['floor'].value,
      type: this.f['type'].value,
      ownerName: this.f['ownerName'].value,
      ownerPhone: this.f['ownerPhone'].value,
    };
    this.apartmentService.createApartment(apartmentData).subscribe({
      next: (response) => {
        this.successMessage = 'Apartment and first flat created successfully!';
        this.loading = false;
        this.dashboardForm.reset();
        this.submitted = false;

        setTimeout(() => {
          this.router.navigate(['/apartments']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Creation failed';
        this.loading = false;
      },
    });
  }
}
