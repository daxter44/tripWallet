import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { tripsFeature } from "./trip.reducer";


@NgModule({
  imports: [
    StoreModule.forFeature(tripsFeature) ]
})
export class TripStoreModule {}
