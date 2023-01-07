import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripsPageRoutingModule } from './trips-routing.module';

import { TripsPage } from './trips.page';
import { CreateComponent } from './containers/create/create.component';
import { ListComponent } from './containers/list/list.component';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCostComponent } from './containers/add-cost/add-cost.component';
import { tripsFeature } from 'src/app/shared/store/trips/trip.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    TripsPageRoutingModule
  ],providers: [
    DatePipe
  ],
  declarations: [TripsPage, CreateComponent, ListComponent, AddCostComponent]
})
export class TripsPageModule {}
