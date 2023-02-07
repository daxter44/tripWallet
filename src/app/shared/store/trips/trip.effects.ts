import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import * as TripActions from './trip.actions';
import { StorageService } from '../../services/storage.service';
import { TripsState } from '../../interfaces/storeStates/tripsState.interface';
import { Store } from '@ngrx/store';
import { selectAllTrips } from './trip.selectors';
import { trip } from '../../interfaces/trip.interface';

@Injectable()
export class TripEffects {
  constructor(
    private actions: Actions,
    private storageService: StorageService,
    private store: Store<TripsState>
  ) {}

  //   saveData = createEffect(() =>
  //     return this.actions.pipe(
  //     ofType(TripActions.loadTripState),
  //     switchMap(() => {
  //       return this.storageService.set('trips', ).pipe(
  //         map(data => return TripActions.loadTripStateSuccess({ data: data })),
  //         catchError(error =>
  //           of(new TripActions.loadTripStateFailure({ error: error }))
  //         )
  //       );
  //     })
  //   ));

  saveData = createEffect(() => {
    return this.actions.pipe(
      ofType(TripActions.addTrip, TripActions.removeTrip),
      concatLatestFrom(() => this.store.select(selectAllTrips)),
      mergeMap(([_, trips]) => {
        return from(this.storageService.set('trips', trips)).pipe(
          map((results) => {
            return TripActions.saveTripStateSuccess();
          })
        );
      })
    );
  });

  loadData = createEffect(() => {
    return this.actions.pipe(
      ofType(TripActions.loadTripState),
      mergeMap(() => {
        return from(this.storageService.get('trips')).pipe(
          map((entities: trip[]) => {
            if (!entities || entities.length === 0) {
              return TripActions.loadTripStateFailure({ error: 'No trips' });
            }
            return TripActions.loadTripStateSuccess({ entities });
          })
        );
      })
    );
  });
}
