import type { BlockProps } from "@/types/blocks";

export default function CoreParagraph({ block }: BlockProps) {
  const content = (block.attributes?.content as string) ?? "";
  if (!content) return null;
  return <p dangerouslySetInnerHTML={{ __html: content }} />;
}
