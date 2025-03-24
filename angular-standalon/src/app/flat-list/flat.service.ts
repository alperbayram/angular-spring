import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FlatItem {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class FlatService {
  private apiUrl = 'http://localhost:8080/flat/getAllFlats';

  constructor(private http: HttpClient) {}

  getAllFlats(): Observable<FlatItem[]> {
    return this.http.get<FlatItem[]>(this.apiUrl);
  }
}
