import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { cost } from '../../interfaces/cost.interface';
import { trip } from '../../interfaces/trip.interface';

@Component({
  selector: 'app-cost-tile',
  templateUrl: './cost-tile.component.html',
  styleUrls: ['./cost-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostTileComponent implements OnInit {
  @Input() public cost: cost = {} as cost;

  constructor(
    private navController: NavController) { }

  ngOnInit() {}

}
