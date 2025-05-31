import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/payments';

  private http = inject(HttpClient);

  createPayment(paymentData: {
    title: string;
    description: string;
    amount: number;
    apartment: string;
    daireNumarasi: number;
  }): Observable<any> {
    const formData = new FormData();
    formData.append('title', paymentData.title);
    formData.append('description', paymentData.description);
    formData.append('amount', paymentData.amount.toString());
    formData.append('apartment', paymentData.apartment);
    formData.append('daireNo', paymentData.daireNumarasi.toString());

    return this.http.post<any>(`${this.apiUrl}`, formData);
  }

  getPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getPaymentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
