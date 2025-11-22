import { useState, useRef, useEffect } from "react";

export default function SessionTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const startTimer = () => {
    if (isRunning) return;

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= 1800) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        {formatTime(seconds)}
      </h1>

      <button onClick={startTimer} style={{ marginRight: "10px" }}>
        Start
      </button>

      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
