import { type } from "os";

export interface CostType {
    costTypeId: number;
    name: string;
    type: string;
}

export const costTypesInitialState: CostType[] = [
    {
        costTypeId: 1,
        name: "Food",
        type: "food"
    },
    {
        costTypeId: 2,
        name: "Transport",
        type: "transport"
    },
    {
        costTypeId: 3,
        name: "Accommodation",
        type: "accomodation"
    },
    {
        costTypeId: 4,
        name: "Entertainment",
        type: "entertainment"
    },
    {
        costTypeId: 5,
        name: "Other",
        type: "other"
    }];