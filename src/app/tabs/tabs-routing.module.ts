import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'overview',
        loadChildren: () => import('../containers/trip-overview/trip-overview.module').then( m => m.TripOverviewPageModule)
      },
      {
        path: 'trips',
        loadChildren: () => import('../containers/trips/trips.module').then(m => m.TripsPageModule)
      },
      {
        path: 'pastTrips',
        loadChildren: () => import('../containers/past-trips/past-trips.module').then(m => m.PastTripsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
