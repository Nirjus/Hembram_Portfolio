import { formatDate } from "@/app/utils/date-formater";
import React, { useEffect, useState } from "react";

type Props = {
  required?: boolean;
  state: any;
  setState: (state: any) => void;
  label: string;
  labelSupportedText?: string;
};

const TimeLine = ({
  required = false,
  state,
  setState,
  label,
  labelSupportedText,
}: Props) => {
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  useEffect(() => {
    if (date.startDate || date.endDate) {
      const srtDate = date.startDate ? formatDate(date.startDate) : "";
      const enDate = date.endDate ? formatDate(date.endDate) : "";
      const formattedTimeLine = `${srtDate} - ${enDate}`;
        setState({
          ...state,
          [label]: formattedTimeLine,
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date.startDate, date.endDate]); // Watch for changes to both dates

  return (
    <div className=" space-y-3 md:mb-7 mb-6">
      <label htmlFor="timeLine" className=" font-mono pl-3 md:text-lg  ">
        • <span className=" capitalize">{label.split(/(?=[A-Z])/).join(' ')}</span>
        {required && <span className=" text-red-500">*</span>}{" "}   
          <span className="max-sm:text-[10px] text-[13px]">
            &nbsp; [{labelSupportedText}]
          </span>
      </label>
      <div className=" flex items-center md:gap-x-10 gap-x-5 justify-between">
        <div>
          <label htmlFor="startDate" className=" pl-3 text-[15px]">
            Starting date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            required
            placeholder="Add starting date"
            value={date.startDate}
            onChange={(e) => setDate({ ...date, startDate: e.target.value })}
            className=" outline-none p-4 max-sm:p-1 max-sm:text-xs rounded-md placeholder:text-gray-500 bg-slate-400/50 dark:bg-slate-400/30 dark:focus:bg-slate-400/10 focus:bg-slate-400/30 focus:border-2 border-black dark:border-white w-full"
          />
        </div>
        <div>
          <label htmlFor="endingDate" className=" pl-3 text-[15px]">
            Ending date
          </label>
          <input
            type="date"
            name="endingDate"
            id="endingDate"
            required
            placeholder="Add ending date"
            value={date.endDate}
            onChange={(e) => setDate({ ...date, endDate: e.target.value })}
            className=" outline-none p-4 max-sm:p-1 max-sm:text-xs rounded-md placeholder:text-gray-500 bg-slate-400/50 dark:bg-slate-400/30 dark:focus:bg-slate-400/10 focus:bg-slate-400/30 focus:border-2 border-black dark:border-white w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
