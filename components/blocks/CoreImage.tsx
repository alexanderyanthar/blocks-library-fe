import Image from "next/image";
import type { BlockProps } from "@/types/blocks";

export default function CoreImage({ block }: BlockProps) {
  const { attributes } = block;
  const url = attributes?.url as string | undefined;
  const alt = (attributes?.alt as string) ?? "";
  const width = attributes?.width as number | undefined;
  const height = attributes?.height as number | undefined;

  if (!url) return null;

  if (width && height) {
    return (
      <Image
        src={url}
        alt={alt}
        width={width}
        height={height}
        className={(attributes?.className as string) ?? ""}
      />
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={alt} className={(attributes?.className as string) ?? ""} />;
}
