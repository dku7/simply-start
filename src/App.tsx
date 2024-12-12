import Heading from "./components/Heading";
import Settings from "./components/Settings";
import Timer from "./components/Timer";

export default function App() {
  return (
    <div className="text-center">
      <Heading />
      <div className="mt-10">
        <Timer />
      </div>
      <div className="mt-4">
        <Settings />
      </div>
    </div>
  );
}
