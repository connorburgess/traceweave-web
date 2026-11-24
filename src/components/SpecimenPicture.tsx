export interface SpecimenPictureProps {
  base: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

export function SpecimenPicture({
  base,
  alt,
  sizes,
  priority = false,
  className,
}: SpecimenPictureProps) {
  return (
    <picture className={className}>
      <source
        type="image/webp"
        srcSet={`/imagery/${base}-800.webp 800w, /imagery/${base}-1600.webp 1600w`}
        sizes={sizes}
      />
      <img
        src={`/imagery/${base}-800.jpg`}
        srcSet={`/imagery/${base}-800.jpg 800w, /imagery/${base}-1600.jpg 1600w`}
        sizes={sizes}
        alt={alt}
        width={800}
        height={446}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </picture>
  );
}
