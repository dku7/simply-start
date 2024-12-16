import DurationSettings from "./DurationSettings";
import SoundSettings from "./SoundSettings";

export default function Settings() {
  return (
    <>
      <header>
        <h2 className="mt-2 text-lg font-bold">Settings</h2>
      </header>
      <div>
        <DurationSettings />
      </div>
      <div>
        <SoundSettings />
      </div>
    </>
  );
}
