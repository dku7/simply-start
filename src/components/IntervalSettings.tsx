import { useState } from "react";
import { IntervalType } from "../types/types";
import IntervalSetting from "./IntervalSetting";
import { ResetButton } from "./ResetButton";
import { resetAllIntervalSeconds } from "../utils/utils";

export default function IntervalSettings() {
  const intervalTypes: IntervalType[] = ["Focus", "Short Break", "Long Break"];
  const [reloadFlag, setReloadFlag] = useState<number>(0);

  const handleReset = () => {
    resetAllIntervalSeconds();
    setReloadFlag((current) => current + 1);
  };

  return (
    <>
      <header>
        <h3 className="mt-8 font-semibold">Intervals</h3>
      </header>
      <div className="mb-4 flex flex-wrap justify-center px-20 lg:flex-nowrap lg:justify-between lg:px-6">
        {intervalTypes.map((type) => (
          <IntervalSetting key={type} type={type} reloadFlag={reloadFlag} />
        ))}
      </div>
      <ResetButton
        buttonTitle="Reset defaults"
        iconOnly={false}
        handleClick={handleReset}
      />
    </>
  );
}
