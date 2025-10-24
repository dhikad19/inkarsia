// components/Timer.tsx
import React, { useEffect, useState } from "react";

export default function Timer({
  running,
  startTs,
  endTs,
}: {
  running: boolean;
  startTs: number | null;
  endTs: number | null;
}) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [running]);

  if (!startTs) return <div className="text-sm">00:00</div>;

  const end = endTs ?? now;
  const diff = Math.max(0, Math.floor((end - startTs) / 1000));
  const min = Math.floor(diff / 60)
    .toString()
    .padStart(2, "0");
  const sec = (diff % 60).toString().padStart(2, "0");

  return (
    <div className="text-sm font-mono">
      Time: {min}:{sec}
    </div>
  );
}
