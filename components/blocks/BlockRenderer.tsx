import type { ComponentType } from "react";
import type { Block, BlockProps } from "@/types/blocks";
import CoreParagraph from "./CoreParagraph";
import CoreHeading from "./CoreHeading";
import CoreImage from "./CoreImage";
import CoreList from "./CoreList";
import BlocksLibraryAccordion from "./BlocksLibraryAccordion";
import FallbackBlock from "./FallbackBlock";

const blockMap: Record<string, ComponentType<BlockProps>> = {
  "core/paragraph": CoreParagraph,
  "core/heading": CoreHeading,
  "core/image": CoreImage,
  "core/list": CoreList,
  "blocks-library/accordion": BlocksLibraryAccordion,
};

interface BlockRendererProps {
  blocks: Block[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockMap[block.name] ?? FallbackBlock;
        return <Component key={i} block={block} />;
      })}
    </>
  );
}
