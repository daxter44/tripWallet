import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TripTileComponent } from './ui/trip-tile/trip-tile.component';
import { TripDetailsComponent } from './ui/trip-details/trip-details.component';
import { CostTileComponent } from './ui/cost-tile/cost-tile.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from './services/storage.service';
import { HttpClientModule } from '@angular/common/http';

const ANGULAR_MODULES: any = [ReactiveFormsModule];

const COMPONENTS: any = [
    CostTileComponent,
    TripTileComponent,
    TripDetailsComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ...ANGULAR_MODULES, IonicModule, 
    IonicStorageModule.forRoot(), HttpClientModule],
  exports: [...ANGULAR_MODULES, ...COMPONENTS],
  providers: [StorageService]

})
export class SharedModule {}
