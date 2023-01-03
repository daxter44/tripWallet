import { cost } from "./cost.interface";

export interface trip {
  tripId: number;
  name: string;
  budget: number;
  cost: cost[];
  currency: string;
  startDate: string;
  endDate: string;
}
