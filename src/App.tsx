import Timer from "./components/Timer";
import Intention from "./components/Intention";
import ButtonBar from "./components/ButtonBar";

export default function App() {
  return (
    <div className="p-4 text-center">
      <Timer />
      <div className="mx-10 mb-8 mt-8 flex flex-col flex-wrap items-center rounded border border-slate-300 py-10 md:mx-40 lg:mx-52">
        <Intention />
      </div>
      <div className="mx-10 mb-8 mt-8 flex flex-wrap justify-start rounded border p-4 py-10 md:mx-40 lg:mx-52">
        <ButtonBar />
      </div>
    </div>
  );
}
