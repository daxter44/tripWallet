import { createSelector } from "@ngrx/store";
import { costAdapter, costsFeature } from "./cost.reducer";

export const { selectCostsState } = costsFeature;
const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = costAdapter.getSelectors();


// select the array of users
export const selectAllCosts = createSelector(selectCostsState, selectAll);

export const selectAllCostByTrip = (tripId: number) =>
  createSelector(
    selectAllCosts,
    (costs) => {
      return costs.filter((cost) => cost.tripId === tripId);
    }
  );