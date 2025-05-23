import Image from "next/image";
import NavbarHome from "@/components/navbar/NavbarHome";
import { Casa } from "@prisma/client";
import CardCasa from "@/components/CardCasa";
import { allHouses, querySearch } from "@/action/casa.action";
import CasaNonTrovata from "@/components/CasaNonTrovata";

// app/page.tsx
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await the searchParams promise
  const params = await searchParams;
  
  // parsing dei dati
  const nation = params.nation as string || "";
  const rooms = Number(params.rooms || 0);
  const bathrooms = Number(params.bathrooms || 0);
  const startDate = params.startDate as string;
  const endDate = params.endDate as string;

  const queryHouse = await querySearch(nation, rooms, bathrooms, startDate, endDate);
  const allHouse = await allHouses();
  if (!allHouse) return null;

  return (
    <>
      <NavbarHome />
      {!nation ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 w-full p-4">
          {allHouse.map((x: Casa) => (
            <CardCasa key={x.id} casa={x} />
          ))}
        </div>
      ) : queryHouse?.length === 0 ? (
        <CasaNonTrovata />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 w-full p-4">
          {queryHouse!.map((x: Casa) => (
            <CardCasa key={x.id} casa={x} />
          ))}
        </div>
      )}
    </>
  );
}