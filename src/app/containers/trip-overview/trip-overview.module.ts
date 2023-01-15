import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripOverviewPageRoutingModule } from './trip-overview-routing.module';

import { TripOverviewPage } from './trip-overview.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripOverviewPageRoutingModule,
    SharedModule
  ],
  declarations: [TripOverviewPage]
})
export class TripOverviewPageModule {}
