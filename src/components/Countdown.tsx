import Time from "./Time";

interface CountdownProps {
  secondsLeft: number;
}

export default function Countdown({ secondsLeft }: CountdownProps) {
  return (
    <div className="text-8xl font-extrabold">
      <Time seconds={secondsLeft} />
    </div>
  );
}
