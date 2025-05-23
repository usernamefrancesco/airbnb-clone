import React from "react";
import Image from "next/image";
import { cercaCasa } from "@/action/casa.action";
import { capitalizeParola } from "@/lib/utils";
import { Dot, Key, BedDouble, Calendar } from "lucide-react";
import TimeAgoLol from "@/components/TimeAgoLol";
import ReadMore from "@/components/ReadMore";
import GoogleMaps from "@/components/GoogleMaps";
import DateRangePickerComponent from "@/components/date/DateRangerPicker";



export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  
  const casa = await cercaCasa(id);

  const dataOggi = new Date()
  dataOggi.setDate(dataOggi.getDate() + 7)
  const opzioni: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };



  return (
    <div className="relative lg:pt-0">
      <div className=" flex justify-center items-center ">

      <Image
        src={casa?.image!}
        alt="immagine"
        height={400}
        width={400}
        className="w-full h- lg:w-[500px] lg:h-[500px] lg:rounded-2xl"
      />
      </div>
      <div className="rounded-4xl bg-white -mt-10 z-10 lg:pt-4 lg:mt-0 relative pt-10 px-3 justify-center flex">
        <div className="flex flex-col text-center">
          <h1 className="text-4xl font-semibold">
            {capitalizeParola(casa?.title as string)}
          </h1>
          <p className="text-[14px] text-gray-500">
            {capitalizeParola(casa?.location as string)}, Italy
          </p>
          <p className="text-[14px] text-gray-500 flex items-center justify-center">
            {casa?.roomCount == 1
              ? `${casa?.roomCount} stanza`
              : `${casa?.roomCount} stanze`}
            <Dot />
            {casa?.bathroomCount == 1
              ? `${casa?.bathroomCount} bagno`
              : `${casa?.bathroomCount} bagni`}
          </p>
        </div>
      </div>

      <div className="mx-5 border-[1px] border-r-0 border-l-0 mt-4 bg-white py-3">
        <h1 className="font-semibold">Nome dell'host: {casa?.caseHost.nome}</h1>
        <p className="flex text-sm text-gray-500 ">
          SuperHost <Dot /> Da:
          <span className="pl-1">
            <TimeAgoLol date={casa?.createdAt} /> come host
          </span>
        </p>
      </div>

      <div className="mx-5 border-[1px] border-r-0 border-t-0 border-l-0 mt-2 bg-white py-10 ">
        <ul className="flex flex-col gap-5">
          <li className="flex items-center">
            <Key size={50} className="lg:size-12" strokeWidth={1} />
            <div className="pl-3">
              <h3 className="font-semibold">
                Esperienza di check-in eccezionale
              </h3>
              <p className="text-sm">
                Gli ospiti che hanno soggiornato qui di recente hanno valutato
                la procedura di check-in con 5 stelle.
              </p>
            </div>
          </li>

          <li className="flex items-center">
            <BedDouble size={50} className="lg:size-12" strokeWidth={1} />
            <div className="pl-3">
              <h3 className="font-semibold">Stanza in alloggio in affitto</h3>
              <p className="text-sm">
                La tua stanza si trova in un alloggio e hai accesso agli spazi
                condivisi.
              </p>
            </div>
          </li>

          <li className="flex items-center">
            <Calendar size={50} className="lg:size-12" strokeWidth={1} />
            <div className="pl-3">
              <h3 className={`font-semibold `}>
                Cancellazione gratuita entro il giorno {dataOggi.toLocaleDateString('it-IT', opzioni)}
              </h3>
              <p className="text-sm">
                Se dovessi cambiare idea, riceverai un rimborso totale.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="flex flex-col p-4 px-5">
        <div>

        <h1 className="text-2xl font-semibold pb-8">
          A proposito di questo alloggio
        </h1>
        <p className="text-sm">
        Ciao siamo Monica e Alberto e siamo molto felici di ospitarti nella
        nostra casa a Roma! L'appartamento si trova al 3 piano di un palazzo dei
        primi del novecento situato in via Labicana angolo via Iside a due passi
        dal Tempio di Iside e dal Colosseo. La stanza a disposizione è molto
        luminosa grazie alle presenza di due ampie finestre. È dotata di un
        letto matrimoniale, tv, ventilatore a soffitto e il bagno privato
        interno alla camera. Lo spazio...

        </p>
        </div>
        <div className="">

        <ReadMore />
        </div>
      </div>

      <div className="border-[1px] border-r-0 border-l-0 mx-5 py-8">
        <h1 className="text-2xl font-semibold">
            Dove sarai
            <GoogleMaps citta={casa?.location}/>
        </h1>
      </div>
      <div className="p-4 px-5">
        <h1 className="text-2xl font-semibold">Prenota</h1>
        
        <DateRangePickerComponent id={id}/>

      </div>
    </div>
  );
}
