import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://fakestoreapi.com';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(
      retry(1),
      catchError(this.handleError('getProducts'))
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`).pipe(
      retry(1),
      catchError(this.handleError('getProduct'))
    );
  }

  private handleError(op: string) {
    return (err: any) => {
      console.error(`[ApiService] ${op} failed`, err);
      return throwError(() => new Error('Failed to load data. Please try again.'));
    };
  }
}
