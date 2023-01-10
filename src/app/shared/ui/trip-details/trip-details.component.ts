import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { first, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { trip } from '../../interfaces/trip.interface';
import { TripsState } from '../../interfaces/storeStates/tripsState.interface';
import { Destroyable } from '../../services/destroyable.component';
import { selectAllTrips } from '../../store/trips/trip.selectors';
import { cost } from '../../interfaces/cost.interface';
import { selectAllCostByTrip } from '../../store/costs/cost.selectors';
import * as CostActions from "../../store/costs/cost.actions";

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss'],
})
export class TripDetailsComponent extends Destroyable  
implements OnInit, ViewDidLeave {
  public trip$:  Observable<trip|undefined> = of(undefined);
  public costs$:  Observable<cost[]> = of([]);
  public viewLeft = false;

  private clearPage$: Subject<void> = new Subject<void>();
  constructor(private activeRoute: ActivatedRoute, private navController: NavController, private store: Store<TripsState>, private router: Router) {
    super();

    this.store.dispatch(CostActions.loadCostState());
  }

  public countDays(startDate: Date, endDate: Date): number {
    const days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    return Math.ceil(days);
  }
  
  ngOnInit(): void {
    this.initializeViewData();
  }

  public ionViewDidEnter(): void {
    this.viewLeft = false;
    this.initializeViewData();
  }
  public override ionViewDidLeave(): void {
    this.viewLeft = true;
    this.clearPage();
  }

  public clearPage(): void {
    this.clearPage$.next();
    this.clearPage$.complete();
  }

  public addCost(tripId: number): void {
    this.navController.navigateForward(`/application/trips/${tripId}/addCost`);
  }

  public sumCosts(costs: cost[]): number {
      return costs.reduce((acc, cost) => cost.exchangeRate>0? acc + (cost.exchangeRate * cost.amount): acc + cost.amount, 0);
  }

  private initializeViewData(): void {
    this.trip$.pipe(takeUntil(this.destroyed$)).subscribe(trip => {
      console.log(trip);
      if(trip) {
        this.costs$ = this.store.select(selectAllCostByTrip(trip.tripId))
      }
    });
    this.activeRoute.params
      .pipe(
        map((params) => params['id']),
        takeUntil(this.clearPage$)
      )
      .subscribe((id) => {
        this.store
          .select(selectAllTrips)
          .pipe(
            map((trips) => {
              if (trips.length > 0) {
                this.trip$ = of(trips.find((trip) => trip.tripId ===parseInt(id)));
                this.costs$ = this.store.select(selectAllCostByTrip(parseInt(id)));
              } else {
                this.router.navigate(['/application/trips/list']);
              }
            }),
            first()
          )
          .subscribe();
      });
      
  }
}
