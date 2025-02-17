"use client"; //

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./MobileFooter.module.css";
import todo from "../../../../public/images/common/todo.png";
import goal from "../../../../public/images/common/goal.png";
import memo from "../../../../public/images/common/memo.png";
import logout from "../../../../public/images/common/logout.png";
import todoAc from "../../../../public/images/common/todo_ac.png";
import goalAc from "../../../../public/images/common/goal_ac.png";
import memoAc from "../../../../public/images/common/memo_ac.png";
import logoutAc from "../../../../public/images/common/logout_ac.png";

import Image from "next/image";

const MobileFooter = () => {
  const pathname = usePathname();

  return (
    <div className={classes["mobile-footer-box"]}>
      <div className={classes["mobile-footer-box-inner"]}>
        <ul className={classes["mobile-footer-gnb"]}>
          <li>
            <Link
              href="/"
              className={
                pathname === "/"
                  ? `${classes["mobile-footer-link"]} ${classes["link-ac"]}`
                  : `${classes["mobile-footer-link"]}`
              }
            >
              <div>
                <Image
                  src={pathname === "/" ? todoAc : todo}
                  alt="할 일 관리"
                  width={24}
                  height={24}
                />
                <span>할 일 관리</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/goal"
              className={
                pathname === "/goal"
                  ? `${classes["mobile-footer-link"]} ${classes["link-ac"]}`
                  : `${classes["mobile-footer-link"]}`
              }
            >
              <div>
                <Image
                  src={pathname === "/goal" ? goalAc : goal}
                  alt="목표 관리"
                  width={24}
                  height={24}
                />
                <span>목표 관리</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/memo"
              className={
                pathname === "/memo"
                  ? `${classes["mobile-footer-link"]} ${classes["link-ac"]}`
                  : `${classes["mobile-footer-link"]}`
              }
            >
              <div>
                <Image
                  src={pathname === "/memo" ? memoAc : memo}
                  alt="메모 관리"
                  width={24}
                  height={24}
                />
                <span>메모 관리</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className={
                pathname === "/more"
                  ? `${classes["mobile-footer-link"]} ${classes["link-ac"]}`
                  : `${classes["mobile-footer-link"]}`
              }
            >
              <div>
              <Image
                  src={pathname === "/login" ? logoutAc : logout}
                  alt="로그아웃"
                  width={24}
                  height={24}
                />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileFooter;
