import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface FlatItem {
  id: number | string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class FlatService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllFlats(): Observable<FlatItem[]> {
    return this.http.get<FlatItem[]>(`${this.apiUrl}/flat/getAllFlats`);
  }

  getFlatById(id: string | number): Observable<FlatItem> {
    return this.http.get<FlatItem>(`${this.apiUrl}/flat/load/${id}`);
  }

  updateFlat(id: string, flat: FlatItem): Observable<FlatItem> {
    return this.http.put<FlatItem>(`${this.apiUrl}/${id}`, flat);
  }

  // Flat sil
  // deleteFlat(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }

  deleteFlat(id: string): Observable<any> {
    try {
      return this.http.delete(`${this.apiUrl}/flats/${id}`).pipe(
        catchError((error) => {
          console.error('API hatası:', error);
          return throwError(() => new Error('Flat silinemedi.'));
        })
      );
    } catch (error) {
      console.error('Beklenmeyen servis hatası:', error);
      return throwError(() => new Error('Servis hatası oluştu.'));
    }
  }
}
