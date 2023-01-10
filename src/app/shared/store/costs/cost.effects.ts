import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError, mergeMap } from "rxjs/operators";
import * as CostActions from "./cost.actions";
import { StorageService } from "../../services/storage.service";
import { Store } from "@ngrx/store";
import { selectAllCosts } from "./cost.selectors";
import { CostState } from "../../interfaces/storeStates/costState.interface";
import { cost } from "../../interfaces/cost.interface";

@Injectable()
export class CostsEffects {
  constructor(private actions: Actions, private storageService: StorageService, private store: Store<CostState>) {}

    saveData = createEffect(() => {
        return this.actions.pipe(
            ofType(CostActions.addCost, CostActions.removeCost),
            concatLatestFrom(() => this.store.select(selectAllCosts)),
            mergeMap(([_, trips]) => {
                return this.storageService.set('costs', trips).pipe(
                    map((results) => {
                        return CostActions.saveCostStateSuccess();
                    })
                );
            })
        )
    });

    loadData = createEffect(() => {
        return this.actions.pipe(
            ofType(CostActions.loadCostState),
            mergeMap(() => {
                return this.storageService.get('costs').pipe(
                    map((cost : cost[]) => {
                        return CostActions.loadCostStateSuccess({cost});
                    })
                );
            })
        )
    });
}