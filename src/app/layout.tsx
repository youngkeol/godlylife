"use client";
import { Helmet } from "react-helmet";
import Head from "next/head";
import "../../public/fonts/tenada.css"; //로고
import "../../public/fonts/kotraBold.css"; // 강조
import "../../public/fonts/nanumBarunGothic.css"; //일반
import "../../public/xeicon/xeicon.css";
//import '../../public/fonts/stuning.css';
import "../../public/fonts/nanumSquareRound.css";
//import '../../public/fonts/gamtanRoadGamtan.css';

import "./globals.css";
import "../../public/css/common.css";

import { Provider } from "react-redux";
import { store } from "./redux/store/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head>
        <title>갓생</title>
        <meta
          name="description"
          content="갓생에서 목표를 설정하고 관리하세요. 설명"
        />
        <meta name="keywords" content="갓생, 할일관리, 목표관리, 메모관리" />
        <meta name="author" content="younggori" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta property="og:title" content="갓생" />
        <meta
          property="og:description"
          content="갓생에서 목표를 설정하고 관리하세요."
        />
        <meta
          property="og:image"
          content="https://godlylife.younggori.com/images/common/logo.png"
        />
        <meta property="og:url" content="https://godlylife.younggori.com" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
