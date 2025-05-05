import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/flat'; // Replace with your actual API URL
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>;

  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    return this.http.post<any>(`${this.apiUrl}/auth/login`, formData).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }

  register(userData: {
    email: string;
    password: string;
    name: string;
    surname: string;
    phone: string;
  }): Observable<any> {
    const formData = new FormData();
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('name', userData.name);
    formData.append('surname', userData.surname);
    formData.append('phone', userData.phone);

    return this.http.post<any>(`${this.apiUrl}/auth/register`, formData);
  }

  logout(): void {
    // Remove user from local storage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}
