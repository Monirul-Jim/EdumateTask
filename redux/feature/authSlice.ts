import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TInstituteDetails = {
  id: number;
  institute_id: string;
  institute_name: string;
  institute_address: string;
  institute_ein: number;
  institute_email: string;
  institute_contact: string;
  institute_category: string;
  institute_type: string;
  institute_board: string;
  logo: string;
  institute_gateway: string;
  vendor_id: number;
  is_gateway_fee: boolean;
};

type TAuthUser = {
  name: string;
  email: string;
  mobile: string;
  status: string;
  institute: TInstituteDetails;
};

type TAuthState = {
  user: null | TAuthUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;