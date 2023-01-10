import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { TripsState } from '../interfaces/storeStates/tripsState.interface';
import * as tripsActions from "../store/trips/trip.actions";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage = new Storage;

  constructor(private storage: Storage, private store: Store<TripsState>) {
    this.init().then(() => {
      this.store.dispatch(tripsActions.loadTripState());})

  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    return from(
          this._storage?.set(key, value)
      );
  }
  public get(key: string) {
    return from(
          this._storage?.get(key)
      );
  } 
  public getP(key: string) {
    return this._storage?.get(key);
  }
}