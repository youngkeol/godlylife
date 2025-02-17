"use client"

import React from "react";
import classes from "./TodoCheckInput.module.css";
// redux
import { RootState, AppDispatch } from "../../redux/store/store";
import {
  fetchUdtCompleteTodo,
  setError
} from "../../redux/features/todoSlice";
import { useDispatch, useSelector } from "react-redux";


const TodoCheckInput = ({color, idx, completed}:{color:string, idx:number, completed:number}) => {

  const todoState = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();


  const handleCheckboxChange = async(idx:number) => {
    try {
      await dispatch(fetchUdtCompleteTodo({idx})).unwrap();
    } catch(error) {
        alert("데이터 저장에 실패했습니다. \n다시시도해주세요.");
        dispatch(setError(null));
    }
  }

  return (
    <div className={`${classes["todo-check-box"]} ${classes[color]}`}>
      <input id={`${idx}`} 
        className="hidden" 
        type="checkbox" 
        checked = {completed== 1}
        onChange={()=> handleCheckboxChange(idx)} 
      />
      <label
        className={`${classes["todo-check-label"]}`}
        htmlFor={`${idx}`}
      >
        <i className={'xi-check'}></i>
      </label>
    </div>
  );
};

export default TodoCheckInput;
