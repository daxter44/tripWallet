import { createSelector } from '@ngrx/store';
import { trip } from 'src/app/shared/interfaces/trip.interface';
import { tripAdapter, tripsFeature } from './trip.reducer';

const { selectIds, selectEntities, selectAll, selectTotal } =
  tripAdapter.getSelectors();
export const { selectTripsState } = tripsFeature;

// select the array of users
export const selectAllTrips = createSelector(selectTripsState, selectAll);
export const selectTripById = (tripId: number) =>
  createSelector(selectAllTrips, (entities) => entities[tripId]);

export const selectPastTrips = createSelector(
  selectAllTrips,
  (trips: trip[]) => {
    return trips.filter(
      (trip) => trip.endDate.getTime() - new Date().getTime() < 0
    );
  }
);

export const selectFeaturedTrips = createSelector(
  selectAllTrips,
  (trips: trip[]) => {
    return trips.filter(
      (trip) => trip.endDate.getTime() - new Date().getTime() > 0
    );
  }
);

export const selectActualTrip = createSelector(
  selectFeaturedTrips,
  (trips: trip[]) => {
    return trips.sort((a, b) => {
      return new Date(a.endDate).getTime() - b.endDate.getTime();
    })[0];
  }
);
