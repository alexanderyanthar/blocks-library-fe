import type { BlockProps, Block } from "@/types/blocks";

export default function CoreList({ block }: BlockProps) {
  const ordered = block.attributes?.ordered as boolean | undefined;
  const items = (block.innerBlocks ?? []).filter(Boolean) as Block[];
  const Tag = ordered ? "ol" : "ul";

  return (
    <Tag>
      {items.map((item, i) => {
        const content = (item.attributes?.content as string) ?? "";
        return <li key={i} dangerouslySetInnerHTML={{ __html: content }} />;
      })}
    </Tag>
  );
}
