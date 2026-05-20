import { useEffect, useState } from "react";

interface SourceFlipCounterProps {
  value: number | string;
  duration?: number;
}

export default function SourceFlipCounter({ value, duration = 600 }: SourceFlipCounterProps) {
  const [displayValue, setDisplayValue] = useState(value.toString());
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const newValue = value.toString();
    if (newValue !== displayValue) {
      setFlipping(true);
      const timer = setTimeout(() => {
        setDisplayValue(newValue);
        setFlipping(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [value, displayValue, duration]);

  return (
    <div className="inline-block font-mono font-bold">
      <style>{`
        @keyframes flip {
          0% {
            transform: rotateX(0deg);
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: rotateX(360deg);
            opacity: 1;
          }
        }

        .flip-animate {
          animation: flip 0.6s ease-in-out;
          transform-style: preserve-3d;
        }
      `}</style>
      <span className={flipping ? "flip-animate" : ""}>{displayValue}</span>
    </div>
  );
}
