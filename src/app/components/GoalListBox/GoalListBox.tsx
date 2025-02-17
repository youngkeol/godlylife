import React, { useEffect, useState, useRef} from "react";
import classes from "./GoalListBox.module.css";
import GoalProgressBar from "../GoalProgressBar/GoalProgressBar";
import { Goal } from "@/types/goals";

import { RootState, AppDispatch } from "@/app/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setSelIdx, setModalFlag, setError, fetchDelGoal } from "@/app/redux/features/goalSlice";

const GoalListBox = ({ goalList }: { goalList: Goal[] | null }) => {
  const [openModeIndex, setOpenModeIndex] = useState<number | null>(null);
  const moreRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const moreContentRef = useRef<(HTMLDivElement | null)[]>([]);

  const goalState = useSelector((state:RootState)=> state.goal);
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // `moreRef.current`와 `moreContentRef.current`가 모두 배열이고, 배열의 요소들이 null이 아닌지 체크
      if (
        moreRef.current.some(
          (p) => p && p.contains(event.target as Node)
        ) ||
        moreContentRef.current.some(
          (content) => content && content.contains(event.target as Node)
        )
      ) {
        return; // 내부 클릭이면 아무 작업 안 함
      }
      setOpenModeIndex(null); // 외부 클릭이면 닫기
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  const openMoreBox = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>, idx:string) => {
    e.stopPropagation();
    setOpenModeIndex((prevIndex) => (prevIndex === Number(idx) ? null :Number(idx)));
  }

  const deleteGoal = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>, idx:string) => {
    e.stopPropagation();
    let delConfirmFalg = confirm(`목표를 삭제하시겠습니까? \n삭제 시 복수할 수 없습니다.`);
    if(delConfirmFalg) {
      dispatch(fetchDelGoal({idx})).unwrap();
    }
  }
  const modifyGoal = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>, index:string) => {
    e.stopPropagation();
    dispatch(setSelIdx(index));
    dispatch(setModalFlag(2));
  }

  const detailGoal = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, index:string) => {
    e.stopPropagation();
    dispatch(setSelIdx(index));
    dispatch(setModalFlag(3));
  }



  return (
    <div className={classes["goal-list-box"]}>
      <ul className={classes["goal-list"]}>
        {
          goalList == null ||  goalList.length <=0 && <li
          className={`${classes["goal-box-empty"]}`}
          >
            목표가 존재하지 않습니다.<br/>목표를 등록해 주세요.
          </li>
        }
        {goalList != null && goalList.length >0 && 
          goalList.map((item) => (
            <li
              className={`${classes["goal-box"]} ${classes[item.color]}`}
              key={item.idx}
              onClick={(e) => detailGoal(e, `${item.idx}`)}
            >
              <p className={classes["goal-box-status"]}>
                {item.completed == 0 ? "진행중" : "완료"}
              </p>
              <div className={classes["goal-box-util"]}>
                <p className={classes["goal-box-more-btn"]}
                  onClick={(e) => openMoreBox(e, `${item.idx}`)}
                  ref={(el) => {
                    if (el) moreRef.current[item.idx] = el; // idx로 각 요소에 접근
                  }}
                >
                  <i className="xi-ellipsis-h"></i>
                </p>

                {openModeIndex === item.idx && 
                  <div className={classes["goal-box-more-box"]}
                  ref={(el) => {
                    if (el) moreContentRef.current[item.idx] = el; // idx로 각 요소에 접근
                  }}
                  >
                    <p
                      className={classes["goal-box-udt-btn"]}
                      onClick={(e) => modifyGoal(e, `${item.idx}`)}
                    >
                      수정
                    </p>
                    <p
                      className={classes["goal-box-del-btn"]}
                      onClick={(e) => deleteGoal(e, `${item.idx}`)}
                    >
                      삭제
                    </p>
                  </div>
                }
              </div>

              <h3 className={classes["goal-box-title"]}>{item.title}</h3>
              <GoalProgressBar
                color={item.color}
                totalCnt={(item.goalDetails || []).length}
                completedCnt={
                  (item.goalDetails || []).filter((goal) => goal.completed == 1)
                    .length
                }
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GoalListBox;
