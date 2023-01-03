import { AppState } from "./appState.interface";
import { trip } from "./trip.interface";
import { TripsState } from "./tripsState.interface";

export interface State {
    appState: AppState;
    tripState: TripsState;
  }
  