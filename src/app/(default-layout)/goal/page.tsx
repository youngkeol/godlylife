"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./GoalPage.module.css";
import GoalListBox from "@/app/components/GoalListBox/GoalListBox";

import GoalLayout from "./GoalLayout";
import ModalUi from "@/app/components/ModalUi/ModalUi";

import { RootState, AppDispatch } from "@/app/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelGoalList, setModalFlag } from "@/app/redux/features/goalSlice";

import { Goal, Filter } from "@/types/goals";
import GoalFilter from "@/app/components/GoalFilter/GoalFilter";
import AddGoalFormBox from "@/app/components/GoalFormBox/AddGoalFromBox";
import ModifyGoalFormBox from "@/app/components/GoalFormBox/ModifyGoalFormBox";
import DetailGoalFormBox from  "@/app/components/GoalFormBox/DetailGoalFormBox";


export default function GoalPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  //const [modalFlag, setModalFlag] = useState(0);  //0 안띄움, 1: 등록, 2: 수정

  const [goalList, setGoalList] = useState<Goal[] | null>(null);
  const [filter, setFilter] = useState<Filter>({
    colors: [],
    status: "전체",
  });

  const router = useRouter();
  const screenState = useSelector((state: RootState) => state.screen);
  const goalState = useSelector((state: RootState) => state.goal);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSelGoalList());
    };
    setIsModalVisible(false);
    fetchData();
    setGoalList(goalState.goalList);
  }, []);

  useEffect(() => {
    setGoalList(goalState.goalList);
  }, [goalState.goalList]);



    //에러 처리
    useEffect(() => {
      if (
        typeof goalState.error === "object" && goalState.error !== null && "errorCode" in goalState.error
      ) {
        const errorData = goalState.error as {
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
    }, [goalState.error, router]);


  const filterChangeHandler = (filterData: Filter) => {
    setFilter({ ...filterData });

    const filterGoalList = goalState.goalList?.filter((item, index) => {
      let statusMatch = true;
      let colorMatch = true;

      // '완료' 상태 필터링
      if (filterData.status === "완료") {
        statusMatch = item.completed === 1;
      }
      // '진행중' 상태 필터링
      if (filterData.status === "진행중") {
        statusMatch = item.completed === 0;
      }

      // colors 필터링 (배열에 포함된 색상만 허용)
      if (filterData.colors && filterData.colors.length > 0) {
        // 색상이 하나라도 있으면 색상 필터링 적용
        colorMatch = filterData.colors.some(
          (colorObj) => colorObj.color === item.color
        );
      } else {
        // filter.colors가 null이거나 비어있으면 모든 색상 표시
        colorMatch = true;
      }

      // 두 조건을 모두 만족하는 경우만 반환
      return statusMatch && colorMatch;
    });

    setGoalList(filterGoalList ?? []);
  };

  const addGoalHandler = () => {
    //    setModalFlag(1);
    dispatch(setModalFlag(1));
    // setIsModalVisible(true);
  };

  const closeModalHandler = () => {
    dispatch(setModalFlag(0));
  };

  return (
    <>
      <GoalLayout
        leftContent={
          <>
            <div className={`${classes["goal-add-btn-box"]} `}>
              <button
                className={`${classes["goal-add-btn"]} `}
                onClick={addGoalHandler}
              >
                목표 등록
              </button>
            </div>
            <GoalFilter
              filter={filter}
              filterChangeHandler={filterChangeHandler}
            />
          </>
        }
        rightContent={
          <>
            <div className={classes["con-list-box"]}>
              <GoalListBox goalList={goalList} />
            </div>
          </>
        }
      />

      {goalState.modalFlag == 1 && (
        <ModalUi>
          <AddGoalFormBox closeModal={closeModalHandler} />
        </ModalUi>
      )}

      {goalState.modalFlag == 2 && (
        <ModalUi>
          <ModifyGoalFormBox closeModal={closeModalHandler} />
        </ModalUi>
      )}

      {goalState.modalFlag == 3 && (
        <ModalUi>
          <DetailGoalFormBox closeModal={closeModalHandler} />
        </ModalUi>
      )}
    </>
  );
}
