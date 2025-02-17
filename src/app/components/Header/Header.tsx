import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import classes from "./Header.module.css";
import logo from "../../../../public/images/common/logo.png";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={classes["header"]}>
      <h1 className={classes["header-logo"]}>
        <div className={classes["header-logo-img-box"]}>
          <Image src={logo} alt={`갓생`} style={{ objectFit: "contain" }} />
        </div>
        <span>갓생</span>
      </h1>
      <ul className={classes["gnb"]}>
        <li>
          <Link href="/" className={pathname === "/" ? `${classes["ac"]}` : ""}>
            할 일 관리
          </Link>
        </li>
        <li>
          <Link
            href="/goal"
            className={pathname === "/goal" ? `${classes["ac"]}` : ""}
          >
            목표 관리
          </Link>
        </li>
        <li>
          <Link
            href="/memo"
            className={pathname === "/memo" ? `${classes["ac"]}` : ""}
          >
            메모 관리
          </Link>
        </li>
        <li>
          <Link
            href="/login"
            className={pathname === "/login" ? `${classes["ac"]}` : ""}
          >
            <i className={`xi-power-off`}></i>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
