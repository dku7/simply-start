import { useState } from "react";
import { SegmentType } from "../types/types";
import DurationSetting from "./DurationSetting";
import { ResetButton } from "./ResetButton";
import { resetAllSegmentDurations } from "../services/api";

export default function DurationSettings() {
  const segmentTypes: SegmentType[] = ["Focus", "Short Break", "Long Break"];
  const [reloadFlag, setReloadFlag] = useState<number>(0);

  const handleReset = () => {
    resetAllSegmentDurations();
    setReloadFlag((current) => current + 1);
  };

  return (
    <>
      <header>
        <h3 className="mt-8 font-semibold">Durations</h3>
      </header>
      <div className="mb-4 flex flex-wrap justify-center px-20 lg:flex-nowrap lg:justify-between lg:px-6">
        {segmentTypes.map((type) => (
          <DurationSetting key={type} type={type} reloadFlag={reloadFlag} />
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
