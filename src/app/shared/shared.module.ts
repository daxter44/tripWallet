import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TripTileComponent } from './ui/trip-tile/trip-tile.component';
import { TripDetailsComponent } from './ui/trip-details/trip-details.component';
import { CostTileComponent } from './ui/cost-tile/cost-tile.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { BudgetOverviewComponent } from './ui/budget-overview/budget-overview.component';
import { AddCostPanelComponent } from './ui/add-cost-panel/add-cost-panel.component';

const ANGULAR_MODULES: any = [ReactiveFormsModule];

const COMPONENTS: any = [
    CostTileComponent,
    TripTileComponent,
    TripDetailsComponent,
    BudgetOverviewComponent,
    AddCostPanelComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ...ANGULAR_MODULES, IonicModule, 
    IonicStorageModule.forRoot(), HttpClientModule],
  exports: [...ANGULAR_MODULES, ...COMPONENTS],
  providers: []

})
export class SharedModule {}
