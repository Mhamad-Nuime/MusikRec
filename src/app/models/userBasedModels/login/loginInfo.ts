import { User } from "../../user.model";

export type LoginInfo = {
  [field in keyof Partial<User>] : User[field] | null ;
}