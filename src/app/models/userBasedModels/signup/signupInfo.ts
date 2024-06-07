import { User } from "../../user";

export type SingUpInfo = {
  [field in keyof Partial<User> ] : User[field] | null ;
}