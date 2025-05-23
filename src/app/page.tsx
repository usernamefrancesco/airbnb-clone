import Image from "next/image";
import NavbarHome from "@/components/navbar/NavbarHome";
import { Casa } from "@prisma/client";
import CardCasa from "@/components/CardCasa";
import { allHouses, querySearch } from "@/action/casa.action";
import CasaNonTrovata from "@/components/CasaNonTrovata";
export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { nation, guests, rooms, bathrooms, startDate, endDate } = searchParams;

  const queryHouse = await querySearch(
    nation,
    Number(rooms),
    Number(bathrooms),
    startDate,
    endDate

  );
  const allHouse = await allHouses();
  if (!allHouse) return;

  console.log("homepage", nation);
  return (
    <>
      <>
        <NavbarHome />

        {!nation ? (
          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mx-full p-4">
            {allHouse.map((x: Casa) => (
              <CardCasa key={x.id} casa={x} />
            ))}
          </div>
        ) : queryHouse?.length === 0 ? (
          <CasaNonTrovata />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mx-full p-4">
            {queryHouse!.map((x: Casa) => (
              <CardCasa key={x.id} casa={x} />
            ))}
          </div>
        )}
      </>
    </>
  );
}
