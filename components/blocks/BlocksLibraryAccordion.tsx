"use client";

import { useState } from "react";
import type { BlockProps } from "@/types/blocks";
import BlockRenderer from "./BlockRenderer";

export default function BlocksLibraryAccordion({ block }: BlockProps) {
  const title = (block.attributes?.title as string) ?? "";
  const initiallyOpen = (block.attributes?.initiallyOpen as boolean) ?? false;
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  if (!title) return null;

  return (
    <div className="border border-gray-200 rounded-md">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-4 py-3 text-left font-medium hover:bg-gray-50 transition-colors"
      >
        <span>{title}</span>
        <span className="text-gray-400">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && block.innerBlocks && (
        <div className="px-4 py-3 border-t border-gray-200">
          <BlockRenderer blocks={block.innerBlocks} />
        </div>
      )}
    </div>
  );
}
