import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { first, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { trip } from '../../interfaces/trip.interface';
import { TripsState } from '../../interfaces/storeStates/tripsState.interface';
import { Destroyable } from '../../services/destroyable.component';
import { selectAllTrips } from '../../store/trips/trip.selectors';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss'],
})
export class TripDetailsComponent extends Destroyable  
implements OnInit, ViewDidLeave {
  public trip$:  Observable<trip|undefined> = of(undefined);
  public viewLeft = false;

  private clearPage$: Subject<void> = new Subject<void>();
  constructor(private activeRoute: ActivatedRoute, private navController: NavController, private store: Store<TripsState>, private router: Router) {
    super();
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
    console.log(tripId);
    this.navController.navigateForward(`/application/trips/${tripId}/addCost`);
  }
  private initializeViewData(): void {
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
