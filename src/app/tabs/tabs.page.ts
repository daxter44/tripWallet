import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private navController: NavController) {}

  public onTabClick(event: { tab: any; }): void {
    this.navController.navigateRoot(`/application/${event.tab}`);
  }
}
