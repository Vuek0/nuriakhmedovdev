import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import { lenis } from "@/lib/scroll";

type Props = {
  images: string[];
  index: number;
  title: string;
  onIndex: (i: number) => void;
  onClose: () => void;
};

// Rendered into <body>: the page container keeps a transform, which would trap position: fixed
export default function Lightbox({ images, index, title, onIndex, onClose }: Props) {
  const go = (step: number) => onIndex((index + step + images.length) % images.length);

  useEffect(() => {
    lenis()?.stop();
    return () => lenis()?.start();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length, onIndex, onClose]);

  return createPortal(
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshots`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.65, 0, 0, 1] }}
    >
      <div className="lightbox-bar">
        <span>{title}</span>
        <button onClick={onClose} autoFocus>
          Close ✕
        </button>
      </div>
      <div className="lightbox-stage" onClick={onClose}>
        <Image src={images[index]} alt={`${title} — screenshot ${index + 1}`} fill sizes="100vw" />
      </div>
      <div className="lightbox-bar">
        <button onClick={() => go(-1)}>← Prev</button>
        <span>
          {index + 1} / {images.length}
        </span>
        <button onClick={() => go(1)}>Next →</button>
      </div>
    </motion.div>,
    document.body
  );
}
