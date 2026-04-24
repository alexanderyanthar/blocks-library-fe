export interface BlockAttribute {
  [key: string]: string | number | boolean | null | undefined;
}

export interface Block {
  __typename: string;
  name: string;
  parentClientId?: string | null;
  attributes?: BlockAttribute;
  innerBlocks?: Block[];
}

export interface BlockProps {
  block: Block;
}
