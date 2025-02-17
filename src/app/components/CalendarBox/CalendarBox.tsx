import React, { useEffect, useMemo,useReducer,useState } from "react";
import {
  Calendar,
  momentLocalizer,
  Event,
  ToolbarProps,
} from "react-big-calendar";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
//import { DndProvider } from "react-dnd";
//import { HTML5Backend } from "react-dnd-html5-backend";

//달력 스타일 
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'


//달력 툴바 커스텀
import CalendarToolBar from "./CalendarToolBar";

//달력 한국어
import moment from "moment";
import "moment/locale/ko"; //한국어

// css
import classes from "./CalendarBox.module.css";
import "./CustomCalendar.css";

// redux
import { RootState, AppDispatch } from "../../redux/store/store";
import {
  setDate,
  fetchSelCalendarTodoList,
  fetchUdtCalendarTodoSort,
  setError
} from "../../redux/features/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "@/app/util/date";
import { after, todo } from "node:test";

// 한국어 메시지 객체
const messages = {
  allDay: "종일",
  previous: "이전",
  next: "다음",
  today: "오늘",
  month: "월",
  week: "주",
  day: "일",
  agenda: "일정",
  date: "날짜",
  time: "시간",
  event: "이벤트",
  sunday: "일",
  monday: "월",
  tuesday: "화",
  wednesday: "수",
  thursday: "목",
  friday: "금",
  saturday: "토",
};

// Custom Event 타입 선언 (기본 Event 타입 확장)
interface CustomEvent {
  idx: number; // 고유 ID
  title: string; // 이벤트 제목
  start: Date; // 시작 날짜
  end: Date; // 종료 날짜
  color: string; // 색상
  completed: number; // 완료 여부
}


const DragAndDropCalendar = withDragAndDrop(Calendar);

const CalendarBox: React.FC = () => {

  const [draggedEvent, setDraggedEvent] = useState<any>(null); //mode dragEvent;

  //redux
  const todoState = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  //한국어 설정 
  moment.locale("ko");
  const localizer = momentLocalizer(moment);

  // 달력 월 전환 이벤트
  const handleNavigate = (newDate: Date, view: string, action: string) => {
    //dispatch(setCalendarDate(formatDate(newDate, "yyyy-MM-dd")));
    dispatch(fetchSelCalendarTodoList(formatDate(newDate, "yyyy-MM-dd")));
  };

  // state.todolist에서 필요한 형태로 이벤트 데이터를 변환
  const transformEvents = (): CustomEvent[] => {
    return todoState.calendarTodoList.map((todo) => {
      const startDate = new Date(todo.date); // 시작 날짜
      const endDate = new Date(todo.date); // 종료 날짜
      
      // end를 start와 동일하게 설정 (1일짜리 이벤트)
      endDate.setHours(23, 59, 59, 999); // 시간 설정 (23:59:59.999)
      
      return {
        idx: todo.idx, // 고유 ID (idx)
        title: todo.content, // title을 content로 설정
        start: startDate, // date를 start로 설정
        end: endDate, // date를 end로 설정 (하루 이벤트로 설정)
        color: todo.color, // color 추가
        completed: todo.completed, // completed 추가
      };
    });
  };

  const events: Event[] = useMemo(
    () => transformEvents(),
    [todoState.calendarTodoList]
  );


  const eventStyleGetter = (event: Event | CustomEvent) => {
      //const customEvent = event as CustomEvent;
      const { color, completed, start, end } = event as CustomEvent & { color: string; completed: number };
      //const isSingleDay = start.getDate() === end.getDate();
      const className = `${classes['calendar-todo']} ${completed === 1 ? classes['calendar-todo-completed'] : ''} ${[color]}`;
    return {
      className,
      style: {
        // single day events will have normal height, and multi-day events will have increased height
        //width: '100%', // 예시로 50px 높이를 추가
      }
    };
  };


  const calendarDayClickHandler = (date : Date, view : string) => {
    dispatch(setDate(formatDate(date, "yyyy-MM-dd")));
  }

  const calendardarSlotClickHandler = ({start}:{start:Date}) =>{
    dispatch(setDate(formatDate(start, "yyyy-MM-dd")));
  }

  const calendarEventClickHandler = ({ start }: Event) => {
    dispatch(setDate(formatDate(start, "yyyy-MM-dd")));
  };


  



  //외부 드래그 아이템 반환 함수
  const dragFromOutsideItem = () => (event: object): Date => {
    return new Date(); // 또는 적절한 Date 반환
  };


  const moveStartEventHandler = (event: any) => {
    //console.log("드래그 값 저장");
    setDraggedEvent({...event, type:'drag'})
  };

  const moveEndEventHandler = async({ event, start, end }: any) => {
    if(draggedEvent?.type == 'drag') {
      //console.log(`이벤트 이동 완료: ${start} ~ ${end}`);
      const beforeDate = formatDate(event.start, "yyyy-MM-dd");
      const afterDate = formatDate(start, "yyyy-MM-dd");
      
      if(beforeDate == afterDate) {
        //이동 날짜 같아서 이동 불가
        return false;
      }

      const filterList = todoState.calendarTodoList.filter(item => item.date == afterDate);
      const filterListSort = filterList.map((item, index) => ({
        ...item,
        sort: index + 2, //2번부터 값 할당
      }));
      //const moveEventSort = filterList.length ? Math.max(...filterList.map(item => item.sort || 0)) + 1 : 1;
     
      // 요소 찾고 제거
      const reorderedList = Array.from(todoState.calendarTodoList);
      const index = reorderedList.findIndex(item => item.idx === event.idx);
      const [removedItem] = reorderedList.splice(index, 1);
      const newItem = {
        ...removedItem, 
        date: afterDate,
        sort: 1,
      };
      const updatedList = [
        ...filterListSort, newItem
      ];
      
      try {
        const udtTodoSortAction = await dispatch(fetchUdtCalendarTodoSort({updatedList, idx:event.idx})).unwrap();
      } catch(error) {
          alert("데이터 저장에 실패했습니다. \n다시 시도해 주세요.");
          dispatch(setError(null));
      }
    }
    setDraggedEvent(null);
  };

  const onDropFromOutside  = async(event:any) => {
    //console.log(draggedEvent)
    //more 드래그 종료(외부 이벤트 이동)
    if(draggedEvent?.type=="drag"){
      //console.log(draggedEvent.event.start)

      const beforeDate = formatDate(draggedEvent.event.start, "yyyy-MM-dd");
      const afterDate = formatDate(event.start, "yyyy-MM-dd");

      if(beforeDate == afterDate) {
        //이동 날짜 같아서 이동 불가
        return false;
      }


      const filterList = todoState.calendarTodoList.filter(item => item.date == afterDate);
      const filterListSort = filterList.map((item, index) => ({
        ...item,
        sort: index + 2, //2번부터 값 할당
      }))
      //const moveEventSort = filterList.length ? Math.max(...filterList.map(item => item.sort || 0)) + 1 : 1;
        
      // 요소 찾고 제거
      const reorderedList = Array.from(todoState.calendarTodoList);
      const index = reorderedList.findIndex(item => item.idx === draggedEvent.event.idx);
      const [removedItem] = reorderedList.splice(index, 1);
      const newItem = {
        ...removedItem, 
        date: afterDate,
        sort: 1,
      };

      const updatedList = [
        ...filterListSort, newItem
      ];

      try {
        const udtTodoSortAction = await dispatch(fetchUdtCalendarTodoSort({updatedList, idx:draggedEvent.event.idx})).unwrap();
      } catch(error) {
          alert("데이터 저장에 실패했습니다. \n다시 시도해 주세요. (화면이 새로고침됩니다.)");
          dispatch(setError(null));
          // 상태를 원복한 후 페이지 새로 고침
          window.location.reload();
      }
    }
    setDraggedEvent(null);
  }
  


  //more이벤트 드래그
  const moveStartMoreEventHandler = (event: any) => {
    console.log("more이벤트 수정" + "기본")
    //console.log(event)
    //setDraggedEvent({...event, type:'moreDrag'});
     // 콜백 호출 (비동기 처리가 끝난 후)

  };

  return (
    <>

    <div className={classes["calendar-box"]} >
      <DragAndDropCalendar
        className="curstom-calendar"
        localizer={localizer}
        events={events}
        messages={messages} // 한국어 메시지 설정
        defaultView="month" //month, day
        views={['month']}
        eventPropGetter={eventStyleGetter} // 이벤트 스타일링 적용
        date={new Date(todoState.selCalendarDate || new Date())}
        components={{
          toolbar: (props: ToolbarProps) => (
            <CalendarToolBar {...props} onNavigate={handleNavigate} />
          ),
          //showMore : //“더 보기” 버튼을 커스터마이즈하는 컴포넌트
        }}
        popup
        onNavigate={handleNavigate}
        formats={{
          dayHeaderFormat: "YYYY년 MM월 DD일",
        }}
        // onShowMore={(events, date) => {
        //   console.log(date)
        //   date = formatDate(date, 'MM월');
        //   console.log(date)
        //   console.log(events)
        // }}
        // onView={(newView)=> {
        //   console.log("@@@@")
        //   console.log(newView)
        // }},

        selectable
        onDrillDown={calendarDayClickHandler}     //달력 닐짜 클릭 이벤트
        onSelectSlot={calendardarSlotClickHandler} //달력 슬록 클릭 이벤트
        onSelectEvent={calendarEventClickHandler} //달력 할일 클릭 이벤트

        onDragStart={moveStartEventHandler} // 드래그 시작 이벤트 핸들러
        onEventDrop ={moveEndEventHandler}
        //onEventResize={resizeEventHandler} // 크기 조정
        resizable = {false}
        handleDragStart = {moveStartMoreEventHandler}
        //handleDragEnd = {null}
        // tooltipAccessor ={()=>{
        //     return "aa"
        // }}
        //dragFromOutsideItem={() => (event:any) => new Date(event.start)} //외부에서 드래그한 아이템을 이벤트로 변환
        draggableAccessor={() => true}
      
        dragFromOutsideItem= {dragFromOutsideItem}
        onDropFromOutside = {onDropFromOutside}

      />

      
    </div>
    </>
  );
};

export default CalendarBox;
