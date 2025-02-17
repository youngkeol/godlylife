import React from "react";
import classes from "./MemoListBox.module.css";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

//redux
import { RootState, AppDispatch } from "@/app/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import {fetchUdtMemoSort, setSelMemo} from '@/app/redux/features/memoSlice';

const MemoListBox = ({modalOpen}: {modalOpen:()=>void}) => {
  const memoState = useSelector((state: RootState) => state.memo);
  const dispatch = useDispatch<AppDispatch>();

  const handleSelMemo = (idx: number) => {
    dispatch(setSelMemo(idx));
  };

  // 드래그 시작 시 호출되는 핸들러
  const handleDragStart = (start: any) => {};

  //드래그 종료 핸들러
  const handleDragEnd = async(result: any) => {
    // 목적지가 없으면 리턴
    const { destination, source, reason } = result;
    // 목적지가 없으면 리턴
    if (!destination || destination.droppableId !== "memoDroppable") {
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

    //순서 변경 로직
    const memoList = memoState.memoList;
    const reorderedList = Array.from(memoState.memoList);
    const [removedItem] = reorderedList.splice(source.index, 1); // 드래그된 아이템 제거
    reorderedList.splice(destination.index, 0, removedItem); // 새로운 위치에 아이템 추가
    
    // 순서대로 sort 값을 업데이트
    const updatedList = reorderedList.map((item, index) => ({
      ...item,
      sort: reorderedList.length - index  // 1부터 시작하는 sort 값 부여
    }));
    
    const udtMemoSortAction = await dispatch(fetchUdtMemoSort(updatedList))

  };

  return (
    <div className={classes["memo-list-box"]}>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Droppable droppableId="memoDroppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={classes["memo-list"]}
            >
              {
                memoState.memoList.length <=0 && <div
                className={classes["memo-list-empty"]}
                >메모가 존재하지 않습니다.<br/>메모를 등록해 주세요.</div>
              }
              {memoState.memoList?.map((item, index) => (
                <Draggable
                  key={item.idx}
                  draggableId={String(item.idx)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`${classes["memo-list-item"]}`}
                      onClick={() => {
                        handleSelMemo(item.idx);
                        modalOpen();
                      }}
                    >
                      <div
                        className={`${classes["memo-list-drag"]}`}
                        {...provided.dragHandleProps}
                      >
                        <i className={`xi-drag-vertical`}></i>
                      </div>
                      <div className={`${classes["memo-list-title"]}`}>
                        {item.content}
                      </div>
                      <i
                        className={`xi-angle-right ${classes["memo-list-arr"]}`}
                      ></i>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* <ul className={classes["memo-list"]}>
        {memoState.memoList.map((item) => {
          return (
            <li key={item.idx}>
              {item.title}
              <i className="xi-angle-right"></i>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};

export default MemoListBox;
