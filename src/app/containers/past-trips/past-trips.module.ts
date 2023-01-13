import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastTripsPageRoutingModule } from './past-trips-routing.module';

import { PastTripsPage } from './past-trips.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PastTripsPageRoutingModule
  ],
  declarations: [PastTripsPage]
})
export class PastTripsPageModule {}
