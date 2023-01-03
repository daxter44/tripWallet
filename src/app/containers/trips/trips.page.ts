import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { trip } from 'src/app/shared/interfaces/trip.interface';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage {
  constructor(private navController: NavController) {}

  // addTrip() {

  //   this.navController.navigateForward(`/application/trips/create`);
  //   this.trips.push({
  //     id: this.trips.length + 1,
  //     name: 'Trip ' + (this.trips.length + 1),
  //     budget: 1000,
  //     currency: 'USD',
  //     startDate: '2020-01-01',
  //     endDate: '2020-01-10',
  //   });
  // }
}
