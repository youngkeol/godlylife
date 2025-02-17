import React, { useEffect, useRef, useState } from "react";
import classes from "./GoalFormBox.module.css";
import TooltipColorPicker from "../TooltipColorPicker/TooltipColorPicker";
import colors from "@/app/data/colors";

import { RootState, AppDispatch } from "@/app/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDelGoal,
  fetchUdtGoal,
  setError,
} from "@/app/redux/features/goalSlice";
import { title } from "process";
import { Goal, GoalDetail } from "@/types/goals";

const DetailGoalFormBox = ({ closeModal }: { closeModal: () => void }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0].color);
  const [detailGoal, setDetailGoal] = useState<Goal>();
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const goalInputRef = useRef<HTMLInputElement | null>(null);

  const goalState = useSelector((state: RootState) => state.goal);
  const dispatch = useDispatch<AppDispatch>();
  

  useEffect(() => {
    if (goalState.goalList != null && goalState.selIdx != null) {
      let filterGoal = goalState.goalList.filter(
        (item) => item.idx == goalState.selIdx
      )[0];
      titleInputRef.current && (titleInputRef.current.value = filterGoal.title);
      setSelectedColor(filterGoal.color);
      setDetailGoal(filterGoal);
    }
  }, []);

  return (
    <div className={classes["goal-form-box"]}>
      <div className={classes["goal-form-box-header"]}>목표</div>
      <div className={classes["goal-form-box-con"]}>
        <div className={classes["goal-form-color-box"]}>
          <div
            className={`${classes["goal-form-color"]} ${classes["disable"]}`}
            style={{
              backgroundColor:
                colors.find((item) => item.color === selectedColor)?.rgb ||
                "transparent",
              border: `4px solid #${
                colors.find((item) => item.color === selectedColor)?.bgRgb ||
                "transparent"
              }`,
            }}
          ></div>
        </div>

        <div className={classes["goal-form-title-box"]}>
          <input
            ref={titleInputRef}
            placeholder="목표를 입력해주세요."
            disabled
          />
        </div>

        <div className={classes["goal-form-list-box"]}>
          {detailGoal?.goalDetails.map((item, index) => {
            return (
              <div
                className={`${classes["goal-form-con-box"]} ${
                  classes["goal-form-con-modify"]
                } ${item.completed == 1 ? classes["checked"] : ""}`}
                key={item.sort}
              >
                {/* <p className={`${classes["goal-form-con-drag"]}`}>
                <i className="xi-drag-vertical"></i>
              </p> */}
                <p
                  className={`${classes["goal-form-con-check"]} ${classes["disable"]}`}
                >
                  <i className="xi-check-min"></i>
                </p>
                <div className={classes["goal-form-con-inner"]}>
                  <p>{item.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes["goal-form-footer"]}>
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
};

export default DetailGoalFormBox;
