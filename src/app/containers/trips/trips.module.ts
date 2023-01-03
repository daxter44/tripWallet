import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripsPageRoutingModule } from './trips-routing.module';

import { TripsPage } from './trips.page';
import { CreateComponent } from './containers/create/create.component';
import { ListComponent } from './containers/list/list.component';
import { StoreModule } from '@ngrx/store';
import { tripsFeature } from './store/reducers/trip.reducer';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCostComponent } from './containers/add-cost/add-cost.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(tripsFeature),
    TripsPageRoutingModule
  ],
  declarations: [TripsPage, CreateComponent, ListComponent, AddCostComponent]
})
export class TripsPageModule {}
