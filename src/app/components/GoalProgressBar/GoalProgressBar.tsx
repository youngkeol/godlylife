import React, { useEffect, useState } from "react";
import classes from "./GoalProgressBar.module.css";

const GoalProgressBar = ({
  color,
  totalCnt,
  completedCnt,
}: {
  color: string;
  totalCnt: number;
  completedCnt: number;
}) => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (totalCnt == 0) {
      setProgressValue(100);
    } else {
      setProgressValue(Math.round((completedCnt / totalCnt) * 100));
    }
    //console.log(completedCnt / totalCnt);
  }, [totalCnt, completedCnt]);

  return (
    <div className={`${classes["progress-bar-box"]} ${classes[color]}`}>
      <div className={classes["progress-bar-outer"]}>
        <div
          className={`${classes["progress-bar-inner"]}`}
          style={{ width: `${progressValue}%` }}
        >
        </div>
      </div>
    </div>
  );
};

export default GoalProgressBar;
