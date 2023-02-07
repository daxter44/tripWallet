import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TripStoreModule } from './shared/store/trips/trip-store.module';
import { CostStoreModule } from './shared/store/costs/cost-store.module';
import { EffectsModule } from '@ngrx/effects';
import { StorageService } from './shared/services/storage.service';
import { CurrencyStoreModule } from './shared/store/currencies/currency-store.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    TripStoreModule,
    CostStoreModule,
    CurrencyStoreModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true,
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
