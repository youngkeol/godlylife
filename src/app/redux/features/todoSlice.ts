import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import { formatDate, getCalendarRange } from "@/app/util/date";
import { colorType } from "@/types/colors";
import axiosInstance from "@/app/intercepter/authRequestInstance";

interface CalendarDateRange {
  startDate: string;
  endDate: string;
}

// 상태 타입 정의
interface Todo {
  idx:number,
  content: string;
  date: string;
  color:string;
  completed: number;
  sort: number;
}

interface TodoState {
  selDate : string | null;
  todoList: Todo[];
  selCalendarDate : string | null;
  calendarDateRange: {startDate : string, endDate : string} | null;
  calendarTodoList : Todo[];
  loading: boolean;
  error: {errorCode:string, errorMessage:string} | string | null;
  preTodoList: Todo[];
  preCalendarTodoList: Todo[];
}

// API 요청을 통해 TODO 목록 가져오기
export const fetchSelTodoList = createAsyncThunk('todo/selTodos', async ( calendarDateRange:CalendarDateRange | null,  { rejectWithValue }) => {
  //console.log('fetchSelTodoList 호출됨');
  try {
    if(calendarDateRange == null || calendarDateRange?.startDate == '' || calendarDateRange?.endDate == '' ) {
      const {startDate, endDate} = getCalendarRange(formatDate(new Date, 'yyyy'), formatDate(new Date, 'MM') )
      calendarDateRange = {startDate, endDate}
    }

    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/todo/list`, {
      params: {
        startDate: calendarDateRange.startDate,
        endDate: calendarDateRange.endDate,
      }
    });

    return {...response.data, calendarDateRange: calendarDateRange};
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

// 달력 변경시 TODO 목록 가져오기
export const fetchSelCalendarTodoList = createAsyncThunk('todo/selCalendarTodos', async ( selCalendarDate:string, { rejectWithValue }) => {
  //console.log('fetchSelCalendarTodoList 호출됨');
  try {
    let calendarDateRange = null;
    if(selCalendarDate == null) {
      const {startDate, endDate} = getCalendarRange(formatDate(new Date, 'yyyy'), formatDate(new Date, 'MM') )
      calendarDateRange = {startDate, endDate};
    } else {
      const {startDate, endDate} =  getCalendarRange(formatDate(new Date(selCalendarDate), 'yyyy'), formatDate(new Date(selCalendarDate), 'MM'));
      calendarDateRange = {startDate, endDate};
    }

    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/todo/list`, {
      params: {
        startDate: calendarDateRange.startDate,
        endDate: calendarDateRange.endDate,
      },
    });
    return {...response.data, calendarDateRange: calendarDateRange, selCalendarDate: selCalendarDate};
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


// 할일 등록
export const fetchInsTodo = createAsyncThunk('todo/insTodo', async ( {selDate, content, color}:{selDate: string | null, content: string, color:colorType}, { rejectWithValue }) => {
  //console.log('fetchInsTodo 호출됨')
  try {
    if(selDate == null) {
      selDate =  formatDate(new Date, 'yyyy-MM-dd')
    }

    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/todo/insert`, {
      selDate, content, color
    });

    return {...response.data, selDate, content, color}
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


// 할일 삭제
export const fetchDelTodo = createAsyncThunk('todo/delTodo', async ( {idx}:{idx:number}, { rejectWithValue }) => {
  //console.log('fetchDelTodo 호출됨')
  try {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/todo/delete`, {
      idx
    });
    
    return {...response.data, idx}
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


// 할일 순서 변경 
export const fetchUdtTodoSort = createAsyncThunk('todo/udtTodoSort', async (todoList : Todo[], { rejectWithValue }) => {
  //console.log('fetchUdtTodoSort 호출됨');
  try {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/todo/sort`, {
      todoList
    });
    return {...response.data, todoList}
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

// 할일 상태 변경 
export const fetchUdtCompleteTodo = createAsyncThunk('todo/udtCompleteTodo', async ( {idx}:{idx:number}, { rejectWithValue }) => {
  //console.log('fetchUdtCompleteTodo 호출됨');
  try {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/todo/complete`, {
      idx
    });

    return {...response.data, idx}
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



// 캘린더 할일 순서 변경 
export const fetchUdtCalendarTodoSort = createAsyncThunk('todo/udtCalendarTodoSort', async ({updatedList, idx} : {updatedList : Todo[], idx : number}, { rejectWithValue }) => {
  //console.log('fetchUdtCalendarTodoSort 호출됨');
  try {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/todo/calendarSort`, {
      updatedList
    });
    return {...response.data, updatedList, idx}
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






//초기 상태 
const initialState : TodoState = {
  selDate: formatDate(new Date, 'yyyy-MM-dd'), //todo 선택 날짜
  todoList: [], //selDate 날짜 기준 데이터
  selCalendarDate : formatDate(new Date, 'yyyy-MM-dd'), //달력 선택 날짜
  calendarDateRange: getCalendarRange(formatDate(new Date, 'yyyy'), formatDate(new Date, 'MM') ), //달력 선택 날짜 기준, 캘릭터 표시 날짜
  calendarTodoList : [],//월 데이터
  loading: false,
  error: null,
  preTodoList: [],
  preCalendarTodoList: []
}

//slice 생성
const todoSlice = createSlice({
  name : "todo",
  initialState,
  reducers : {
    setDate(state, action) {
      let selDate = action.payload;
      let todoList = state.calendarTodoList.filter(item => {
        return (item.date == selDate);
      })
      return {...state, selDate, todoList}
    },
    setCalendarDate(state, action) {
      return {...state, selCalendarDate:action.payload}
    },
    setCalendarDateRange(state, action) {
      return {...state, calendarDateRange: action.payload}
    },
    setTodoList(state, action) {
      let selDate = action.payload;
      let todoList = state.calendarTodoList.filter(item => {
        return (item.date == selDate);
      })
      return {...state, todoList}
    },



  
    addTodo(state, action: PayloadAction<Todo[]>) {
      return {...state, todoList: [...action.payload]}
    },
    deleteTodo(state, action: PayloadAction<Array<String>>) {
      return {...state}
    },
    completeTodo(state, action: PayloadAction<Array<String>>) {
      return {...state}
    },


    setError(state, action:PayloadAction<string | null| {errorCode:string, errorMessage:string}>) {
      return {...state, error:action.payload}
    }
  },

  extraReducers : (builder) => {
    builder
      /**** 처음 리스트 불러오기 ****/
      .addCase(fetchSelTodoList.pending, (state)=> {
        //pending: 비동기 작업이 시작되었을 때, 예를 들어 로딩 스피너를 보여줄 때 사용
        state.loading = true;
      })
      .addCase(fetchSelTodoList.fulfilled, (state, action)=> {
        //fulfilled: 비동기 작업이 성공적으로 완료되면, 서버에서 반환한 데이터를 상태에 반영
        state.calendarTodoList = [...action.payload.data];
        state.todoList = state.calendarTodoList.filter((item) => {
          return (item.date === state.selDate)
        });
        state.loading = false;
      })
      .addCase(fetchSelTodoList.rejected, (state, action)=> {
        //rejected: 비동기 작업이 실패했을 때, 에러 메시지를 상태에 저장하여 UI에서 에러를 표시
        const errorData = action.payload as { errorCode: string; errorMessage: string };
        state.error = errorData;
        state.loading = false;
      })
      // 달력 리스트 불러오기
      .addCase(fetchSelCalendarTodoList.pending, (state)=> {
        //pending: 비동기 작업이 시작되었을 때, 예를 들어 로딩 스피너를 보여줄 때 사용
        state.loading = true;
      })
      .addCase(fetchSelCalendarTodoList.fulfilled, (state, action)=> {
        //fulfilled: 비동기 작업이 성공적으로 완료되면, 서버에서 반환한 데이터를 상태에 반영
        state.selCalendarDate = action.payload.selCalendarDate;
        state.calendarDateRange = action.payload.calendarDateRange;
        state.calendarTodoList = [...action.payload.data];
        // state.todoList = state.calendarTodoList.filter((item) => {
        //   return (item.date === state.selDate)
        // });
        state.loading = false;

      })
      .addCase(fetchSelCalendarTodoList.rejected, (state, action)=> {
        const errorData = action.payload as { errorCode: string; errorMessage: string };
        state.error = errorData;
        state.loading = false;
      })
      // 할일 추가
      .addCase(fetchInsTodo.pending, (state)=> {
      })
      .addCase(fetchInsTodo.fulfilled, (state, action)=> {
        const maxSort = state.todoList.length > 0 ? Math.max(...state.todoList.map(item => item.sort || 0)) + 1 : 1;
        const newTodos = {
          idx: action.payload.idx,
          content: action.payload.content,
          date: action.payload.selDate,
          color: action.payload.color.color,
          completed: 0,
          sort: maxSort
        }
        state.calendarTodoList = [...state.calendarTodoList, newTodos]
        state.todoList = [...state.todoList, newTodos];
      })
      .addCase(fetchInsTodo.rejected, (state, action)=> {
        const errorData = action.payload as { errorCode: string; errorMessage: string };
        state.error = errorData;
        state.loading = false;
      })
      /**** 할일 삭제 ****/
      .addCase(fetchDelTodo.pending, (state, action)=> {
      })
      .addCase(fetchDelTodo.fulfilled, (state, action)=> {
        state.todoList = state.todoList.filter((item) => {
          return (item.idx !== action.payload.idx)
        });
        state.calendarTodoList = state.calendarTodoList.filter((item) => {
          return (item.idx !== action.payload.idx)
        });
      })
      .addCase(fetchDelTodo.rejected, (state, action)=> {
        const errorData = action.payload as { errorCode: string; errorMessage: string };
        state.error = errorData;
        state.loading = false;
      })
      /**** 할일 순서 변경 ****/
      .addCase(fetchUdtTodoSort.pending, (state, action)=> {
        //UI 먼저 변경
        const todoList = action.meta.arg;
        const calTodoListTemp = state.calendarTodoList.filter((item) => {
          return (item.date !== state.selDate)
        });
        const calendarTodoList =[...calTodoListTemp, ...action.meta.arg];
        state.preTodoList = [...state.todoList];
        state.preCalendarTodoList = [...state.calendarTodoList];
        state.todoList = todoList;
        state.calendarTodoList = calendarTodoList;

      })
      .addCase(fetchUdtTodoSort.fulfilled, (state, action)=> {
        // 성공 시, 이전 상태를 초기화
        state.preTodoList = [];
        state.preCalendarTodoList = [];
      })
      .addCase(fetchUdtTodoSort.rejected, (state, action)=> {
        // 실패 시, 이전 상태로
        state.todoList = [...state.preTodoList];
        state.calendarTodoList = [...state.preCalendarTodoList];
        state.preTodoList=[];
        state.preCalendarTodoList = [];
        
        const errorData = action.payload as { errorCode: string; errorMessage: string };
        state.error = errorData;
        state.loading = false;
      })
      /**** 할일 상태 변경 ****/
      .addCase(fetchUdtCompleteTodo.pending, (state, action)=> {
        let idx = action.meta.arg.idx;
        const newTodoList = state.todoList.map(item=> {
          if(item.idx == idx) {
            item.completed = (item.completed==0 ? 1 : 0);
          }
          return item;
        });

        const newCalendarTodoList = state.calendarTodoList.map(item=> {
          if(item.idx == idx) {
            item.completed = (item.completed==0 ? 1 : 0);
          }
          return item;
        });
        state.todoList = newTodoList;
        state.calendarTodoList = newCalendarTodoList;
      })
      .addCase(fetchUdtCompleteTodo.fulfilled, (state, action)=> {
      })
      .addCase(fetchUdtCompleteTodo.rejected, (state, action)=> {
        let idx = action.meta.arg.idx;
        const newTodoList = state.todoList.map(item=> {
          if(item.idx == idx) {
            item.completed = (item.completed==0 ? 1 : 0);
          }
          return item;
        });

        const newCalendarTodoList = state.calendarTodoList.map(item=> {
          if(item.idx == idx) {
            item.completed = (item.completed==0 ? 1 : 0);
          }
          return item;
        });
        state.todoList = newTodoList;
        state.calendarTodoList = newCalendarTodoList;
        
        const errorData = action.payload as { errorCode: string; errorMessage: string };
        state.error = errorData;
        state.loading = false;
      })

      /**** 캘린더 위치 변경 ****/
      .addCase(fetchUdtCalendarTodoSort.pending, (state, action)=> {
        state.preTodoList = [...state.todoList];
        state.preCalendarTodoList = [...state.calendarTodoList];
        const filterCalendarTodoList = state.calendarTodoList.filter(item=> item.idx != action.meta.arg.idx);
        const [moveTodo] = action.meta.arg.updatedList.filter(item=> item.idx == action.meta.arg.idx);
        state.calendarTodoList = [moveTodo, ...filterCalendarTodoList];  // 새로운 배열로 상태 업데이트
        state.todoList= [moveTodo, ...filterCalendarTodoList].filter(item => {
          return item.date == state.selDate
        });
      })
      .addCase(fetchUdtCalendarTodoSort.fulfilled, (state, action)=> {
        state.preTodoList = [];
        state.preCalendarTodoList = [];
      })
      .addCase(fetchUdtCalendarTodoSort.rejected, (state, action)=> {
        state.todoList = [...state.preTodoList].reverse();
        state.calendarTodoList = [...state.preCalendarTodoList].reverse();
        state.preTodoList=[];
        state.preCalendarTodoList = [];
        
        const errorData = action.payload as { errorCode: string; errorMessage: string };
        state.error = errorData;
        state.loading = false;
      })
  }
});

//액션과 리듀서 내보내기
export const {setDate, setCalendarDate, setCalendarDateRange, setTodoList, addTodo, deleteTodo, completeTodo, setError} = todoSlice.actions;
export default todoSlice.reducer;