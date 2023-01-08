import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TripTileComponent } from './ui/trip-tile/trip-tile.component';
import { TripDetailsComponent } from './ui/trip-details/trip-details.component';
import { CostTileComponent } from './ui/cost-tile/cost-tile.component';

const ANGULAR_MODULES: any = [ReactiveFormsModule];

const COMPONENTS: any = [
    CostTileComponent,
    TripTileComponent,
    TripDetailsComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ...ANGULAR_MODULES, IonicModule],
  exports: [...ANGULAR_MODULES, ...COMPONENTS],
})
export class SharedModule {}
