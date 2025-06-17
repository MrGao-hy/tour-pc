import { combineReducers, configureStore } from "@reduxjs/toolkit";
import menuStore from "./reducer/settingSlice";
import userStore from "./reducer/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [ "user", "setting" ]
};

const rootReducer = combineReducers({
  setting: menuStore,
  user: userStore
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer
});

// 后续使用useSelector时参数state的类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// 创建持久化存储
export const persistor = persistStore(store);


