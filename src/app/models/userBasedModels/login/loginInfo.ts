import { User } from "../../user";

export type LoginInfo = {
  [field in keyof Partial<User>] : User[field] | null ;
}