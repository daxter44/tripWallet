import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  
  constructor(private http: HttpClient) { }
  
  getExchangeRate(from: string, to: string) {
    return this.http.get(`https://api.exchangerate.host/convert?from=${from}&to=${to}`)
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }
}
