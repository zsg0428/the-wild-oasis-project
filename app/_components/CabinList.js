import React from "react";
import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

export default async function CabinList({ filter }) {
  // noStore();

  // CHANGE
  const cabins = await getCabins();
  if (!cabins.length) {
    return null;
  }
  let displayCabins;
  if (filter === "all") {
    displayCabins = cabins;
  }
  if (filter === "small") {
    displayCabins = cabins.filter((item) => item.maxCapacity <= 3);
  }
  if (filter === "medium") {
    displayCabins = cabins.filter(
      (item) => item.maxCapacity > 3 && item.maxCapacity <= 7
    );
  }
  if (filter === "large") {
    displayCabins = cabins.filter((item) => item.maxCapacity > 7);
  }
  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {displayCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    </div>
  );
}
