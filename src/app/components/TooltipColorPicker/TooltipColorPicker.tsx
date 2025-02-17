"use client";
import React, { useState } from "react";
import classes from "./TooltipColorPicker.module.css";
import colors from "@/app/data/colors";
import { colorType } from "@/types/colors";

function TooltipColorPicker({
  selectedColor,
  handleColorPicker,
}: {
  selectedColor: colorType;
  handleColorPicker: (color: colorType) => void;
}) {
  //const [selectedColor, setSelectedColor] = useState(colors[0]); // 선택된 색상 상태
  const [isTooltipOpen, setIsTooltipOpen] = useState(false); // 툴팁 상태

  const toggleTooltip = () => {
    setIsTooltipOpen((prev) => !prev); // 툴팁 열고 닫기
  };

  const handleColorSelect = (color: colorType) => {
    handleColorPicker(color); // 색상 선택
    setIsTooltipOpen(false); // 툴팁 닫기
  };

  return (
    <div className={classes["tooltip-color-picker-box"]}>
      <button
        className={`${classes["sel-color-btn"]} ${
          classes[`sel-color-${selectedColor.color}`]
        }`}
        onClick={toggleTooltip}
      ></button>

      {/* 툴팁 */}
      {isTooltipOpen && (
        <div className={classes["tooltip-box"]} style={{}}>
          <span className={classes["tooltip-triangle"]}></span>
          {colors.map((color) => (
            <div
              key={color.color}
              onClick={() => handleColorSelect(color)}
              style={{
                backgroundColor: color.rgb,
                width: "20px",
                height: "20px",
                borderRadius: "7px",
                cursor: "pointer",
                border:
                  selectedColor === color
                    ? `2px solid ${color.bgRgb}`
                    : "3px solid #f4f4f4",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TooltipColorPicker;
