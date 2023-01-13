import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
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
