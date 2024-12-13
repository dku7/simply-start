import IntervalSettings from "./IntervalSettings";

export default function Settings() {
  return (
    <div className="w-3/5 rounded-md border border-slate-800 px-8 pb-8 pt-2 md:w-1/2">
      <header>
        <h2 className="mt-2 text-lg font-bold">Settings</h2>
      </header>
      <IntervalSettings />
    </div>
  );
}
