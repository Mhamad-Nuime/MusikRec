import { User } from "../../user.model";

export type SingUpInfo = {
  [field in keyof Partial<User> ] : User[field] | null ;
}