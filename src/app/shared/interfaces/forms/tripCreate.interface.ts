import { FormControl } from "@angular/forms";

export interface tripCreate {
  tripId?: FormControl<number| undefined>;
  name?: FormControl<string >;
  budget?: FormControl<number| undefined>;
  currency?: FormControl<string >;
  startDate?: FormControl<string|undefined>;
  endDate?: FormControl<string|undefined>;
}
