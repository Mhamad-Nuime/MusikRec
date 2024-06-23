import { FormControl } from "@angular/forms";
import { User } from "../../user.model";

export type LoginForm = {
  [field in keyof Partial<User>] : FormControl<User[field] | null>;
}