"use client";
import React, { useState } from "react";
import classes from "./GoalFilter.module.css";
import colors from "@/app/data/colors";
import { colorType } from "@/types/colors";
import { Filter } from "@/types/goals";

const GoalFilter = ({
  filter,
  filterChangeHandler,
}: {
  filter: Filter;
  filterChangeHandler: (filterData: Filter) => void;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterOpenHandler = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const filterStatusChange = (status: string) => {
    //console.log(status);
    filterChangeHandler({ ...filter, status: status });
  };


  const filterColorChange = (color: colorType) => {
    let newColors: colorType[];
  
    if (filter.colors?.includes(color)) {
      // 선택한 색상이 이미 존재하면 제거
      newColors = filter.colors.filter(item => item !== color);
    } else {
      // 선택한 색상이 없으면 추가
      newColors = [...(filter.colors ?? []), color];
    }
  
    filterChangeHandler({ ...filter, colors: newColors });
  };

  const filterReset = () => {
    filterChangeHandler({
    colors: [],
    status: '전체'
    })
  };

  const filterRemove  = (type:string, value:string) => {
    if(type=='color') {
      let newColors: colorType[] = [];
      if (filter.colors) {
        newColors = filter.colors.filter(item => item.color !== value);
      }
      filterChangeHandler({ ...filter, colors: newColors });
    }else if (type=='status') {
      filterChangeHandler({ ...filter, status: '전체' });
    }
  }

  return (
    <div
      className={`${classes["goal-filter-box"]} ${
        isFilterOpen && classes["active"]
      }`}
    >
      <h3
        className={classes["goal-filter-tit"]}
        onClick={() => filterOpenHandler()}
      >
    
        <span 
          className={classes["goal-filter-status-tag"]}
        >
          {filter.status =="전체" ? '전체상태' : filter.status}
        </span>


        {filter.colors && filter.colors.length > 0 && (
          <span className={classes["goal-filter-color-tag"]}>
            {filter.colors
              .filter(item => item.colorKr) // colorKr이 존재하는 항목만 필터링
              .map(item => item.colorKr.charAt(0)) // 각 colorKr의 첫 글자 추출
              .join('/')}
          </span>
        )}
        {
           filter.colors == undefined ||
           filter.colors.length == 0 && (
            <span className={classes["goal-filter-color-tag"]}>전체 색상</span>
           )
        }
        <span>
          <i className={`${classes["filter-arr"]} xi-angle-down-min`}></i>
        </span>
      </h3>
      <div className={classes["goal-filter-con"]}>
        <div className={classes["filter-con-each"]}>
          <h4>
            진행 상태<span></span>
          </h4>
          <ul>
            {["전체", "완료", "진행중"].map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => filterStatusChange(item)}
                  className={`${
                    filter.status === item ? classes["status-active"] : ""
                  }`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={classes["filter-con-each"]}>
          <h4>
            색상 선택<span>(다중 선택)</span>
          </h4>
          <ul>
            {colors.map((item: colorType) => {
              return (
                <li
                  key={item.color}
                  onClick={() => filterColorChange(item)}
                  className={`${
                    filter.colors?.includes(item)
                      ? classes["color-active"]
                      : ""
                  }`}
                >
                  {item.colorKr}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={classes["filter-list-box"]}>
          <ul>
            {filter.status == "전체" ? (
              <li
              className={classes["filter-list-all"]}>
              
                전체 상태
              </li>
            ) : (
              <li>
                {filter.status}
                <span
                    onClick={()=>{
                      filterRemove('status', filter.status);
                    }}
                >
                  <i className="xi-close-min"></i>
                </span>
              </li>
            )}

            {filter.colors?.length ==0 && <li
               className={classes["filter-list-all"]}
            >전체 색상</li>}

            {filter.colors?.map((item: colorType) => {
              return (
                <li 
                  key={item.color}
                >
                   {item.colorKr}
                  <span
                    onClick={()=>{
                      filterRemove('color', item.color);
                    }}
                  >
                    <i className="xi-close-min"></i>
                  </span>
                </li>
              );
            })}

            <li 
              onClick={()=> filterReset()}
            >
              필터 초기화{" "}
              <span>
                <i className="xi-refresh"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GoalFilter;
