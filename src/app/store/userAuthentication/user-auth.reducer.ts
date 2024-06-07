import { createFeature, createReducer, on } from "@ngrx/store";
import { UserAuthentication } from "src/app/models/userAuth.interface";
import { saveUserInfo } from "./user-auth.action";

export const initialUserInfo : UserAuthentication = {
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  token: null,
};

export const userReducer = createReducer(
  initialUserInfo,
  on(saveUserInfo, (state, action) => (
    {
      ...action.userInfo
    }
  ))
);

export const userInfoFeature = createFeature({
  name: 'userInfo',
  reducer: userReducer,
});