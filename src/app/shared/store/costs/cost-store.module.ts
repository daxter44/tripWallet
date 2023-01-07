import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { costsFeature } from "./cost.reducer";


@NgModule({
  imports: [
    StoreModule.forFeature(costsFeature) ]
})
export class CostStoreModule {}
