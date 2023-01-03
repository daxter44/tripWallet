import { createAction, props } from "@ngrx/store";
import { trip } from "src/app/shared/interfaces/trip.interface";

export const setTripState = createAction('[Trip Store] Set Trip', props<{ trip: trip }>());
export const clearTripState = createAction('[Trip Store] Clear Trip');

export const addTrip = createAction(
    '[Trip Store] Add trip',
    props<{ trip: trip}>()
  );