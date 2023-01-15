import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripDetailsComponent } from 'src/app/shared/ui/trip-details/trip-details.component';
import { AddCostComponent } from './containers/add-cost/add-cost.component';
import { CreateComponent } from './containers/create/create.component';
import { ListComponent } from './containers/list/list.component';

import { TripsPage } from './trips.page';

const routes: Routes = [
  {
    path: '',
    component: TripsPage,
    children: [
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: ':id/details',
        component: TripDetailsComponent,
      },
      {
        path: ':id/addCost',
        component: AddCostComponent,
      },
      {
        path: ':id/addCost/:type',
        component: AddCostComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsPageRoutingModule {}
