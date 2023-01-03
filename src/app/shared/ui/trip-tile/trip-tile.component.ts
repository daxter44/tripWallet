import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { trip } from '../../interfaces/trip.interface';

@Component({
  selector: 'app-trip-tile',
  templateUrl: './trip-tile.component.html',
  styleUrls: ['./trip-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripTileComponent implements OnInit {
  @Input() public trip: trip = {} as trip;

  constructor(
    private navController: NavController) { }

  @HostListener('click')
  public onTileClick() {
    this.openTripDetails();
  }

  public openTripDetails(): void {
    this.navController.navigateForward(`/application/trips/${this.trip.tripId}/details`);
  }
  ngOnInit() {}

}
