import { FormControl } from "@angular/forms";

export interface costForm {
  type?: FormControl<string>;
  amount?: FormControl<number|undefined>;
  currency?: FormControl<string >;
  date?: FormControl<string|undefined>;
}
