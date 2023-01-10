import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../../shared.module";
import { TripEffects } from "./trip.effects";
import { tripsFeature } from "./trip.reducer";


@NgModule({
  imports: [
    StoreModule.forFeature(tripsFeature),
    EffectsModule.forFeature([TripEffects]),
    SharedModule
  ]
})
export class TripStoreModule {}
