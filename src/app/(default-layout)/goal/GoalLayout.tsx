"use client";

import React, { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import classes from "./GoalLayout.module.css";

const GoalLayout = ({
  leftContent,
  rightContent,
}: {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <div className={classes["contents-inner-box"]}>
      <div className={classes["con-left-box"]}>
        <div className={classes["fix-box"]}>{leftContent}</div>
      </div>
      <div className={classes["con-right-box"]}>{rightContent}</div>
    </div>
  );
};

export default GoalLayout;
