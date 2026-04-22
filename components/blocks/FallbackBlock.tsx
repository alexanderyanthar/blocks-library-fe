import type { BlockProps } from "@/types/blocks";

export default function FallbackBlock({ block }: BlockProps) {
  const html = (block.attributes?.innerHTML as string) ?? "";
  if (!html) return null;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
