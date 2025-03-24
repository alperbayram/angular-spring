import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface FlatForm {
  name: string;
}

@Component({
  selector: 'app-flat-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './flat-form.component.html',
  styleUrls: ['./flat-form.component.css'],
})
export class FlatFormComponent {
  formData: FlatForm = {
    name: '',
  };

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    // Form validation
    if (!this.formData.name) {
      this.errorMessage = 'Please fill in all fields';
      setTimeout(() => (this.errorMessage = ''), 3000);
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Create URL parameters from form data
    const params = new URLSearchParams();
    params.set('name', this.formData.name);

    // Send POST request with URL parameters to the Spring Boot backend
    this.http
      .post(`http://localhost:8080/flat/save?${params.toString()}`, {})
      .subscribe({
        next: (response) => {
          console.log('Form submitted successfully', response);
          this.successMessage = 'Form submitted successfully!';

          // Reset the form
          this.formData = {
            name: '',
          };

          this.isSubmitting = false;

          // Clear success message after 3 seconds
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: (error) => {
          console.error('Error submitting form', error);
          this.errorMessage = 'Error submitting form. Please try again.';
          this.isSubmitting = false;

          // Clear error message after 3 seconds
          setTimeout(() => (this.errorMessage = ''), 3000);
        },
      });
  }
}
