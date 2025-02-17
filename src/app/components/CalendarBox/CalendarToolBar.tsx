import React from "react";
import { format } from "date-fns";
//import "./CustomCalendar.css";

//툴바 타입
type ToolbarProps = {
  date: Date;
  onNavigate: (newDate: Date, view: string, action: string) => void;
};

const CalendarToolBar = ({ date, onNavigate }: ToolbarProps) => {
  const goToBack = () => {
    const newDate = new Date(date);
    newDate.setDate(1); // 임시로 1일로 변경
    newDate.setMonth(newDate.getMonth() - 1);
    onNavigate(newDate, "month", "PREV"); // 수정된 onNavigate 호출
  };

  const goToNext = () => {
    const newDate = new Date(date);
    newDate.setDate(1); // 임시로 1일로 변경
    newDate.setMonth(newDate.getMonth() + 1);

    onNavigate(newDate, "month", "NEXT"); // 수정된 onNavigate 호출
  };

  const goToToday = () => {
    const newDate = new Date();
    onNavigate(newDate, "month", "TODAY"); // 수정된 onNavigate 호출
  };

  const label = format(date, "yyyy년 MM월");
  return (
    <div className="rbc-toolbar">
      <span className="rbc-toolbar-label">{label}</span>
      <div>
        <button onClick={goToBack}>
          <i className="xi-angle-left-min"></i>
        </button>
        <button onClick={goToToday}>오늘</button>
        <button onClick={goToNext}>
          <i className="xi-angle-right-min"></i>
        </button>
      </div>
    </div>
  );
};

export default CalendarToolBar;
