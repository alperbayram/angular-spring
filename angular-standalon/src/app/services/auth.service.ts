import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    console.log('Login method called with:', { email, password });

    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post(`${this.apiUrl}/auth/login`, null, { params }).pipe(
      tap((response) => {
        console.log('Login response:', response);
        if (response === true) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', email);
        }
      })
    );
  }

  register(
    email: string,
    password: string,
    apartmentName: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password)
      .set('apartmentName', apartmentName);

    return this.http.post(`${this.apiUrl}/auth/register`, null, { params });
  }

  logout(): void {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  getToken(): string | null {
    // Token olmadığından burada null dönüyoruz
    // Veya kullanıcı email'ini dönebiliriz
    return localStorage.getItem('userEmail');
  }
}
