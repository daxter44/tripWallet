import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { costTypesInitialState } from '../../interfaces/costType.interface';

@Component({
  selector: 'app-add-cost-panel',
  templateUrl: './add-cost-panel.component.html',
  styleUrls: ['./add-cost-panel.component.scss'],
})
export class AddCostPanelComponent implements OnInit {
  @Input() public tripId : number = 0 ;
  public costTypes = costTypesInitialState;
  constructor(
    private navController: NavController) { }

  ngOnInit() {}
  public onButtonClick(costType:string): void {
    this.navController.navigateRoot(`/application/trips/${this.tripId}/addCost/${costType}`);
  }
}
