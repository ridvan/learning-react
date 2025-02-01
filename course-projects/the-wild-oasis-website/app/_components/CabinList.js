import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

async function CabinList({ filter }) {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  const filterFunctions = {
    all: () => cabins,
    small: () => cabins.filter((cabin) => cabin.maxCapacity <= 3),
    medium: () =>
      cabins.filter(
        (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
      ),
    large: () => cabins.filter((cabin) => cabin.maxCapacity >= 8),
  };

  const displayedCabins = filterFunctions[filter]();

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
