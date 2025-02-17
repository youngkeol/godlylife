import React, { useEffect, useState, useRef } from "react";

//css
import classes from "./MemoFormBox.module.css";

//Redux
import { RootState, AppDispatch } from "@/app/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDelMemo,
  fetchInsMemo,
  fetchUdtMemo,
  setError,
} from "@/app/redux/features/memoSlice";

import { formatDate } from "@/app/util/date";

interface Memo {
  idx: number;
  content: string;
  sort: number;
  udtDate: string;
}

const MemoFormBox = () => {
  let [memo, setMemo] = useState<Memo | null>();
  const [isSaving, setIsSaving] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  // 디바운스 타이머
  let saveTimeout = useRef<NodeJS.Timeout | null>(null);
  let insTimeout = useRef<NodeJS.Timeout | null>(null);

  const screenState = useSelector((state: RootState) => state.screen);
  const memoState = useSelector((state: RootState) => state.memo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (memoState.selIdx != null) {
      let selMemo = memoState.memoList.filter(
        (item) => item.idx == memoState.selIdx
      )[0];
      setMemo(selMemo);
      if (contentRef.current) contentRef.current.value = selMemo.content;
    } else {
      setMemo(null);
      if (contentRef.current) contentRef.current.value = "";
    }
  }, [memoState.selIdx]);

  const handleMemoChange = (field: keyof Memo, value: string) => {
    if (memo) {
      const content = contentRef.current?.value || ""; // contentRef로 수정
      const updatedMemo: Memo = {
        ...memo,
        content,
        udtDate: formatDate(new Date(), "yyyy-MM-dd HH:mm:ss"),
      };
      setMemo(updatedMemo);
      handleAutoSave(updatedMemo);
    } else {
      console.log("insMemo");
      // 새 메모 생성 로직
      const newMemo: Memo = {
        idx: Date.now(), // 고유 ID 생성 (임시)
        content: contentRef.current ? contentRef.current.value : "",
        sort: 0, // 기본값 설정
        udtDate: formatDate(new Date(), "yyyy-MM-dd HH:mm:ss"),
      };

      handleAutoIns(newMemo);
    }
  };

  const handleAutoSave = (updatedMemo: Memo) => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current); // 기존 타이머 제거

    saveTimeout.current = setTimeout(() => {
      console.log("자동 저장 시작");
      setIsSaving(true);

      dispatch(fetchUdtMemo(updatedMemo)).finally(() => {
        setIsSaving(false);
      });
    }, 1000); // 1초 후 저장
  };

  const handleAutoIns = (insertedMemo: Memo) => {
    if (insTimeout.current) clearTimeout(insTimeout.current); // 기존 타이머 제거

    insTimeout.current = setTimeout(async () => {
      try {
        const resultAction = await dispatch(
          fetchInsMemo(insertedMemo)
        ).unwrap();
        //console.log("resultAction");
        //console.log(resultAction);
        let { idx, content, sort, udtDate } = resultAction;
        setMemo({
          idx,
          content,
          sort,
          udtDate,
        });
      } catch (e) {
        alert("데이터 저장에 실패했습니다. \n다시 시도 해주세요.");
        dispatch(setError(null));
      }
      //console.log("자동 등록");
    }, 1000);
  };

  const handleDelMemo = () => {
    //console.log("삭제");
    const deleleConfirm = confirm('메모를 삭제하시겠습니까? \n삭제 시 복수할 수 없습니다')
    if (deleleConfirm && memoState.selIdx) {
      dispatch(fetchDelMemo(memoState.selIdx));
    }
  };

  return (
    <div className={classes["memo-form-box"]}>
      <textarea
        className={`${classes["memo-form-content"]} ${memo && classes['memo-form-content-editer']}`}
        placeholder="메모 내용을 입력해주세요."
        wrap="hard"
        ref={contentRef}
        //value={memo?.content}
        onChange={(e) => handleMemoChange("content", e.target.value)}
      />
      {memo && (
        <div className={classes["memo-form-box-footer"]}>
          <button
            className={`${classes["memo-form-btn"]} ${classes["memo-form-del-btn"]}`}
            onClick={handleDelMemo}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoFormBox;
