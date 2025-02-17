import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/intercepter/authRequestInstance";

interface Memo {
  idx: number;
  content: string;
  sort: number;
  udtDate: string;
}

interface MemoState {
  selIdx: number | null;
  memoList: Memo[];
  loading: boolean;
  error: { errorCode: string; errorMessage: string } | string | null;
  preMemoList: Memo[];
}

const initialState: MemoState = {
  selIdx: null,
  memoList: [],
  loading: false,
  error: null,
  preMemoList: [],
};



export const fetchSelMemoList = createAsyncThunk("todo/selMemos", async (_, { rejectWithValue }) => {
    //console.log("fetchSelMemoList 호출됨");
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/memo/list`
      );

      return { ...response.data };
    } catch (error: any) {
      if (!error.response) {
        return rejectWithValue({
          errorCode: "NETWORK_ERROR",
          message: "네트워크 오류가 발생했습니다.",
        });
      }
      // 서버 응답 에러 처리
      if (error.response) {
        return rejectWithValue({
          errorCode: error.response.data.errorCode || "UNKNOWN_ERROR",
          message:error.response.data.message || "알 수 없는 에러가 발생했습니다.",
        });
      }
    }
  }
);



export const fetchUdtMemo = createAsyncThunk("todo/udtMemo", async (updatedMemo:Memo, { rejectWithValue }) => {
    //console.log("fetchUdtMemo 호출됨");
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/memo/update`,
        {
          ...updatedMemo,
        }
      );

      return { ...response.data, ...updatedMemo};
    } catch (error: any) {
      if (!error.response) {
        return rejectWithValue({
          errorCode: "NETWORK_ERROR",
          message: "네트워크 오류가 발생했습니다.",
        });
      }
      // 서버 응답 에러 처리
      if (error.response) {
        return rejectWithValue({
          errorCode: error.response.data.errorCode || "UNKNOWN_ERROR",
          message:error.response.data.message || "알 수 없는 에러가 발생했습니다.",
        });
      }
    }
  }
);



export const fetchInsMemo = createAsyncThunk("todo/insMemo", async (insertedMemo:Memo, { rejectWithValue }) => {
  //console.log("fetchInsMemo 호출됨");
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/memo/insert`,
      {
        ...insertedMemo,
      }
    );

    return { ...insertedMemo,  ...response.data};
  } catch (error: any) {
    if (!error.response) {
      return rejectWithValue({
        errorCode: "NETWORK_ERROR",
        message: "네트워크 오류가 발생했습니다.",
      });
    }
    // 서버 응답 에러 처리
    if (error.response) {
      return rejectWithValue({
        errorCode: error.response.data.errorCode || "UNKNOWN_ERROR",
        message:error.response.data.message || "알 수 없는 에러가 발생했습니다.",
      });
    }
  }
});




export const fetchDelMemo = createAsyncThunk("todo/delMemo", async (idx:number, { rejectWithValue }) => {
  //console.log("fetchDelMemo 호출됨");
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/memo/delete`,
      {
        idx
      }
    );

    return { idx,  ...response.data};
  } catch (error: any) {
    if (!error.response) {
      return rejectWithValue({
        errorCode: "NETWORK_ERROR",
        message: "네트워크 오류가 발생했습니다.",
      });
    }
    // 서버 응답 에러 처리
    if (error.response) {
      return rejectWithValue({
        errorCode: error.response.data.errorCode || "UNKNOWN_ERROR",
        message:error.response.data.message || "알 수 없는 에러가 발생했습니다.",
      });
    }
  }
});



// 할일 순서 변경 
export const fetchUdtMemoSort = createAsyncThunk('todo/udtMemoSort', async (memoList : Memo[], { rejectWithValue }) => {
  //console.log('fetchUdtMemoSort 호출됨');
  try {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/memo/sort`, {
      memoList
    });
    return {...response.data, memoList}
  }catch(error:any) {
    if (!error.response) {
      return rejectWithValue({
        errorCode: "NETWORK_ERROR",
        message: "네트워크 오류가 발생했습니다.",
      });
    }

    // 서버 응답 에러 처리
    if (error.response) {
      return rejectWithValue({
        errorCode: error.response.data.errorCode || "UNKNOWN_ERROR",
        message: error.response.data.message || "알 수 없는 에러가 발생했습니다.",
      });
    }
  }
});








const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    setSelMemo(state, action) {
      let selIdx = action.payload;
      return { ...state, selIdx };
    },
    setError(
      state,
      action: PayloadAction<
        string | null | { errorCode: string; errorMessage: string }
      >
    ) {
      return { ...state, error: action.payload };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSelMemoList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSelMemoList.fulfilled, (state, action) => {
        //fulfilled: 비동기 작업이 성공적으로 완료되면, 서버에서 반환한 데이터를 상태에 반영
        state.memoList = action.payload.data;
        state.loading = false;
      })

      /**** 수정 ****/
      .addCase(fetchSelMemoList.rejected, (state, action) => {
        //rejected: 비동기 작업이 실패했을 때, 에러 메시지를 상태에 저장하여 UI에서 에러를 표시
        const errorData = action.payload as { errorCode: string; errorMessage: string;};
        state.error = errorData;
        state.loading = false;
      })
      .addCase(fetchUdtMemo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUdtMemo.fulfilled, (state, action) => {
        //fulfilled: 비동기 작업이 성공적으로 완료되면, 서버에서 반환한 데이터를 상태에 반영
        let idx = action.payload.idx;
        let memoList = state.memoList.filter(item => item.idx != idx);
        let updatedMemo = {...action.payload};

        state.memoList = [...memoList, updatedMemo].sort((a, b) => b.sort - a.sort);
        state.loading = false;
        //console.log('업데이트 완료')
      })
      .addCase(fetchUdtMemo.rejected, (state, action) => {
        //rejected: 비동기 작업이 실패했을 때, 에러 메시지를 상태에 저장하여 UI에서 에러를 표시
        const errorData = action.payload as { errorCode: string; errorMessage: string;};
        state.error = errorData;
        state.loading = false;
        //console.log(errorData)
      })

      /**** 등록 ****/
      .addCase(fetchInsMemo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInsMemo.fulfilled, (state, action) => {
        //fulfilled: 비동기 작업이 성공적으로 완료되면, 서버에서 반환한 데이터를 상태에 반영
        let idx = action.payload.idx;
        let content = action.payload.content;
        let sort = action.payload.sort;
        let udtDate = action.payload.udtDate;
        let insMemo = {
          idx, content, sort, udtDate
        }
        state.memoList = [...state.memoList, insMemo].sort((a, b) => b.sort - a.sort);
        state.selIdx = idx;
        state.loading = false;
        //console.log('업데이트 완료')
      })
      .addCase(fetchInsMemo.rejected, (state, action) => {
        //rejected: 비동기 작업이 실패했을 때, 에러 메시지를 상태에 저장하여 UI에서 에러를 표시
        const errorData = action.payload as { errorCode: string; errorMessage: string;};
        state.error = errorData;
        state.loading = false;
        //console.log(errorData)
      })




        /**** 삭제 ****/
        .addCase(fetchDelMemo.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchDelMemo.fulfilled, (state, action) => {
          //fulfilled: 비동기 작업이 성공적으로 완료되면, 서버에서 반환한 데이터를 상태에 반영
          let idx = action.payload.idx;
          state.memoList = state.memoList.filter(item => item.idx !=idx).sort((a, b) => b.sort - a.sort);
          state.selIdx = null;
          state.loading = false;
          //console.log('삭제 완료')
        })
        .addCase(fetchDelMemo.rejected, (state, action) => {
          //rejected: 비동기 작업이 실패했을 때, 에러 메시지를 상태에 저장하여 UI에서 에러를 표시
          const errorData = action.payload as { errorCode: string; errorMessage: string;};
          state.error = errorData;
          state.loading = false;
          //console.log(errorData)
        })
        /*** 순서 변경  ****/
        .addCase(fetchUdtMemoSort.pending, (state, action) => {
          const memoList = action.meta.arg;
          state.preMemoList = [...state.memoList]; //이전 값 저장
          state.memoList=memoList;
          state.loading = true;
        })
        .addCase(fetchUdtMemoSort.fulfilled, (state, action) => {
          //fulfilled: 비동기 작업이 성공적으로 완료되면, 서버에서 반환한 데이터를 상태에 반영
          state.loading = false;
          state.preMemoList=[];
        })
        .addCase(fetchUdtMemoSort.rejected, (state, action) => {
          //실패시 이전값 원복
          state.memoList = [...state.preMemoList];
          state.preMemoList = [];

          //rejected: 비동기 작업이 실패했을 때, 에러 메시지를 상태에 저장하여 UI에서 에러를 표시
          const errorData = action.payload as { errorCode: string; errorMessage: string;};
          state.error = errorData;
          state.loading = false;
        })


      ;
  },
});

export const { setSelMemo, setError } = memoSlice.actions;
export default memoSlice.reducer;
