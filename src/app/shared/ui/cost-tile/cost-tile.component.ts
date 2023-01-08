import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { cost } from '../../interfaces/cost.interface';
import { CostState } from '../../interfaces/storeStates/costState.interface';
import * as costActions from "../../store/costs/cost.actions";

@Component({
  selector: 'app-cost-tile',
  templateUrl: './cost-tile.component.html',
  styleUrls: ['./cost-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostTileComponent implements OnInit {
  @Input() public cost: cost = {} as cost;

  constructor(
    private navController: NavController,  private store: Store<CostState>, ) { }

  ngOnInit() {}

  public removeCost() {
    this.store.dispatch(costActions.removeCost({ costId: this.cost.costId }));
  }

}
