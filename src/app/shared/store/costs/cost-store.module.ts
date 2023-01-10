import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CostsEffects } from "./cost.effects";
import { costsFeature } from "./cost.reducer";


@NgModule({
  imports: [
    StoreModule.forFeature(costsFeature),
    EffectsModule.forFeature([CostsEffects]) ]
})
export class CostStoreModule {}
