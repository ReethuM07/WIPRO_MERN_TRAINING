import { useEffect, useRef, useState } from "react";

export default function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const ref = useRef(null);

  const start = () => {
    if (!ref.current) {
      ref.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
  };

  const pause = () => {
    clearInterval(ref.current);
    ref.current = null;
  };

  const reset = () => {
    pause();
    setSeconds(0);
  };

  useEffect(() => () => clearInterval(ref.current), []);

  return { seconds, start, pause, reset };
}
