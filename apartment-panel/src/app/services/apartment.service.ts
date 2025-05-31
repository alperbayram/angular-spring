import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  private apiUrl = 'http://localhost:8080/apartments';
  private http = inject(HttpClient);

  createApartment(apartmentData: {
    name: string;
    address: string;
    flatNumber: string;
    floor: number;
    type: string;
    ownerName: string;
    ownerPhone: string;
  }): Observable<any> {
    const formData = new FormData();

    // Apartment info
    formData.append('name', apartmentData.name);
    formData.append('address', apartmentData.address);

    // Initial flat info
    formData.append('flatNumber', apartmentData.flatNumber);
    formData.append('floor', apartmentData.floor.toString());
    formData.append('type', apartmentData.type);
    formData.append('ownerName', apartmentData.ownerName);
    formData.append('ownerPhone', apartmentData.ownerPhone);

    return this.http.post<any>(this.apiUrl, formData);
  }

  getApartments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getApartmentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteApartment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
