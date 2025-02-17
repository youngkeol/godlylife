"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { RootState, AppDispatch } from "@/app/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setDate,
  setCalendarDate,
  fetchSelCalendarTodoList,
  setTodoList,
} from "@/app/redux/features/todoSlice";

import {
  formatDate,
  getMonthStartEndDates,
  getDateRange,
  getDayFromDate,
  getWeekdayFromDate,
} from "@/app/util/date";

import classes from "./CalendarDateList.module.css";
const CalendarDateList = () => {
  const [dateRangeArr, setDateRangeArr] = useState<string[]>([]);
  const [initIndex, setInitIndex] = useState(0);
  const todoState = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      const selDate = todoState.selDate
        ? new Date(todoState.selDate)
        : new Date();
      const selCalendarDate = todoState.selCalendarDate
        ? new Date(todoState.selCalendarDate)
        : new Date();

      if (
        formatDate(selDate, "yyyy-MM") !==
        formatDate(selCalendarDate, "yyyy-MM")
      ) {
        //데이터와 달력 날짜 틀린 경우
        dispatch(
          fetchSelCalendarTodoList(
            todoState.selDate || formatDate(new Date(), "yyyy-MM-dd")
          )
        );
      }
    })();
  }, []); 
  
  useEffect(() => {
    //모바일 달력은 선택된 todo일자로 날짜 재구성
    const selDate = todoState.selDate
      ? todoState.selDate
      : formatDate(new Date(), "yyyy-MM-dd");

    const dateRangeTemp = new Date(selDate);
    const dateRange = getMonthStartEndDates(
      formatDate(dateRangeTemp, "yyyy"),
      formatDate(dateRangeTemp, "MM")
    );
    //시작 날짜 ~ 마지막 날짜 배열로 반환
    const dateRangeList = getDateRange(dateRange.startDate, dateRange.endDate);
    setDateRangeArr(dateRangeList);

    const initialSlideValue = dateRangeList.findIndex((date) => {
      return date === todoState.selDate;
    });

    setInitIndex(initialSlideValue);
  }, [todoState.selDate]);

  const handleSelDate = (date: string) => {
    //todo 날짜 선택
    dispatch(setDate(date));
  };

  return (
    <div className={classes["calendar-list-box"]}>
      <Swiper
        key={initIndex}
        spaceBetween={10}
        slidesPerView={"auto"}
        //slidesPerView="auto" // 슬라이드 개수를 자동으로 설정
        loop
        freeMode
        initialSlide={initIndex}
        centeredSlides
      >
        {dateRangeArr.map((date, index) => (
          <SwiperSlide
            key={index}
            className={`${classes["swiper-slide-item"]} 
            ${todoState.selDate == date ? classes["active"] : ""}`}
            onClick={() => handleSelDate(date)}
          >
            <div>
              <p className={classes["swiper-slide-item-weekdays"]}>
                {getWeekdayFromDate(date)}
              </p>
              <p className={classes["swiper-slide-item-day"]}>
                {getDayFromDate(date)}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CalendarDateList;
