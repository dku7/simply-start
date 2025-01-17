import { useEffect, useState } from "react";
import DurationSettingButton from "./DurationSettingButton";
import Time from "./Time";
import { SegmentType } from "../types/types";
import { getSegmentDuration, saveSegmentDuration } from "../services/api";
import { defaultIntervalChange } from "../constants/constants";

interface DurationSettingProps {
  type: SegmentType;
  reloadFlag: number;
}

export default function DurationSetting({
  type,
  reloadFlag,
}: DurationSettingProps) {
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    setDuration(getSegmentDuration(type));
  }, [type, reloadFlag]);

  const handleIncreaseDuration = () => {
    const newDuration = duration + defaultIntervalChange;

    setDuration(newDuration);
    saveSegmentDuration(type, newDuration);
  };

  const handleReduceDuration = () => {
    const newDuration =
      duration <= defaultIntervalChange
        ? defaultIntervalChange
        : duration - defaultIntervalChange;

    setDuration((current) =>
      current <= defaultIntervalChange ? current : newDuration,
    );
    saveSegmentDuration(type, newDuration);
  };

  return (
    <div className="my-2">
      <p className="font-semibold">{type}</p>
      <div className="flex items-center justify-center">
        <div className="mr-4 flex items-center md:mr-10">
          <span>
            <Time duration={duration} />
          </span>

          <DurationSettingButton
            type={"Add"}
            handleClick={handleIncreaseDuration}
          />
          <DurationSettingButton
            type={"Minus"}
            handleClick={handleReduceDuration}
          />
        </div>
      </div>
    </div>
  );
}
