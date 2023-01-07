import { createFeature, createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { cost } from "src/app/shared/interfaces/cost.interface";
import { CostState } from "src/app/shared/interfaces/storeStates/costState.interface";
import * as costActions from "./cost.actions";


export const costAdapter: EntityAdapter<cost> = createEntityAdapter<cost>({
  selectId: entity=>entity.costId, 
});

export const costsInitialState: CostState = costAdapter.getInitialState({});
  
export const costsFeature = createFeature({
  name: "costs",
  reducer: createReducer(costsInitialState,  
    on(costActions.addCost, (state, { cost }) => {
    return costAdapter.addOne(cost, state)
  }),),
  
})