import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastTripsPage } from './past-trips.page';

const routes: Routes = [
  {
    path: '',
    component: PastTripsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastTripsPageRoutingModule {}
