import { useState } from "react";
import Image from "next/image";

type Props = {
  src?: string;
  label?: string;
  ratio?: string;
  className?: string;
  plate?: boolean;
  sizes?: string;
  preload?: boolean;
};

/**
 * Image in a fixed-ratio frame.
 * `plate` shows the whole image on a warm backdrop instead of cropping it — for UI screenshots.
 * If the file is missing, a hatched placeholder shows the path it should live at.
 */
export default function Media({
  src,
  label = "Image",
  ratio = "16 / 9",
  className = "",
  plate = false,
  sizes = "100vw",
  preload = false,
}: Props) {
  const [ok, setOk] = useState(true);

  return (
    <div className={`media ${plate ? "media--plate" : ""} ${className}`} style={{ aspectRatio: ratio }}>
      {ok && src ? (
        <div className="media-inner">
          <Image src={src} alt={label} fill sizes={sizes} preload={preload} onError={() => setOk(false)} />
        </div>
      ) : (
        <div className="media-ph">
          <span>{label}</span>
          {src && <code>public{src}</code>}
        </div>
      )}
    </div>
  );
}
