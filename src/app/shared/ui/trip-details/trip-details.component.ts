import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { first, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { selectAllTrips } from 'src/app/containers/trips/store/selector/trip.selectors';
import { trip } from '../../interfaces/trip.interface';
import { TripsState } from '../../interfaces/tripsState.interface';
import { Destroyable } from '../../services/destroyable.component';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss'],
})
export class TripDetailsComponent extends Destroyable  
implements OnInit, ViewDidLeave {
  @Input() public trip$:  Observable<trip|undefined> = of(undefined);
  public viewLeft = false;

  private clearPage$: Subject<void> = new Subject<void>();
  constructor(private activeRoute: ActivatedRoute, private store: Store<TripsState>, private router: Router) {
    super();
  }

  public tripLength(startDate:string, endDate:string): number {
    let difference = new Date(endDate).getTime() -new Date(startDate).getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
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
                this.trip$ = of(trips.find((trip) => trip.tripId ===id));
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
