import { FormControl } from "@angular/forms";
import { CostType } from "../costType.interface";
import { currency } from "../currency.interface";

export interface costForm {
  type?: FormControl<CostType>;
  amount?: FormControl<number|undefined>;
  currency?: FormControl<currency|undefined>;
  date?: FormControl<string|undefined>;
}
