import { IntervalType } from "../types/types";
import IntervalSetting from "./IntervalSetting";

export default function Settings() {
  const intervalTypes: IntervalType[] = ["Focus", "Short Break", "Long Break"];

  return (
    <div className="w-3/5 rounded-md border border-slate-800 px-8 pb-8 pt-2 md:w-1/2">
      <header>
        <h2 className="mt-2 text-lg font-bold">Settings</h2>
      </header>
      <h3 className="mt-8 font-semibold">Intervals</h3>
      <div className="flex flex-wrap justify-center px-20 lg:flex-nowrap lg:justify-between lg:px-6">
        {intervalTypes.map((type) => (
          <div key={type} className="">
            <IntervalSetting type={type} />
          </div>
        ))}
      </div>
    </div>
  );
}
