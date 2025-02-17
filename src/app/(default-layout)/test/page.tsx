"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { RootState, AppDispatch } from "@/app/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, getCalendarRange } from "@/app/util/date";

export default function TestPage() {
  const [isClient, setIsClient] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const todoState = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // 클라이언트에서만 렌더링되도록 처리
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // 클라이언트에서만 렌더링
  }

  const handleYearChange = (date: Date) => {
    console.log("aaaa");
    console.log(date);

    //setDate()
  };

  const handleSelDate = () => {
    setIsCalendarVisible(true);
  };
  
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <div style={{ marginBottom: "20px" }}>
          <p onClick={handleSelDate}>
            {formatDate(
              todoState.selCalendarDate !== null
                ? new Date(todoState.selCalendarDate)
                : new Date(),
              "yyyy년 MM월"
            )}
          </p>
        </div>
      </div>

      {isCalendarVisible && (
        <div className="aa">
          <Calendar
            value={date}
            view="year"
            onClickMonth={handleYearChange}
            minDate={new Date(1900, 0, 1)} // 최소 연도 설정 (1900년부터)
            maxDate={new Date(2100, 0, 1)} // 최대 연도 설정 (2100년까지)
          />
          <button>닫기</button>
        </div>
      )}
    </>
  );
}
