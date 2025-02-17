import React, { useRef, useState, useEffect} from "react";
import classes from "./GoalFormBox.module.css";
import TooltipColorPicker from "../TooltipColorPicker/TooltipColorPicker";
import colors from "@/app/data/colors";


import { RootState, AppDispatch } from "@/app/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchInsGoal, setError, setModalFlag } from "@/app/redux/features/goalSlice";


const AddGoalFormBox = ({ closeModal }: { closeModal: () => void }) => {
  const goalState = useSelector((state: RootState) => state.goal);
  const dispatch = useDispatch<AppDispatch>();

  const [selectedColor, setSelectedColor] = useState(colors[0].color);
  const [goalList, setGoalList] = useState<string[]>([]);

  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const goalInputRef = useRef<HTMLInputElement | null>(null);

  //컬러 선택
  const colorSelect = (color: string) => {
    setSelectedColor(color);
  };

  //상세 목표 등록
  const addGoalList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      e.preventDefault(); // 기본 이벤트 방지
      const newGoal = goalInputRef.current?.value.trim();

      if (newGoal && newGoal !== "") {
        setGoalList((prev) => {
          // 중복되지 않는 경우에만 추가
          if (!prev.includes(newGoal)) {
            return [...prev, newGoal];
          }
          return prev;
        });

        // 목표 추가 후 입력값 비우기
        if (goalInputRef.current) {
          goalInputRef.current.value = "";
        }
      }
    }
  };

  //상세 목표 삭제삭제
  const delDetailGoal = (content: string) => {
    const filterGoalList = goalList.filter((item) => item != content);
    setGoalList(filterGoalList);
  };


  //목표 등록
  const addGoalForm = async () => {
    const title = titleInputRef.current?.value;
    if (!title) {
      alert(`목표를 입력해 주세요.`);
      return false;
    }

    if (goalList.length <= 0) {
      alert(`세부 목표를 입력해 주세요.\n 세부 목표는 1개 이상 입력되어야 합니다.`);
      return false;
    }
    
    try {
      const resultAction = await dispatch(
        fetchInsGoal({ title, goalList, color: selectedColor })
      ).unwrap();
      
      //저장 성공시
      //dispatch(setModalFlag(0))
      closeModal();
    } catch (e) {
      alert("데이터 저장에 실패했습니다. \n다시 시도해 주세요.");
      dispatch(setError(null));
    }
  };

  return (
    <div className={classes["goal-form-box"]}>
      <div className={classes["goal-form-box-header"]}>목표 등록</div>
      <div className={classes["goal-form-box-con"]}>
        <div className={classes["goal-form-color-box"]}>
          {colors.map((color) => (
            <div
              key={color.color}
              onClick={() => colorSelect(color.color)}
              style={{
                backgroundColor: color.rgb,
                width: selectedColor === color.color ? `30px` : `26px`,
                height: selectedColor === color.color ? `30px` : `26px`,
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
          <input ref={titleInputRef} placeholder="목표를 입력해주세요." />
        </div>
        <div className={classes["goal-form-list-box"]}>
          {goalList.map((item, index) => {
            return (
              <div className={`${classes["goal-form-con-box"]}`} key={index}>
                <div className={classes["goal-form-con-inner"]}>
                  <p>{item}</p>
                  <span
                    className={classes["goal-list-icon"]}
                    onClick={() => delDetailGoal(`${item}`)}
                  >
                    <i className="xi-close-min"></i>
                  </span>
                </div>
              </div>
            );
          })}

          <div className={classes["goal-form-con-box"]}>
            <div className={classes["goal-form-con-inner"]}>
              <input
                placeholder="세부 목표를 입력해주세요."
                ref={goalInputRef}
                onKeyDown={(e) => addGoalList(e)}
              />
              <span
                className={classes["goal-list-icon"]}
                onClick={(e) => {
                  addGoalList;
                }}
              >
                <i className="xi-plus-min"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes["goal-form-footer"]}>
        <button className={classes["add"]} onClick={addGoalForm}>
          등록
        </button>
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
};

export default AddGoalFormBox;
