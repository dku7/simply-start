import Heading from "./components/Heading";
import Settings from "./components/Settings";
import Timer from "./components/Timer";
import Intention from "./components/Intention";

export default function App() {
  return (
    <div className="p-4 text-center">
      <Heading />
      <div className="mt-10">
        <Timer />
      </div>
      <div className="mx-10 mb-8 mt-8 flex flex-col flex-wrap items-center rounded border border-slate-300 py-10 md:mx-40 lg:mx-52">
        <Intention />
      </div>
      <div className="mt-4 flex justify-center">
        <Settings />
      </div>
    </div>
  );
}
