"use client";
import CustomChart from "@/components/charts/CustomChart";
import { delhiAccidentData } from "@/datas/delhiAccidentData";
import dynamic from "next/dynamic";

const CustomMap = dynamic(() => import("@/components/misc/CustomMap"), {
  ssr: false,
});

type Props = {};

export default function Page({}: Props) {
  const totalAccidents = delhiAccidentData.reduce(
    (sum, item) => sum + item.accidents,
    0
  );

  return (
    <section className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">City</p>
          <h3 className="pt-2 text-2xl font-bold">Delhi</h3>
        </div>
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Fatal Accidents Tracked</p>
          <h3 className="pt-2 text-2xl font-bold">{totalAccidents}</h3>
        </div>
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Major Black Spots</p>
          <h3 className="pt-2 text-2xl font-bold">{delhiAccidentData.length}</h3>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="text-xl sm:text-2xl pb-2 font-bold underline">
          Major Accident-Prone Areas In Delhi
        </h2>
        <p className="pb-4 text-sm text-slate-500">
          Ranked view of major reported Delhi black spots by fatal accident
          count.
        </p>
        <CustomChart datas={delhiAccidentData} />
      </div>

      <div className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold underline">
          Delhi Accident Locations
        </h2>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <CustomMap points={delhiAccidentData} />
        </div>
      </div>
    </section>
  );
}
