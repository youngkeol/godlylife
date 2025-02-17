import React from "react";
import { SyncLoader } from "react-spinners";

// 기본 스타일을 props로 받아서 적용
const SyncLoaderBox = ({
  color = "#fff",
  cssOverride = { width: "100%", margin: "0px auto", opacity: "1" },
  txt = "로딩중입니다.",
}) => {
  return (
    <div style={{ textAlign: "center", width:"100%"}}>
      <SyncLoader
        color={color}
        loading
        margin={5}
        size={10}
        cssOverride={cssOverride}
      />
      <span style={{ color: color, opacity: cssOverride.opacity }}>{txt}</span>
    </div>
  );
};

export default SyncLoaderBox;
