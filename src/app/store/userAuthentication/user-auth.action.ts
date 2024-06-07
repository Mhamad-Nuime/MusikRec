import { createAction, props } from "@ngrx/store";
import { UserAuthentication } from "src/app/models/userAuth.interface";

export const saveUserInfo = createAction(
  '[Authentication Api] save User Info',
  props<{ userInfo : UserAuthentication}>()
)
