import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/intercepter/authRequestInstance";
import { GoalDetail, Goal, GoalState } from "@/types/goals";
import { colorType } from "@/types/colors";

const initialState: GoalState = {
  selIdx : null,
  modalFlag: 0,
  goalList : null, 
  loading: false,
  error: null,
};


// API 요청을 통해 Goal 목록 가져오기
export const fetchSelGoalList = createAsyncThunk('goal/selGoals', async (_, { rejectWithValue }) => {
  //console.log('fetchSelGoalList 호출됨');
  try {
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/goal/list`);
    return {...response.data};
  } catch(error:any) {
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


// 목표 등록
export const fetchInsGoal = createAsyncThunk('goal/insGoal', async ( {title, goalList, color}:{title: string, goalList: string[], color:string}, { rejectWithValue }) => {
  //console.log('fetchInsGoal 호출됨')
  try {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/goal/insert`, {
      title, goalList, color
    });
    return {...response.data, title, goalList, color}
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


// 목표 삭제
export const fetchDelGoal = createAsyncThunk('goal/delGoal', async ( {idx}:{idx: string}, { rejectWithValue }) => {
  //console.log('fetchDelGoal 호출됨');
  try {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/goal/delete`, {
      idx
    });
    return {...response.data, idx}
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



// 목표 수정
export const fetchUdtGoal = createAsyncThunk('goal/udtGoal', async ( udtGoalData: Goal, { rejectWithValue }) => {
  //console.log('fetchUdtGoal 호출됨');
  try {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/goal/update`, {
      udtGoalData
    });
    return {...response.data, udtGoalData}
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




const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    setSelIdx(state, action){
      return {...state, selIdx:Number(action.payload)}
    },
    setModalFlag(state, action) {
      return {...state, modalFlag:Number(action.payload)}
    },
    setError(state, action:PayloadAction<string | null| {errorCode:string, errorMessage:string}>) {
      return {...state, error:action.payload}
    }

  },
  extraReducers : (builder) => {
    builder
    //목표 리스트 호출
    .addCase(fetchSelGoalList.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchSelGoalList.fulfilled, (state, action) => {
      state.goalList = [...action.payload.data];
      state.loading = false;
    })
    .addCase(fetchSelGoalList.rejected, (state, action) => {
      
      const errorData = action.payload as { errorCode: string; errorMessage: string };
      state.error = errorData;
      state.loading = false;
    })


    //목표 등록
    .addCase(fetchInsGoal.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchInsGoal.fulfilled, (state, action) => {
      const goalList = [...(action.payload.data.goalDetails as GoalDetail[])];

      const newGaolData:Goal = {
        idx: action.payload.data.idx,
        title : action.payload.title,
        goalDetails : goalList,
        completed : 0,
        color: action.payload.color,
      }
      state.goalList = state.goalList ? [...state.goalList, newGaolData] : [newGaolData];
      state.loading = false;
    })
    .addCase(fetchInsGoal.rejected, (state, action) => {
      const errorData = action.payload as { errorCode: string; errorMessage: string };
      state.error = errorData;
      state.loading = false;
    })

    //목표 삭제 fetchDelGoal
    .addCase(fetchDelGoal.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchDelGoal.fulfilled, (state, action) => {
      const idx = action.payload.idx;
      const newGoalList = state.goalList?.filter(item => item.idx != idx) as Goal[]
      state.goalList = newGoalList;
      state.loading = false;
    })
    .addCase(fetchDelGoal.rejected, (state, action) => {
      const errorData = action.payload as { errorCode: string; errorMessage: string };
      state.error = errorData;
      state.loading = false;
    })

    //목표 수정 fetchUdtGoal
    .addCase(fetchUdtGoal.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUdtGoal.fulfilled, (state, action) => {
      state.loading = false;
      const filterGoalList = state.goalList?.filter(item => item.idx != action.payload.udtGoalData.idx) as Goal[];
      
      state.goalList = [...filterGoalList, 
        {
          ...action.payload.udtGoalData, 
          goalDetails: action.payload.data.goalDetails,
          completed: action.payload.data.goalCompleted
        }
      ] 
    })
    .addCase(fetchUdtGoal.rejected, (state, action) => {
      const errorData = action.payload as { errorCode: string; errorMessage: string };
      state.error = errorData;
      state.loading = false;
    })
  }

});

export const {setSelIdx, setModalFlag, setError} = goalSlice.actions;
export default goalSlice.reducer;