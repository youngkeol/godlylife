import React from "react";

import { RootState, AppDispatch } from "@/app/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setCalendarDate,
  fetchSelCalendarTodoList,
  setDate,
  setTodoList,
} from "@/app/redux/features/todoSlice";

import { setIsModal } from "@/app/redux/features/commonSlice";

import classes from "./ModalCalendar.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomModalCalendar.css";
import { formatDate, getMonthStartEndDates } from "@/app/util/date";

const ModalCalendar = ({
  handleModalCalendarClose,
}: {
  handleModalCalendarClose: () => void;
}) => {
  const commonState = useSelector((state: RootState) => state.common);
  const todoState = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  const handleYearChange = (date: Date) => {
    //todo일자 변경
    const selDate = formatDate(date, "yyyy-MM-dd");
    dispatch(setDate(selDate));
    dispatch(setCalendarDate(selDate));
    dispatch(fetchSelCalendarTodoList(selDate)).then(() => {
      dispatch(setTodoList(selDate));
    });

    handleModalCalendarClose();
  };

  return (
    <div className={classes["modal-calendar-wrap"]}>
      <div className={classes["modal-calendar-con"]}>
        <Calendar
          className={"modal-calendar"}
          value={
            todoState.selCalendarDate !== null
              ? new Date(todoState.selCalendarDate)
              : new Date()
          }
          view="year"
          onClickMonth={handleYearChange}
          minDate={new Date(1900, 0, 1)} // 최소 연도 설정 (1900년부터)
          maxDate={new Date(2100, 0, 1)} // 최대 연도 설정 (2100년까지)
        />
        <div
          className={classes["modal-calendar-footer"]}
          onClick={handleModalCalendarClose}
        >
          닫기
        </div>
      </div>
    </div>
  );
};

export default ModalCalendar;
