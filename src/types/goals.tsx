import { colorType } from "./colors";

export interface GoalDetail {
  idx:number,
  content: string,
  completed: number;
  sort: number;
}
export interface Goal {
  idx:number,
  title: string,
  goalDetails : GoalDetail[],
  completed: number;
  color:string;
}

export interface GoalState {
  selIdx: number | null;
  modalFlag: number;
  goalList : Goal[] | null;
  loading: boolean;
  error: {errorCode:string, errorMessage:string} | string | null;
}

export interface Filter {
  status: string;
  colors: colorType[] | null;
}
