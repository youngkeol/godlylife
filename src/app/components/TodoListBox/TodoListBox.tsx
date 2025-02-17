"use client";

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import classes from "./TodoListBox.module.css";
import TodoCheckInput from "../TodoCheckInput/TodoCheckInput";

// redux
import { RootState, AppDispatch } from "../../redux/store/store";
import {
  fetchDelTodo,
  fetchUdtTodoSort,
  setError
} from "../../redux/features/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import emptyMessages from '@/app/data/emptyMessages';


const TodoListBox = () => {
  //const [todoList, setTodoList] = useState(TodoList);

  const todoState = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();
  const [randomMessage, setRandomMessage] = useState(emptyMessages[0]);

  //const randomMessage = emptyMessages[Math.floor(Math.random() * emptyMessages.length)];

  useEffect(()=> {
    setRandomMessage(emptyMessages[Math.floor(Math.random() * emptyMessages.length)])
  }, [todoState.selDate])

  const handlerDelTodo = async(idx:number) => {

    try {
      const resultAction = await dispatch(fetchDelTodo({idx})).unwrap();
    
      
    } catch(error) {
        alert("데이터 삭제에 실패했습니다. \n다시 시도 해주세요.");
        dispatch(setError(null));
    }
  }


  // 드래그 시작 시 호출되는 핸들러
  const handleDragStart = (start: any) => {
    //console.log("드래그 시작:", start);
  };

  // 드래그 종료 시 호출되는 핸들러
  const handleDragEnd = async(result: any) => {

    const { destination, source, reason } = result;
    
    // 목적지가 없으면 리턴
    if (!destination || destination.droppableId !== "droppable") {
      return;
    }

    //정상적인 드롭으로 안끝나면 리턴
    if(reason !== "DROP") {
      return;
    }

    // 순서가 변경되지 않으면 리턴
    // 시작 인덱스 : source.index
    // 종료 인덱스 : destination.index
    if (
      destination.droppableId === source.droppableId
      &&  destination.index === source.index
    ) {
      return;
    }

    // 순서 변경 로직
    const todoList = todoState.todoList;
    const reorderedList = Array.from(todoState.todoList);
    const [removedItem] = reorderedList.splice(source.index, 1); // 드래그된 아이템 제거
    reorderedList.splice(destination.index, 0, removedItem); // 새로운 위치에 아이템 추가
    
    // 순서대로 sort 값을 업데이트
    const updatedList = reorderedList.map((item, index) => ({
      ...item,
      sort: index + 1  // 1부터 시작하는 sort 값 부여
    }));
    
    try {
      //DB 데이터 업데이트
      const udtTodoSortAction = await dispatch(fetchUdtTodoSort(updatedList)).unwrap();
    } catch(error) {
      alert("데이터 저장에 실패했습니다. \n다시 시도해 주세요.");
      dispatch(setError(null));
    }
    //console.log("드래그 종료:", result);
  };
  // console.log(`todoState.todoList`);
  // console.log(todoState.todoList)
  // console.log(todoState.calendarTodoList)
  return (
    <div className={classes["todo-list-box"]}>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={classes["todo-list"]}
            >
              {todoState.todoList?.map((item, index) => (
                <Draggable
                  key={item.idx}
                  draggableId={String(item.idx)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      // {...provided.dragHandleProps}
                      className={`${classes["todo-list-item"]} ${classes["list-item-red"]}`}
                    >
                      <div
                        className={`${classes['todo-list-drag']}`}
                        
                        //{...provided.draggableProps}
                        {...provided.dragHandleProps}

                      >

                        <i className={`xi-drag-vertical`}></i>
                      </div>
                      <TodoCheckInput 
                        color={item.color} 
                        idx={item.idx} 
                        completed = {item.completed}
                      />
                      <span
                        className={`${classes['todo-list-item-content']} ${item.completed === 1 ? classes['completed']: ''}`}
                      >{item.content}</span>
                      <button 
                        className={classes["todo-list-item-cancel"]}
                        onClick={() => handlerDelTodo(item.idx)}
                      >
                        <i className={"xi-close-min"}></i>
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {
                todoState.todoList.length ==0 && 
                
                <div className={`${classes["todo-list-empty"]}`}>
                    {randomMessage.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))} 
                </div>
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TodoListBox;
