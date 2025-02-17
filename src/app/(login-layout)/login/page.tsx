"use client";

import React, { useEffect, useState, Suspense } from "react";
import classes from "./LoginPage.module.css";
import Image from "next/image";
import logo from "../../../../public/images/common/logo.png";
import kakaoSymbol from "../../../../public/images/common/kakao_symbol.png";
import googleSymbol from "../../../../public/images/common/google_symbol.png";
import { useSearchParams } from "next/navigation";
import { deleteCookie } from "../../util/cookie";


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}

function Login() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState(null);

  useEffect(() => {
    // 로그인 페이지에 들어올 때 로컬 스토리지 비우기
    deleteCookie("token");
  },[]);

  //카카오 로그인
  const kakaoLoginHandler = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
    console.log(kakaoAuthUrl)
    window.location.href = kakaoAuthUrl;
  };

  //구글 로그인
  const googleLoginHandler = () => {
    // 구글 OAuth에서 요청할 scope
    const scope =
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
    // // 구글 인증 URL 생성
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=${scope}`;

    // // 브라우저를 구글 로그인 페이지로 리디렉션
    window.location.href = googleAuthUrl;
  };

  return (
    <div className={classes["login-con-box"]}>
      <div className={classes["img-box"]}>
        <Image src={logo} alt={"갓생"} priority />
      </div>
      <h2 className={classes["title"]}>갓생</h2>

      <div className={classes["txt-box"]}>
        <p className={`${classes["txt"]} ${classes["txt-1"]}`}>
          생각보다 별거 아닐지 몰라.
        </p>
        <p className={`${classes["txt"]} ${classes["txt-2"]}`}>
          지금 시작해볼래?
        </p>
      </div>
      <div  className={`${classes["login-btn-box"]}`}>
        <button
          className={`${classes["login-btn"]} ${classes["kakao"]}`}
          onClick={kakaoLoginHandler}
        >
          <span className={`${classes["login-btn-symbol"]}`}>
            <Image src={kakaoSymbol} alt="카카오" priority />
          </span>
          카카오로 시작하기
        </button>
        <button
          className={`${classes["login-btn"]} ${classes["google"]}`}
          onClick={googleLoginHandler}
        >
          <span className={`${classes["login-btn-symbol"]}`}>
            <Image src={googleSymbol} alt="구글" priority />
          </span>
          구글로 시작하기
        </button>
  
      </div>
      <p className={classes["copy"]}>
        Copyright 2025. Gori. All rights reserved
      </p>
      {/* https://platform.foxdata.com/en/app-profile/1542510906/RU/as */}
    </div>
  );
}
