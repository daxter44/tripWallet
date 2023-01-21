import { currency } from "./currency.interface";

export interface trip {
  tripId: number;
  name: string;
  budget: number;
  currency: currency;
  startDate: Date;
  endDate: Date;
}
