import { NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StorageService } from '../../services/storage.service';
import { SharedModule } from '../../shared.module';
import { TripEffects } from './trip.effects';
import { tripsFeature } from './trip.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(tripsFeature),
    EffectsModule.forFeature([TripEffects]),
    IonicStorageModule.forRoot(),
  ],
  providers: [StorageService],
})
export class TripStoreModule {}
