export interface TreeNode {
  id: string;
  label: string;
  children?: Array<TreeNode>;
  parent?: TreeNode;
  depth: number;
}
