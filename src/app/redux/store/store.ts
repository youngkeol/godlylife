import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "../features/commonSlice";
import screenReducer from "../features/screenSlice";
import todoReducer from "../features/todoSlice";
import goalReducer from "../features/goalSlice";
import memoReducer from "../features/memoSlice";

// 스토어 생성
export const store = configureStore({
  reducer: {
    common: commonReducer,
    screen: screenReducer,
    todo: todoReducer,
    goal: goalReducer,
    memo: memoReducer,
  },
});

//상태 타입 정의
export type RootState = ReturnType<typeof store.getState>;

//디스패치 타입 정의
export type AppDispatch = typeof store.dispatch;
