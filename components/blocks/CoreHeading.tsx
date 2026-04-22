import React from "react";
import type { BlockProps } from "@/types/blocks";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export default function CoreHeading({ block }: BlockProps) {
  const content = (block.attributes?.content as string) ?? "";
  const level = (block.attributes?.level as number) ?? 2;
  const tag: HeadingTag = `h${Math.min(Math.max(level, 1), 6)}` as HeadingTag;
  if (!content) return null;
  return React.createElement(tag, { dangerouslySetInnerHTML: { __html: content } });
}
