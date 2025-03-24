import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Apartment {
  id: number;
  userId: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-apartment',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './apartment.component.html',
  styleUrl: './apartment.component.css',
})
export class ApartmentComponent implements OnInit {
  apartments: Apartment[] = [];
  filteredApartments: Apartment[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchApartments();
  }

  fetchApartments(): void {
    this.loading = true;
    this.error = null;

    this.http.get<Apartment[]>('http://localhost:8080/api/posts').subscribe({
      next: (data) => {
        this.apartments = data;
        this.filteredApartments = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching apartments:', err);
        this.error = 'Failed to load apartments. Please try again later.';
        this.loading = false;
      },
    });
  }

  searchApartments(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();

    if (!searchTerm) {
      this.filteredApartments = this.apartments;
      return;
    }

    this.filteredApartments = this.apartments.filter(
      (apartment) =>
        apartment.title.toLowerCase().includes(searchTerm) ||
        apartment.body.toLowerCase().includes(searchTerm)
    );
  }
}
