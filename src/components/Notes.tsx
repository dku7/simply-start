import { useCallback, useState } from "react";
import { getNotes, saveNotes } from "../services/api";

export default function Notes() {
  const [notes, setNotes] = useState<string>(getNotes());

  const handleChangeNotes = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newNotes = event.target.value;

      setNotes(newNotes);
      saveNotes(newNotes);
    },
    [],
  );

  return (
    <>
      <textarea
        name="notes"
        id="notes"
        className="h-96 w-full resize-none rounded border border-slate-300 bg-slate-200 p-2 px-2 font-mono text-slate-600 focus:border-slate-400 focus:outline-none focus:ring-0"
        value={notes}
        onChange={handleChangeNotes}
      ></textarea>
    </>
  );
}
