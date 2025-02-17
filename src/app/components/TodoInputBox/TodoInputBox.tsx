"use client";

import React, { useState, useRef } from "react";
import classes from "./TodoInputBox.module.css";
import TooltipColorPicker from "../TooltipColorPicker/TooltipColorPicker";

import colors from "@/app/data/colors";
import { colorType } from "@/types/colors";

// redux
import { RootState, AppDispatch } from "../../redux/store/store";
import {
  fetchInsTodo,
  setError
} from "../../redux/features/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const TodoInputBox = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]); // 선택된 색상 상태
  const inputRef = useRef<HTMLInputElement>(null);
    const todoState = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch<AppDispatch>();



  //컬러 선택
  const handleColorPicker = (color: colorType) => {
    setSelectedColor(color);
  };


  //할일 등록
  const onSubmitHandler = async(e: React.FormEvent) => {
    e.preventDefault();
    if(inputRef.current?.value != '' && inputRef.current?.value != null) {
      try {
        let content = inputRef.current.value;
        let selDate = todoState.selDate;
        const resultAction = await dispatch(fetchInsTodo({selDate, content, color:selectedColor})).unwrap();;
        inputRef.current.value = '';
      }catch(e) {
        alert("데이터 저장에 실패했습니다. \n다시 시도해 주세요.");
        dispatch(setError(null));
      }
    }
  }


  return (
    <div className={classes["todo-input-box"]}>
      <TooltipColorPicker
        selectedColor={selectedColor}
        handleColorPicker={handleColorPicker}
      />
      <form onSubmit={onSubmitHandler}>
        <input 
          ref={inputRef}
          placeholder="할 일을 입력해주세요." 
        />
        <button className={classes["todo-add-btn"]}>입력</button>
      </form>
    </div>
  );
};

export default TodoInputBox;
