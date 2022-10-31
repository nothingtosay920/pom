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

export interface CounterState {
  value: number;
  title: string
}
const initialStates: CounterState = {
  value: 0,
  title: "redux toolkit pre"
};


export const counterSlice = createSlice({
  name: 'counter',
  initialState: initialStates,
  // 定义 reducers 并生成关联的操作
  reducers: {
    // 定义一个加的方法
    increment: (state) => {
      state.value += 1;
    },
    // 定义一个减的方法
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// 创建一个 Slice 
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    open: (state) => {
      state.value = true
    },
    close: (state) => {
      state.value = false
    },
  },
});

export const relateSlice = createSlice({
  name: 'relate',
  initialState: {
    page: 0,
    num: 0
  },
  reducers: {
    up: (state) => {
      if (state.num === 0) {
        state.page = state.page - 1
        state.num = 4
      } else {
        state.num = state.num - 1
      }
    },
    down: (state) => {
      if (state.num === 5) {
        state.page = state.page + 1
        state.num = 0
      } else {
        state.num = state.num + 1
      }
    }
  }
})

// 导出加减的方法
export const { open, close } = loginSlice.actions;
export const { increment, decrement } = counterSlice.actions;
export const {up, down} = relateSlice.actions
// 默认导出

