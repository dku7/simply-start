import { IntervalType } from "../types/types";
import IntervalSetting from "./IntervalSetting";

export default function Settings() {
  const intervalTypes: IntervalType[] = ["Focus", "Short Break", "Long Break"];

  return (
    <>
      <header>
        <h2 className="font-semibold">Settings</h2>
      </header>
      <ul>
        {intervalTypes.map((type) => (
          <IntervalSetting key={type} type={type} />
        ))}
      </ul>
    </>
  );
}
