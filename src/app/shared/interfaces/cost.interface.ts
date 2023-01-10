import { CostType } from "./costType.interface";

export interface cost {
  costId: number;
  tripId: number;
  type: CostType;
  amount: number;
  currency: string;
  date: string;
}
