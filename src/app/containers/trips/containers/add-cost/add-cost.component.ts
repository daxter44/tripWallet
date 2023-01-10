import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { map, Subject, takeUntil } from 'rxjs';
import { costForm } from 'src/app/shared/interfaces/forms/costForm.interface';
import { CostState } from 'src/app/shared/interfaces/storeStates/costState.interface';
import { Destroyable } from 'src/app/shared/services/destroyable.component';
import { selectAllCosts } from 'src/app/shared/store/costs/cost.selectors';
import * as costActions from "../../../../shared/store/costs/cost.actions";
import { cost } from 'src/app/shared/interfaces/cost.interface';
import { CostType, costTypesInitialState } from 'src/app/shared/interfaces/costType.interface';
import { costsInitialState } from 'src/app/shared/store/costs/cost.reducer';

@Component({
  selector: 'app-add-cost',
  templateUrl: './add-cost.component.html',
  styleUrls: ['./add-cost.component.scss'],
})
export class AddCostComponent extends Destroyable implements OnInit {

  public defaultDate =new Date().toISOString();
  public costTypes = costTypesInitialState;
  private clearPage$: Subject<void> = new Subject<void>();
  costForm: FormGroup<costForm> = new FormGroup<costForm>({
    type: new FormControl<CostType>({value: costTypesInitialState[0], disabled: false}, { nonNullable: true }),
    amount: new FormControl<number>({value: 0, disabled: false}, { nonNullable: true }),
    currency: new FormControl<string>({value: '', disabled: false}, { nonNullable: true }),
    date: new FormControl<string>({value: this.defaultDate, disabled: false}, { nonNullable: true })
   });
   private newCostId: number = 0;
   private tripId: number = 0;

  constructor(private store: Store<CostState>, private activeRoute: ActivatedRoute, private navController: NavController) {
    super();
    this.store.select(selectAllCosts).pipe(takeUntil(this.destroyed$)).subscribe(costs => {
      this.newCostId = costs.length+1;
    });
  }

  ngOnInit() {
    this.initializeViewData();
  }

  public submit() {
    const cost : cost = {
      costId: this.newCostId,
      tripId: this.tripId,
      type: this.costForm.get('type')?.value!,
      amount: this.costForm.get('amount')?.value!,
      currency: this.costForm.get('currency')?.value!,
      date: this.costForm.get('date')?.value!
    }
    this.store.dispatch(costActions.addCost({cost}));
    this.navController.navigateForward(`/application/trips/${this.tripId}/details`);
  }

  public clearPage(): void {
    this.clearPage$.next();
    this.clearPage$.complete();
  }

  public getDate(e: any) {
    let date = new Date(e.target.value).toISOString();
    this.costForm.get('date')!.setValue(date, {
      onlyself: true
    })
  }

  private initializeViewData(): void {
    this.activeRoute.params
    .pipe(
      map((params) => params['id']),
      takeUntil(this.clearPage$)
    )
    .subscribe((id) => {
      this.tripId = parseInt(id);
  });
}
}
