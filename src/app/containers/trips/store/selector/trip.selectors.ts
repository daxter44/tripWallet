import { createSelector } from "@ngrx/store";
import { State } from "src/app/shared/interfaces/state.interface";
import { trip } from "src/app/shared/interfaces/trip.interface";
import { TripsState } from "src/app/shared/interfaces/tripsState.interface";
import { tripAdapter, tripsFeature } from "../reducers/trip.reducer";

export const { selectTripsState} = tripsFeature;
const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = tripAdapter.getSelectors();


// select the array of users
export const selectAllTrips = createSelector(selectTripsState, selectAll);
export const selectActualTrip = createSelector(selectAllTrips, (trips: trip[]) => {
    return trips.sort((a, b) => {
      return new Date(a.endDate).getDate() - new Date(b.endDate).getDate();
    })[0];
} );