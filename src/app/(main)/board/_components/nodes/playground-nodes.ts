import type { Klass, LexicalNode } from "lexical";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ImageNode } from "./image-node";

const PlaygroundNodes: Array<Klass<LexicalNode>> = [
  TableNode,
  TableCellNode,
  TableRowNode,
  ImageNode,
];

export default PlaygroundNodes;
