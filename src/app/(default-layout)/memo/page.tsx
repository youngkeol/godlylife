"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//component
import MemoListBox from "@/app/components/MemoListBox/MemoListBox";
import MemoFormBox from "@/app/components/MemoFormBox/MemoFormBox";
import MobileMemoFormBox from "@/app/components/MemoFormBox/MobileMemoFormBox";
//redux
import { RootState, AppDispatch } from "@/app/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelMemoList, setSelMemo } from "@/app/redux/features/memoSlice";
import { setIsModal } from "@/app/redux/features/commonSlice";

//css
import classes from "./MemoPage.module.css";
import ModalUi from "@/app/components/ModalUi/ModalUi";

export default function MemoPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const router = useRouter();
  const screenState = useSelector((state: RootState) => state.screen);
  const commonState = useSelector((state: RootState) => state.common);
  const sceenState = useSelector((state: RootState) => state.screen);
  const memoState = useSelector((state: RootState) => state.memo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    //처음 데이터 부럴오기
    dispatch(fetchSelMemoList());
    setIsModalVisible(false);
  }, []);

  useEffect(() => {
    setIsModalVisible(false);
    dispatch(setIsModal(false));
  }, [sceenState.isMobile]);

  //에러 처리
  useEffect(() => {
    if (
      typeof memoState.error === "object" &&
      memoState.error !== null &&
      "errorCode" in memoState.error
    ) {
      const errorData = memoState.error as {
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
  }, [memoState.error, router]);

  const handlerAddMemo = () => {
    dispatch(setSelMemo(null));
    handlerModalOpen();
  };

  const handlerModalOpen = () => {
    setIsModalVisible(true);
    dispatch(setIsModal(true));
  };

  const handlerModalClose = () => {
    setIsModalVisible(false);
    dispatch(setIsModal(false));
  };

  return (
    <div className={classes["contents-inner-box"]}>
      <div className={classes["con-left-box"]}>
        <div className={classes["fix-box"]}>
          <div className={classes["memo-add-btn-box"]} onClick={handlerAddMemo}>
            <i className="xi-plus-min"></i>
            <button className={classes["memo-add-btn"]}>메모 등록</button>
          </div>
        </div>
      </div>

      <div className={classes["con-right-box"]}>
        <div className={classes["con-memo-box"]}>
          <MemoListBox modalOpen={handlerModalOpen} />
        </div>
        {/* <MemoFormBox /> */}
      </div>

      {isModalVisible == true && (
        <ModalUi>
          <MobileMemoFormBox modalClose={handlerModalClose} />
        </ModalUi>
      )}
    </div>
  );
}
