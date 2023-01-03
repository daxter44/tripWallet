import { createReducer, on } from "@ngrx/store";
import { AppState } from "../../interfaces/appState.interface";

export const appInitialState: AppState = {
    trips: [],
  };
  
  export const appReducer = createReducer(
    appInitialState
  );
  