import { FormControl } from "@angular/forms";
import { currency } from "../currency.interface";

export interface tripCreate {
  tripId?: FormControl<number| undefined>;
  name?: FormControl<string >;
  budget?: FormControl<number| undefined>;
  currency?: FormControl<currency | undefined >;
  startDate?: FormControl<string|undefined>;
  endDate?: FormControl<string|undefined>;
}
