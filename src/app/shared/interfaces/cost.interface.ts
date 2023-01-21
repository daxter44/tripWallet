import { CostType } from "./costType.interface";
import { currency } from "./currency.interface";

export interface cost {
  costId: number;
  tripId: number;
  type: CostType;
  amount: number;
  currency: currency;
  exchangeRate: number;
  date: string;
}
