import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { cost } from '../../interfaces/cost.interface';
import { CostState } from '../../interfaces/storeStates/costState.interface';
import { trip } from '../../interfaces/trip.interface';
import { selectAllCostByTrip } from '../../store/costs/cost.selectors';

@Component({
  selector: 'app-budget-overview',
  templateUrl: './budget-overview.component.html',
  styleUrls: ['./budget-overview.component.scss'],
})
export class BudgetOverviewComponent implements OnInit {
  @Input() public trip: trip = {} as trip;
  @Input() public tripLength: number = 0;
  public costs$: Observable<cost[]> = of();

  constructor(private store: Store<CostState>) { }
  
  ngOnInit(): void {
    this.costs$ = this.store.select(selectAllCostByTrip(this.trip.tripId));
  }

  public getBudgetUsage(costs:cost[], budget:number): number {
    const costsSum = this.sumCosts(costs);
    return costsSum/ budget;
  }

  public sumCosts(costs: cost[]): number {
    return costs.reduce((acc, cost) => cost.exchangeRate>0? acc + (cost.exchangeRate * cost.amount): acc + cost.amount, 0);
}

}
