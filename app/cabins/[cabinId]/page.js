import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import {getCabin, getCabins} from "@/app/_lib/data-service";

import {Suspense} from "react";

export const generateMetadata = async ({ params }) => {
  const { name } = await getCabin(params.cabinId);
  return {
    title: `Cabin ${name}`,
  };
};

export const revalidate = 10;
export const generateStaticParams = async () => {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
};

export default async function Page({ params }) {
  const { cabinId } = params;

  const cabinData = await getCabin(cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(cabinId);

  // if (!cabinData) {
  //   return (
  //     <div className="mx-auto text-center flex flex-col gap-5 items-center justify-center">
  //       <h1 className="text-3xl">This Cabin Id doesn't exist, check again!</h1>
  //       <Link className="bg-red-500 rounded-md" href="/cabins">
  //         Go Back
  //       </Link>
  //     </div>
  //   );
  //   // notFound();
  // }

  console.log("cabinData==>", cabinData);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabinData={cabinData} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabinData.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabinData={cabinData} />
        </Suspense>
      </div>
    </div>
  );
}
