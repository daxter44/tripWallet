import { type } from "os";

export interface CostType {
    costTypeId: number;
    icon: string;
    name: string;
    type: string;
}

export const costTypesInitialState: CostType[] = [
    {
        costTypeId: 1,
        icon: "fast-food-outline",
        name: "Food",
        type: "food"
    },
    {
        costTypeId: 2,
        icon: "car-sport-outline",
        name: "Transport",
        type: "transport"
    },
    {
        costTypeId: 3,
        icon: "bed-outline",
        name: "Accommodation",
        type: "accomodation"
    },
    {
        costTypeId: 4,
        icon: "happy-outline",
        name: "Entertainment",
        type: "entertainment"
    },
    {
        costTypeId: 5,
        icon: "bonfire-outline",
        name: "Suvenires",
        type: "suvenires"
    },
    {
        costTypeId: 6,
        icon: "bag-outline",
        name: "Other",
        type: "other"
    }];