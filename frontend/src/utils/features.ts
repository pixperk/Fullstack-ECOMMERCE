import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import moment from 'moment'
import toast from "react-hot-toast";

type ResType =
  | {
      data: MessageResponse;
      error?: undefined;
    }
  | {
      data?: undefined;
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: ResType,
  navigate: NavigateFunction | null,
  url: string
) => {
  if ("data" in res) {
    toast.success(res.data?.message!);
    if (navigate) navigate(url);
  } else {
    const error = res.error as FetchBaseQueryError;
    const messageResponse = error.data as MessageResponse;
    toast.error(messageResponse.message);
  }
};

export const getLastMonths = () => {
  const currentDate = moment();

  currentDate.date(1);

  const last6Months:string[] = []
  const last12Months:string[] = []

  for (let i = 0; i < 6; i++) {
    const monthDate =currentDate.clone().subtract(i,'months');
    const monthName = monthDate.format('MMMM')

    last6Months.unshift(monthName)
  }
  for (let i = 0; i < 12; i++) {
    const monthDate =currentDate.clone().subtract(i,'months');
    const monthName = monthDate.format('MMMM')

    last12Months.unshift(monthName)
  }

  return {last6Months,last12Months}
}
