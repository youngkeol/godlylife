"use client";

import React, { ReactNode, useEffect } from 'react';
import { usePathname } from "next/navigation";

import Header from '../components/Header/Header';
import MobileFooter from '../components/MobileFooter/MobileFooter';

import { RootState, AppDispatch } from "@/app/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setIsModal } from '../redux/features/commonSlice';
import { setIsMobile } from '../redux/features/screenSlice';

import { formatDate, getMonthStartEndDates } from "@/app/util/date";
import { fetchSelCalendarTodoList } from '../redux/features/todoSlice';



const DefaultLayout = ({children}: {children:ReactNode}) => {
  const pathname = usePathname();

  const commonState = useSelector((state: RootState) => state.common);
  const screenState = useSelector((state: RootState) => state.screen);
  const todoState = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();



  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth <= 998));
      if(window.innerWidth <= 998){

        // console.log(todoState)
        // console.log(todoState.selDate);
        // console.log(todoState.selCalendarDate);
        // let selDate = todoState.selDate? new Date(todoState.selDate) : new Date();
        // let selCalendarDate = todoState.selCalendarDate ? new Date(todoState.selCalendarDate) : new Date();
        // if(formatDate(selDate, 'yyyy-MM') != formatDate(selCalendarDate, 'yyyy-MM')){
        //   console.log("데이터 틀림");
        //   //selDate 기준

        //   //calendarDateRage 변경
        //   console.log("@@@@@@@@" + selDate)
        //   fetchSelCalendarTodoList(todoState.selDate?todoState.selDate: formatDate(new Date()));
        //   console.log("@@@@@@@@")
        //   //selCalendarDate 변경
        //   //CalnederList 변경
        //   console.log(todoState)
        // }else {
        //   console.log('데이터 맞음')
        // }
      }
    };

    // 화면 크기 변경을 감지하여 모바일 여부를 업데이트
    window.addEventListener("resize", handleResize);
    
    // 화면 크기 변경이 있을 때마다 실행되도록
    handleResize(); 

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenState]); // dispatch만 의존성으로 설정



    //모달 열리고 닫힐때 body style 조정
    useEffect(() => {
      if (commonState.isModal) {
        // 모달이 열릴 때
        //document.documentElement.style.overflow = "hidden"; // html의 overflow를 숨김
        document.body.style.overflow = "hidden"; // body의 overflow를 숨김
      } else {
        // 모달이 닫힐 때
        //document.documentElement.style.overflow = "auto"; // html의 overflow를 자동으로 복구
        document.body.style.overflow = "auto"; // body의 overflow를 자동으로 복구
      }
  
      // 컴포넌트 언마운트 시에도 기본 상태로 복구
      return () => {
        //document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
      };
    }, [commonState.isModal]);
  




  return (
    <div className={`wrapper ${screenState.isMobile && 'mobile-wrapper'} `}>
      {!screenState.isMobile &&
        <Header />
      }
      <div className={`contents ${pathname ==='/' ? 'todo-contents':''}`}>
        {children}
      </div>
      
      {screenState.isMobile &&
        <MobileFooter />
      }
      
    </div>
  );
};

export default DefaultLayout;