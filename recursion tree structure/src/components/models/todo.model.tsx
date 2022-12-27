export interface TodoModel {
  id: number;
  title: string;
  completed: boolean;
}

export interface TreeNode {
  id: string;
  label: string;
  expanded: boolean;
  children: Array<TreeNode>;
  layer: number;
}
