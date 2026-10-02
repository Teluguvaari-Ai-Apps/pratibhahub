import { cn } from "@/lib/utils";

export function Portrait({
  src,
  alt,
  className,
  priority = false,
  position = "top",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  position?: "top" | "center";
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn(
        "h-full w-full object-cover",
        position === "top" ? "object-top" : "object-center",
        className,
      )}
    />
  );
}
