import { FormControl } from "@angular/forms";

export interface Dateform {
    year: FormControl<number>;
    month: FormControl<number | null>;
    day: FormControl<number | null>;
}