"use client";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
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

export default function DateRangePickerComponent({id}: {id:string}) {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: "selection",
  });


  const [totalePrice, setTotalePrice] = useState(0)
  const [blockDates, setBlockDates] = useState<Date1[]>([])
  const user = useUser()

  const handleSelect = (ranges: any) => {
    if(!user.isSignedIn) redirect('/signin')
    setSelectionRange(ranges.selection);
  };


  const loadData = async () => {
    const casa = await cercaCasa(id);
    const diffDate =
      (selectionRange.endDate.valueOf() - selectionRange.startDate.valueOf()) /
      (1000 * 60 * 60 * 24);
    if (!casa || diffDate <= 0) return;

    setTotalePrice(casa.price * diffDate);
    setBlockDates(casa.prenotazioni);
  };


  function getDatesInRange(start: Date, end: Date): Date[] {
    const dates: Date[] = [];
    const current = new Date(start);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }

  const allDisabledDates = blockDates.flatMap(({ startDate, endDate }) =>
    getDatesInRange(new Date(startDate), new Date(endDate))
  );
    


  useEffect(()=> {
    loadData()
  }, [selectionRange,id ])

  


  async function handleClick(){
    if(!user.isSignedIn) redirect('/signin')
      let diffDate =( selectionRange.endDate.valueOf() - selectionRange.startDate.valueOf())/(1000 * 60 * 60 * 24)
      if(diffDate == 0) return <p>Selezione per due notti necessariemente</p>
      await prenotazione(id, selectionRange)
      loadData()
  }


  console.log('datarangepicker', blockDates)
  
  return (
    <div className="">
      <div className="w-full max-w-md mx-auto flex flex-col justify-center">

      <DateRange
        ranges={[selectionRange]}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        rangeColors={["#FD5B61"]}
        minDate={new Date()}
        disabledDates={allDisabledDates}

        
      />
      </div>
      <div className="flex justify-center items-center gap-10">

      <button className="bg-red-400 p-3 rounded-full text-white hover:bg-red-500 transition" onClick={handleClick} name="bottone">Prenota</button>
      <p className="">Prezzo: € {totalePrice}</p>
      </div>

    </div>
  );
}

