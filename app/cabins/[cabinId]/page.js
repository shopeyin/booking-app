import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";

import { getCabin, getCabins } from "@/app/_lib/data-service";



import { Suspense } from "react";

export async function generateMetadata({ params: { cabinId } }) {
  const cabin = await getCabin(cabinId);

  const { name } = cabin;

  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  let cabins = await getCabins();

  let ids = cabins.map((cabin) => {
    return { cabinId: String(cabin.id) };
  });

  return ids;
}

export default async function Page({ params: { cabinId } }) {
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
