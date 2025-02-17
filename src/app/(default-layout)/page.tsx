"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//compoent
import CalendarBox from "@/app/components/CalendarBox/CalendarBox";
import TodoInputBox from "@/app/components/TodoInputBox/TodoInputBox";
import TodoListBox from "@/app/components/TodoListBox/TodoListBox";
import ModalCalendar from "@/app/components/CalendarPopup/ModalCalendar";
import CalendarDateList from "@/app/components/CalendarDateList/CalendarDateList";

//redux
import { RootState, AppDispatch } from "@/app/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setIsModal } from "../redux/features/commonSlice";
import { fetchSelTodoList } from "@/app/redux/features/todoSlice";

//css
import classes from "./MainPage.module.css";

//util
import { formatDate } from "@/app/util/date";

export default function MainPage() {
  const [isMCalendarVisible, setIsMCalendarVisible] = useState(false);
  const router = useRouter();
  const screenState = useSelector((state: RootState) => state.screen);
  const commonState = useSelector((state: RootState) => state.common);
  const todoState = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    //처음 데이터 호출(오늘 날짜 기준 호출)
    dispatch(fetchSelTodoList(todoState.calendarDateRange)); // 정상적인 데이터 전달
  }, []);

  //에러 처리
  useEffect(() => {
    if (
      typeof todoState.error === "object" && todoState.error !== null && "errorCode" in todoState.error
    ) {
      const errorData = todoState.error as {
        errorCode: string;
        errorMessage: string;
      };

      switch (errorData.errorCode) {
        case "TOKEN_NOT_FOUND":
          alert("로그인이 필요합니다.\n다시 로그인해주세요.");
          router.push("/login"); // 로그인 페이지로 리디렉션
          break;
        case "INVALID_TOKEN":
          alert("로그인이 필요합니다.\n다시 로그인해주세요.");
          router.push("/login"); // 로그인 페이지로 리디렉션
          break;
        case "NETWORK_ERROR":
          alert("네트워크 오류가 발생했습니다.");
          break;
        default:
          alert(`에러 발생: ${errorData.errorMessage}`);
      }
    }
  }, [todoState.error, router]);

  const handleModalCalendarOpen = () => {
    setIsMCalendarVisible(true);
    dispatch(setIsModal(true));
  };

  const handleModalCalendarClose = () => {
    setIsMCalendarVisible(false);
    dispatch(setIsModal(false));
  };

  return (
    <div className={classes["contents-inner-box"]}>
      {/* PC일 경우 달력 표시, MOBILE일 경우, 일자 슬라이드 표시 */}
      {screenState.isMobile == false && (
        <>
          <div className={classes["con-left-box"]}>
            <CalendarBox />
          </div>

          <div className={classes["con-right-box"]}>
            <div className={classes["sel-todo_date"]}>
              {formatDate(
                todoState.selDate !== null
                  ? new Date(todoState.selDate)
                  : new Date(),
                "yyyy년 MM월 dd일"
              )}
            </div>
            <TodoInputBox />
            <TodoListBox />
          </div>
        </>
      )}

      {/* MOBILE일 경우, 일자 슬라이드 표시 */}
      {screenState.isMobile == true && (
        <>
          <div className={classes["mobile-fixed"]}>
            <div>
              <p
                className={classes["mobile-sel-month"]}
                onClick={handleModalCalendarOpen}
              >
                {formatDate(
                  todoState.selCalendarDate !== null
                    ? new Date(todoState.selCalendarDate)
                    : new Date(),
                  "yyyy년 MM월"
                )}
                <i className="xi-angle-down-min"></i>
              </p>
              <CalendarDateList />

              <TodoInputBox />
            </div>
          </div>
          <div className={classes["mobile-con-box"]}>
            <TodoListBox />
            {isMCalendarVisible && (
              <ModalCalendar
                handleModalCalendarClose={handleModalCalendarClose}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
