// components/CardImage.tsx
import Image from "next/image";

export default function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "2 / 3" }}>
      <Image
        src={src}          // 例: "/cards/03.svg"
        alt={alt}
        fill               // 親の aspect-ratio にフィット
        sizes="(max-width: 768px) 60vw, 300px"
        priority={false}
      />
    </div>
  );
}
