import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CurrencyEffects } from './currency.effects';
import { currencyFeature } from './currency.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(currencyFeature),
    EffectsModule.forFeature([CurrencyEffects]),
    HttpClientModule,
  ],
})
export class CurrencyStoreModule {}
