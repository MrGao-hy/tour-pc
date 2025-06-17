import { getUserInfoApi } from "@/api";
import { UserInfoType } from "@/typing";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import cookie from "@/config/cookie";
import config from "@/config";


export interface UserState {
  userInfo: UserInfoType;
  limit: "admin" | "manager" | "vip" | "normal",
  current: number;
}

const initialState: UserState = {
  userInfo: {} as UserInfoType,
  limit: "normal",
  current: 1
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = {};
      cookie.remove(config.prefix + 'token');
      window.location.href = "/login";
    },
    setCurrent: (state, action) => {
      state.current = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setUserInfo.fulfilled, (state: UserState, action) => {
      // TODO: 累赘处理，后期优化
      if(action.payload.avatar && !action.payload.avatar?.url.includes('/ms')) {
        action.payload.avatar.url = "/ms" + action.payload.avatar?.url;
      }

      if(action.payload) {
        action.payload.area = [action.payload.province!, action.payload.city!, action.payload.counties!]
      }

      state.userInfo = action.payload;
    });
  }
});

/**
 * 异步函数
 * */
export const setUserInfo = createAsyncThunk("user/setUserInfo", async () => {
  const res = await getUserInfoApi();
  // TODO: 累赘处理，后期优化
  if(res.avatar && !res.avatar?.url.includes("/ms")) {
    res.avatar.url = "/ms" + res.avatar.url;
  }

  return res;
});

export const { logout, setCurrent } = userSlice.actions;

export const selectUserInfo = (state: RootState) => state.user.userInfo;
export const selectLimit = (state: RootState) => state.user.limit;
export const selectCurrent = (state: RootState) => state.user.current;
export default userSlice.reducer;
