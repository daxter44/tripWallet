import { createFeature, createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { trip } from "src/app/shared/interfaces/trip.interface";
import { TripsState } from "src/app/shared/interfaces/storeStates/tripsState.interface";
import * as tripActions from "./trip.actions";


export const tripAdapter: EntityAdapter<trip> = createEntityAdapter<trip>({
  selectId: entity=>entity.tripId, 
});

export const tripsInitialState: TripsState = tripAdapter.getInitialState({});
  
export const tripsFeature = createFeature({
  name: "trips",
  reducer: createReducer(tripsInitialState,  
    on(tripActions.addTrip, (state, { trip }) => {
      return tripAdapter.addOne(trip, state)
    }),
    on(tripActions.loadTripStateSuccess, (state, { trip }) => {
      return tripAdapter.setAll(trip, state)
    }), 
    on(tripActions.removeTrip, (state, { tripId }) => {
      return tripAdapter.removeOne(tripId, state)
    }),
  )
})