"use client";
import { useEffect, useState } from "react";
import { DateRange, DateRangeProps } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // Stili base
import "react-date-range/dist/theme/default.css"; // Tema default
import { cercaCasa, prenotazione } from "@/action/casa.action";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


interface Date1{
  startDate: Date;
    endDate: Date;
}

interface DateSearchProps {
    handleDate: (startDate: Date, endDate: Date) => void;
}

export default function DateSearch({handleDate}: DateSearchProps) {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: "selection",
  });




  const handleSelect = (ranges: any) => {
    setSelectionRange(ranges.selection);
    handleDate(ranges.selection.startDate, ranges.selection.endDate);

  };








  
  return (
    <div className="">

      <DateRange
        ranges={[selectionRange]}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        rangeColors={["#FD5B61"]}
        minDate={new Date()}
      />
   
    </div>
  );
}

