import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { currency } from '../interfaces/currency.interface';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  constructor(private http: HttpClient, private toastService: ToastService) {}

  getCurrencies() {
    return this.http.get('https://api.exchangerate.host/symbols').pipe(
      catchError((err) => {
        this.toastService.showOfflineToast();
        return throwError(err);
      })
    );
  }

  getExchangeRate(from: string, to: string) {
    return this.http
      .get(`https://api.exchangerate.host/convert?from=${from}&to=${to}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
