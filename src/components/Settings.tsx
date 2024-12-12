import { IntervalType } from "../types/types";
import IntervalSetting from "./IntervalSetting";

export default function Settings() {
  const intervalTypes: IntervalType[] = ["Focus", "Short Break", "Long Break"];

  return (
    <div className="w-1/2 rounded-md border border-slate-800">
      <header>
        <h2 className="mt-2 text-lg font-bold">Settings</h2>
      </header>
      <ul>
        {intervalTypes.map((type) => (
          <IntervalSetting key={type} type={type} />
        ))}
      </ul>
    </div>
  );
}
