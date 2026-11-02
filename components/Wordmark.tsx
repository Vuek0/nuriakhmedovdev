import { useEffect, useRef, useState } from "react";

// One huge word spanning the full container width
export default function Wordmark({ text, className = "" }: { text: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const probe = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<number | null>(null);

  useEffect(() => {
    const fit = () => {
      if (!box.current || !probe.current) return;
      const w = probe.current.getBoundingClientRect().width; // width at 100px
      setSize((box.current.clientWidth / w) * 100);
    };
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit); // also fires once on observe
    if (box.current) ro.observe(box.current);
    return () => ro.disconnect();
  }, [text]);

  return (
    <div ref={box} className={`wordmark ${className}`}>
      <span ref={probe} className="wordmark-probe" aria-hidden>
        {text}
      </span>
      <span className="wordmark-text" style={{ fontSize: size ? `${size}px` : "15vw" }}>
        {text}
      </span>
    </div>
  );
}
