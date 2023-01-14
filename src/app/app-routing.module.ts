import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'application',
    pathMatch: 'full',
  },
  {
    path: 'application',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'trips',
    loadChildren: () => import('./containers/trips/trips.module').then( m => m.TripsPageModule)
  },
  {
    path: 'pastTrips',
    loadChildren: () => import('./containers/past-trips/past-trips.module').then(m => m.PastTripsPageModule)
  },
  {
    path: 'overview',
    loadChildren: () => import('./containers/trip-overview/trip-overview.module').then( m => m.TripOverviewPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
