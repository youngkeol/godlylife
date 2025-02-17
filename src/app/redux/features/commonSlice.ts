import { createSlice } from "@reduxjs/toolkit";

interface CommonState {
  isModal: boolean;
}


const initialState: CommonState = {
  isModal: false
};


const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setIsModal: (state, action) => {
      state.isModal = action.payload;
    },
  },
})


export const { setIsModal } = commonSlice.actions;
export default commonSlice.reducer;