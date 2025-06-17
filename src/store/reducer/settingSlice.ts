import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export type LayoutModeType = "sidemenu" | "topmenu";

export interface settingState {
  collapsed: boolean;
  isDarkMode: boolean;
  themeColor: string;
  layoutMode: LayoutModeType;
  editFontSize: number;
}

const initialState: settingState = {
  collapsed: false,
  isDarkMode: true,
  themeColor: "#1677ff",
  layoutMode: "topmenu",
  editFontSize: 20
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  // 同步操作
  reducers: {
    changeCollapsed: (state: settingState) => {
      state.collapsed = !state.collapsed;
    },
    setDarkMode: (state: settingState, action) => {
      state.isDarkMode = action.payload;
    },
    setThemeColor: (state: settingState, action) => {
      state.themeColor = action.payload;
    },
    setLayoutMode: (state: settingState, action) => {
      state.layoutMode = action.payload;
    },
    setEditFontSize: (state: settingState, action) => {
      state.editFontSize = action.payload;
    }
  },
  // 异步操作
  extraReducers: (builder) => {

  }
});

export const { changeCollapsed, setDarkMode, setThemeColor, setLayoutMode, setEditFontSize } = settingSlice.actions;

export const selectCollapsed = (state: RootState) => state.setting.collapsed;
export const selectIsDarkMode = (state: RootState) => state.setting.isDarkMode;
export const selectThemeColor = (state: RootState) => state.setting.themeColor;
export const selectLayoutMode = (state: RootState) => state.setting.layoutMode;
export const selectEditFontSize = (state: RootState) => state.setting.editFontSize;

export default settingSlice.reducer;