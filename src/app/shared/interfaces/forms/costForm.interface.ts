import { FormControl } from "@angular/forms";
import { CostType } from "../costType.interface";

export interface costForm {
  type?: FormControl<CostType>;
  amount?: FormControl<number|undefined>;
  currency?: FormControl<string >;
  date?: FormControl<string|undefined>;
}
