import { createSlice } from '@reduxjs/toolkit';


export type ReduxState = {
  loadingStatus: boolean,
  loginStatus: {
    value: boolean,
    title: string
  }
}

export interface StatusState {
  value: boolean;
  title: string
}


const initialState: StatusState = {
  value: false,
  title: "login status"
};

// 创建一个 Slice 
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    // 定义一个加的方法
    logIn: (state) => {
      state.value = true
    },
    // 定义一个减的方法
    logOut: (state) => {
      state.value = false
    },
  },
});

export const showLoading = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    show: (state) => state = true,
    close: (state) => state = false
  }
})

// 导出加减的方法
export const { logIn, logOut } = loginSlice.actions;
export const { show, close } = showLoading.actions

// 默认导出

