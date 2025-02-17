import { createSlice } from "@reduxjs/toolkit";


interface ScreenState {
  isMobile: boolean | null;
}


const initialState: ScreenState = {
  isMobile: null,
};

const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});


export const { setIsMobile } = screenSlice.actions;
export default screenSlice.reducer;