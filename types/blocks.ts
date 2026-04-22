export interface BlockAttribute {
  [key: string]: string | number | boolean | null | undefined;
}

export interface Block {
  __typename: string;
  name: string;
  attributes?: BlockAttribute;
  innerBlocks?: Block[];
}

export interface BlockProps {
  block: Block;
}
