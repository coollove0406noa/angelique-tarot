// components/CardImage.tsx
import Image from "next/image";

export default function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "2 / 3" }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 60vw, 300px"
      />
    </div>
  );
}
