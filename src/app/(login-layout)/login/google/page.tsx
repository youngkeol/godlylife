"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SyncLoaderBox from "@/app/components/SyncLoader/SyncLoaderBox";
import axios from "axios";
import { useRouter } from "next/navigation";


const GoogleLoginPage = () => (
  <Suspense
    fallback={
      <SyncLoaderBox
        cssOverride={{
          width: "100%",
          margin: "50px auto 50px",
          opacity: "0.9",
        }}
        txt="로그인 처리를 진행 중입니다."
      />
    }
  >
    <GoogleLogin />
  </Suspense>
);


const GoogleLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string | null>(null);


  useEffect(() => {
    const getKakaoCode = async () => {
      const codeParam = searchParams.get("code"); // URL에서 code 파라미터를 가져옴

      if (codeParam) {
        setCode(codeParam); // state에 code 값 저장
        //console.log("구글 인증 코드:", codeParam);
        try {
          // 서버에 code를 보내서 액세스 토큰을 요청
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_GODLY_LIFE_SERVER}/auth/googleLogin`,
            {
              code: codeParam,
            },
            {
              withCredentials: true, // 쿠키 포함 요청
            }
          );

          if (response.data.success == true) {
            //로그인 성공
            console.log("메인페이지 이동")
            router.push("/");
          } else {
            //로그인 실패 -> 로그인 페이지로 이동
            window.location.href = "/login";
          }
        } catch (error) {
          console.error("구글 로그인 실패:", error);
          window.location.href = "/login";
        }
      }
    };

    getKakaoCode();
  }, []);

  return (
    <>
      <SyncLoaderBox
        cssOverride={{
          width: "100%",
          margin: "50px auto 50px",
          opacity: "0.9",
        }}
        txt="로그인 처리를 진행 중입니다."
      />
    </>
  );
}



export default GoogleLoginPage;