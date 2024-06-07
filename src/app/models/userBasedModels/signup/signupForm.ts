import { FormControl } from "@angular/forms";
import { User } from "../../user";

export type SignUpForm = {
  [field in keyof User ] : FormControl<User[field] | null> ;
}