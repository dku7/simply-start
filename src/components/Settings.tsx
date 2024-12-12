import IntervalSetting from "./IntervalSetting";

export default function Settings() {
  return (
    <>
      <header>
        <h2 className="font-semibold">Settings</h2>
      </header>
      <div>
        <IntervalSetting type={"Focus"} />
        <IntervalSetting type={"Short Break"} />
        <IntervalSetting type={"Long Break"} />
      </div>
    </>
  );
}
