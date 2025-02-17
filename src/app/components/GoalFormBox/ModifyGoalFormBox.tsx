import React, { useEffect, useRef, useState } from "react";
import classes from "./GoalFormBox.module.css";
import TooltipColorPicker from "../TooltipColorPicker/TooltipColorPicker";
import colors from "@/app/data/colors";


import { RootState, AppDispatch } from "@/app/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchDelGoal, fetchUdtGoal, setError } from "@/app/redux/features/goalSlice";
import { title } from "process";
import { Goal, GoalDetail } from "@/types/goals";


const ModifyGoalFormBox = ({ closeModal }: { closeModal: () => void }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0].color);
  const [detailGoal, setDetailGoal] = useState<Goal>();
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const goalInputRef = useRef<HTMLInputElement | null>(null);
  
  const goalState = useSelector((state:RootState)=> state.goal);
  const dispatch = useDispatch<AppDispatch>()


  useEffect(()=>{
    if(goalState.goalList != null && goalState.selIdx != null) {
      let filterGoal = goalState.goalList.filter(item => item.idx ==  goalState.selIdx)[0];
      titleInputRef.current && (titleInputRef.current.value = filterGoal.title);
      setSelectedColor(filterGoal.color);
      setDetailGoal(filterGoal);
    }
  },[]);


  //컬러 선택
  const colorSelect = (color:string) => {
    if(detailGoal) {
      setSelectedColor(color);
      setDetailGoal({...detailGoal, color})
    }
  }


  //상세 목표 삭제
  const detailGoalCheck = (idx:string) =>{
      if(detailGoal) {
        const newData = detailGoal?.goalDetails?.map((item) =>
          item.sort === Number(idx)
        ? { ...item, completed: item.completed ^ 1 } // 새로운 객체 반환
        : item
      ) as GoalDetail[];
      setDetailGoal({ ...detailGoal, goalDetails: newData || [],});
    }
  }

  //삭제
  const delDetailGoal = (idx:string) => {
    if(detailGoal) {
      const filterGoalDetails = detailGoal.goalDetails.filter(item => item.idx != Number(idx));
      setDetailGoal({...detailGoal, goalDetails:filterGoalDetails})
    }

  }







    const addGoalList = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && e.nativeEvent.isComposing === false ) {
        e.preventDefault(); // 기본 이벤트 방지
        const newGoal = goalInputRef.current?.value.trim();
    
        if (detailGoal && newGoal && newGoal !== "") {
          const  detailGoalData = {

            idx: 0,
            content: newGoal,
            completed: 0,
          }
          const newDetailGoal = detailGoal.goalDetails ? [...detailGoal.goalDetails, detailGoalData] : [detailGoalData];
          const newDetailGoalSort =  newDetailGoal.map((item, index)=> {
            return {...item, sort: index+1}
          }) as GoalDetail[];

          console.log(detailGoal)
          setDetailGoal({...detailGoal, 
            goalDetails: newDetailGoalSort
          });
         
          // 목표 추가 후 입력값 비우기
          if (goalInputRef.current) {
            goalInputRef.current.value = "";
          }
        }
      }
    };


  //목표 수정
  const modifyGoal = () => {
    if(detailGoal) {

      const title = titleInputRef.current?.value.trim();
      if (!title) {
        alert(`목표를 입력해 주세요.`);
        return false;
      }

      if (detailGoal?.goalDetails.length <= 0) {
        alert(`세부 목표를 입력해 주세요.\n세부 목표는 1개 이상 입력되어야 합니다.`);
        return false;
      }
      
      try {
        dispatch(fetchUdtGoal(detailGoal)).unwrap();
        closeModal();
      }catch {
        alert("데이터 저장에 실패했습니다. \n다시 시도해 주세요.");
        dispatch(setError(null));
      }
    }
  }

  return (
    <div className={classes["goal-form-box"]}>
      <div className={classes["goal-form-box-header"]}>목표 수정</div>
      <div className={classes["goal-form-box-con"]}>
        <div className={classes["goal-form-color-box"]}>
          {colors.map((color) => (
            <div
              key={color.color}
              onClick={() => colorSelect(color.color)}
              style={{
                backgroundColor: color.rgb,
                width:  selectedColor === color.color ? `30px` : `26px`,
                height:  selectedColor === color.color ? `30px` : `26px`,
                borderRadius: "10px",
                cursor: "pointer",
                border:
                selectedColor === color.color
                  ? `4px solid ${color.bgRgb}`
                  : `1px solid ${color.bgRgb}`,
              }}
            />
          ))}
        </div>

        <div className={classes["goal-form-title-box"]}>
        <input 
            ref={titleInputRef}
            placeholder="목표를 입력해주세요." 
          />
        </div>

        <div className={classes["goal-form-list-box"]}>
        {detailGoal?.goalDetails.map((item, index) => {
          return (
            <div
              className={`${classes["goal-form-con-box"]} ${classes["goal-form-con-modify"]} ${item.completed == 1 ? classes['checked'] : ''}`}
              key={item.sort}
            >
              {/* <p className={`${classes["goal-form-con-drag"]}`}>
                <i className="xi-drag-vertical"></i>
              </p> */}
              <p className={`${classes["goal-form-con-check"]}`}
                onClick={()=>{detailGoalCheck(`${item.sort}`)}}
              >
                <i className="xi-check-min"></i>
              </p>
              <div className={classes["goal-form-con-inner"]}>
                <p>{item.content}</p>
                <span className={classes["goal-list-icon"]}
                  onClick={()=> delDetailGoal(`${item.idx}`)}
                >
                  <i className="xi-close-min"></i>
                </span>
              </div>
            </div>
          );
        })}

<div className={classes["goal-form-con-box"]}>
            <div className={classes["goal-form-con-inner"]}>
              <input placeholder="세부 목표를 입력해주세요." 
                ref={goalInputRef}
                onKeyDown = {(e)=> addGoalList(e)}
              />
              <span className={classes["goal-list-icon"]}
                onClick= {(e) => {addGoalList}}
              >
                <i className="xi-plus-min"></i>
              </span>
            </div>
          </div>



        </div>
      </div>
      <div className={classes["goal-form-footer"]}>
        <button className={classes["add"]}
        
          onClick={modifyGoal}
        >수정</button>
        <button
          onClick={closeModal}
        >닫기</button>
      </div>
    </div>
  );
};

export default ModifyGoalFormBox;
