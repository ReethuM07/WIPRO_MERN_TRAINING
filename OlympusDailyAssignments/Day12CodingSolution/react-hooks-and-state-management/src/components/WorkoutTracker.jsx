import { useEffect, useState } from "react";
import useTimer from "../hooks/useTimer";

export default function WorkoutTracker() {
  const [sets, setSets] = useState(0);
  const [rest, setRest] = useState(30);
  const timer = useTimer();

  useEffect(() => {
    if (timer.seconds === rest && rest > 0) {
      timer.pause();
      alert("Rest complete!");
    }
  }, [timer.seconds, rest]);

  return (
    <div className="card p-4">
      <h3>Workout Tracker</h3>

      <p>Sets Completed: {sets}</p>
      <p>Timer: {timer.seconds}s</p>

      <button
        className="btn btn-success me-2"
        onClick={() => {
          setSets(s => s + 1);
          timer.reset();
          timer.start();
        }}
      >
        Complete Set
      </button>

      <button className="btn btn-warning me-2" onClick={timer.pause}>
        Pause
      </button>

      <button className="btn btn-danger" onClick={timer.reset}>
        Reset
      </button>

      <input
        type="number"
        className="form-control w-25 mt-3"
        value={rest}
        onChange={e => setRest(Number(e.target.value))}
      />
    </div>
  );
}
