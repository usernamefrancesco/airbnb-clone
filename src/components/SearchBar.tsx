"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";
import GoogleMapComponent from "./GoogleMaps";
import DateSearch from "./date/DateSearch";
import addDays from "date-fns/addDays";

type CountryOption = {
  label: string;
  value: string;
};

export default function SearchBar() {
  const query = useSearchParams();
  const querySearch = query.get("query");
  const [nazione, setNazione] = useState<CountryOption>({
    value: "BE",
    label: "Belgium",
  });
  const options = useMemo<CountryOption[]>(() => countryList().getData(), []);

  const [showSearc, setShowSearch] = useState(false);
  const [next, setNext] = useState(false);
  const [countRoom, setCountRoom] = useState(false);

  // Count guest
  const [guest, setGuest] = useState(1);
  // count stanze
  const [stanze, setStanze] = useState(1);
  // count bagni
  const [bagni, setBagni] = useState(1);

  const [impostaQuery, setQuery] = useState({
    nation: "",
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    numeroStanze: 1,
    numeroBagni: 1,
  });

  const changeHandler = (value: any) => {
    setNazione(value);
  };

  function handleNext() {
    setShowSearch(false);
    setNext(true);
    setQuery({
      ...impostaQuery,
      nation: nazione.label,
    });
  }

  function handleDate(startDate: Date, endDate: Date) {
    setQuery({
      ...impostaQuery,
      startDate: startDate,
      endDate: endDate,
    });
  }

  function handleSearch() {
    setQuery({
      ...impostaQuery,
      numeroBagni: bagni,
      numeroStanze: stanze,
    });
    const params = new URLSearchParams();
    params.set("nation", nazione.label);
    params.set("rooms", stanze.toString());
    params.set("bathrooms", bagni.toString());
    params.set('startDate', impostaQuery.startDate.toISOString())
    params.set('endDate', impostaQuery.endDate.toISOString())


    window.location.href = `/?${params.toString()}`;
  }

  return (
    <>
      <button onClick={() => setShowSearch(true)} className="flex w-full">
        <div className="flex justify-between items-center border-[1px] p-3 rounded-full w-full hover:shadow-sm transition">
          <div className="">
            <p className="text-gray-500">cerca casa...</p>
          </div>
          <div className="lg:hidden hidden sm:block border-l-8"></div>
          <div className="lg:border-2 lg:border-t-0 lg:border-b-0 lg:px-30 pr-25 hidden sm:block">
            <p>Giorni</p>
          </div>
          <div className="pr-15 hidden lg:block">
            <p>Guest 1</p>
          </div>
        </div>
      </button>
      {showSearc && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-[500px] h-[650px]">
            <div className="flex items-center border-b-[1px] pb-5">
              <button
                className="absolute  right-2 text-gray-500"
                onClick={() => setShowSearch(false)}
              >
                x
              </button>
              <h1 className="font-semibold">Filtri</h1>
            </div>
            <div className="pt-5">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Dove vuoi andare?</h1>
                <input type="hidden" name="nation" value={nazione.label} />
                <Select
                  options={options}
                  value={nazione}
                  onChange={changeHandler}
                  className=""
                ></Select>
                <div>
                  <GoogleMapComponent citta={nazione.label} />
                </div>
                <button
                  className="bg-red-400 text-white rounded-2xl py-2 w-full mt-2"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {next && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-[500px] ">
            <div>
              <div className="flex items-center border-b-[1px] pb-5">
                <button
                  className="absolute  right-2 text-gray-500"
                  onClick={() => setNext(false)}
                >
                  x
                </button>
                <h1 className="font-semibold">Filtri</h1>
              </div>
              <div>
                <DateSearch handleDate={handleDate} />
              </div>
              <div className=" flex    flex-row    items-center    gap-4    w-full  ">
                <button
                  onClick={() => {
                    setNext(false);
                    setShowSearch(true);
                  }}
                  className="relative w-full border-2 border-black rounded-2xl p-2"
                >
                  Back
                </button>

                <button
                  onClick={() => {
                    setNext(false);
                    setCountRoom(true);
                  }}
                  className="text-white relative w-full bg-red-400 rounded-2xl p-2"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {countRoom && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-[500px] ">
            <div className="flex items-center border-b-[1px] pb-5">
              <button
                className="absolute  right-2 text-gray-500"
                onClick={() => setCountRoom(false)}
              >
                x
              </button>
              <h1 className="font-semibold">Filtri</h1>
            </div>

            <div className="pt-4">
              <div>
                <h1 className="font-semibold">Più informazioni</h1>
                <p className="text-gray-500 text-sm pt-1">
                  Find your perfect place!
                </p>
              </div>

              {/* Singoli guest, room, bathroom */}
              {/* guest */}
              <div className="text-sm pt-5 flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="">Guest</h1>
                  <p className="text-gray-600">How many guests are coming?</p>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <button
                    className=" w-10   h-10   rounded-full   border-[1px]   border-neutral-400   flex   items-center   justify-center   text-neutral-600   cursor-pointer   hover:opacity-80   transition "
                    onClick={() => setGuest(guest + 1)}
                  >
                    +
                  </button>

                  <p className="w-5 text-center">{guest}</p>

                  <button
                    className=" w-10   h-10   rounded-full   border-[1px]   border-neutral-400   flex   items-center   justify-center   text-neutral-600   cursor-pointer   hover:opacity-80   transition "
                    onClick={() => {
                      setGuest(prev => Math.max(1, prev - 1))}}
                  >
                    -
                  </button>
                </div>
              </div>

              {/* room */}
              <div className="text-sm pt-5 flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="">Stanze</h1>
                  <p className="text-gray-600">How many rooms do you need?</p>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <button
                    className=" w-10   h-10   rounded-full   border-[1px]   border-neutral-400   flex   items-center   justify-center   text-neutral-600   cursor-pointer   hover:opacity-80   transition "
                    onClick={() => setStanze(stanze + 1)}
                  >
                    +
                  </button>

                  <p className="w-5 text-center">{stanze}</p>

                  <button
                    className=" w-10   h-10   rounded-full   border-[1px]   border-neutral-400   flex   items-center   justify-center   text-neutral-600   cursor-pointer   hover:opacity-80   transition "
                    onClick={() => {
                      setStanze(prev => Math.max(1, prev - 1))}}
                  >
                    -
                  </button>
                </div>
              </div>

              {/* Batrhoom */}
              <div className="text-sm pt-5 flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="">Bagni</h1>
                  <p className="text-gray-600">
                    How many bahtrooms do you need?
                  </p>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <button
                    className=" w-10   h-10   rounded-full   border-[1px]   border-neutral-400   flex   items-center   justify-center   text-neutral-600   cursor-pointer   hover:opacity-80   transition "
                    onClick={() => setBagni(bagni + 1)}
                  >
                    +
                  </button>

                  <p className="w-5 text-center">{bagni}</p>

                  <button
                    className=" w-10   h-10   rounded-full   border-[1px]   border-neutral-400   flex   items-center   justify-center   text-neutral-600   cursor-pointer   hover:opacity-80   transition "
                    onClick={() => {
                      setBagni(prev => Math.max(1, prev - 1))}}
                  >
                    -
                  </button>
                </div>
              </div>

              <div className=" flex    flex-row    items-center    gap-4    w-full pt-5 ">
                <button
                  onClick={() => {
                    setCountRoom(false);
                    setNext(true);
                  }}
                  className="relative w-full border-2 border-black rounded-2xl p-2"
                >
                  Back
                </button>

                <button
                  onClick={handleSearch}
                  className="text-white relative w-full bg-red-400 rounded-2xl p-2"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
