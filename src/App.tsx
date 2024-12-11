import Heading from "./components/Heading";
import Timer from "./components/Timer";

export default function App() {
  return (
    <div className="text-center">
      <Heading />
      <main className="mt-10">
        <Timer />
      </main>
    </div>
  );
}
