import { useCallback, useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import { getIntention, removeIntention, saveIntention } from "../utils/utils";

export default function Intention() {
  const [intention, setIntention] = useState<string>("");

  useEffect(() => {
    setIntention(getIntention());
  }, []);

  const handleSetIntention = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newIntention = event.target.value;

      setIntention(newIntention);
      saveIntention(newIntention);
    },
    [],
  );

  const clearIntention = useCallback(() => {
    setIntention("");
    removeIntention();
  }, []);

  return (
    <>
      <label className="mb-2 font-semibold text-slate-600" htmlFor="intention">
        Intention
      </label>
      <div className="flex w-full items-end justify-center">
        <input
          type="text"
          name="intention"
          id="intention"
          autoComplete="off"
          className="w-3/4 border-b border-t-0 border-b-slate-300 bg-slate-200 p-2 px-2 text-center text-lg text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-0 md:text-xl"
          value={intention}
          onChange={handleSetIntention}
        />
        <button
          aria-label="clear intention"
          title="clear intention"
          className="text-slate-500"
          hidden={!intention}
          onClick={clearIntention}
        >
          <MdClear />
        </button>
      </div>
    </>
  );
}
