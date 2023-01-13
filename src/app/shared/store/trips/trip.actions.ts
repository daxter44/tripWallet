import { createAction, props } from "@ngrx/store";
import { trip } from "src/app/shared/interfaces/trip.interface";

export const setTripState = createAction('[Trip Store] Set Trip', props<{ trip: trip }>());
export const clearTripState = createAction('[Trip Store] Clear Trip');

export const addTrip = createAction(
    '[Trip Store] Add trip',
    props<{ trip: trip}>()
  );


export const removeTrip = createAction(
  '[Trip Store] Remove trip',
  props<{ tripId: number}>()
);


  export const loadTripState = createAction('[Trip Store] Load data into Trip');
  export const loadTripStateSuccess = createAction('[Trip Store] Load data into Trip success', props<{ trip: trip[] }>());
  export const loadTripStateFailure = createAction('[Trip Store] Load data into Trip failure', props<{ error: any }>());


  export const saveTripState = createAction('[Trip Store] Save trip data');
  export const saveTripStateSuccess = createAction('[Trip Store] Save trip data');
  export const saveTripStateFailure = createAction('[Trip Store] Save trip data', props<{ error: any }>());