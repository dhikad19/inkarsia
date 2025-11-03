import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const container = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onFinish,
    });

    tl.from(".loader-text span", {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
    });
    tl.to(container.current, {
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      ease: "power2.inOut",
    });
  }, [onFinish]);

  return (
    <div
      ref={container}
      className="loader fixed inset-0 bg-black flex items-center justify-center z-50"
    >
      <h1 className="loader-text text-white text-6xl font-bold tracking-widest">
        {"LOADING".split("").map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </h1>
    </div>
  );
}
