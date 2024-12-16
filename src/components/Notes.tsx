import { useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState<string>("");

  const handleChangeNotes = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = event.target.value;
    console.log(event.target.value);
    setNotes(newNotes);
  };

  return (
    <>
      <textarea
        name="notes"
        id="notes"
        className="h-96 w-full resize-none border border-slate-300 bg-slate-200 p-2 px-2 font-mono text-slate-600 focus:border-slate-400 focus:outline-none focus:ring-0"
        value={notes}
        onChange={handleChangeNotes}
      ></textarea>
    </>
  );
}
