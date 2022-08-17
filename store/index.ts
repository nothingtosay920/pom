import { configureStore } from "@reduxjs/toolkit";
import { loginSlice, showLoading } from "./features/status";

// configureStore创建一个redux数据
const store = configureStore({
  // 合并多个Slice
  reducer: {
    loginStatus: loginSlice.reducer,
    loadingStatus: showLoading.reducer
  },
});

export default store;
