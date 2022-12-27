import React, { useState, useEffect } from "react";
import { TreeNode } from "./models/todo.model";
import "./Node.css";

interface Props {
  tree: TreeNode;
}

const Node: React.FC<Props> = ({ tree }) => {
  const [treeNode, setTreeNode] = useState<TreeNode>(tree);
  const [collapsed, setCollapsed] = useState<boolean>(true);

  useEffect(() => {}, [tree.children]);

  const toggle = () => {
    console.log("clicked", collapsed);
    setCollapsed(!collapsed);
  };

  const getUUID = (): string => {
    return window.crypto.randomUUID();
  };

  const addChild = () => {
    console.log("test");
    const newNode: TreeNode = {
      id: getUUID(),
      label: "New Tree Structure12",
      expanded: false,
      layer: tree.layer + 1,
      children: [],
    };

    const updateNode = [...tree.children, newNode];

    setTreeNode((prevNode) => ({ ...prevNode, children: updateNode }));
  };
  const removeChild = () => {};
  const renameFoldier = () => {};

  return (
    <div style={{ marginLeft: `${(tree.layer * 100) / tree.layer}px` }}>
      <div className="node">
        {treeNode.label}
        <button onClick={addChild}>Add</button> <button>Remove</button>
        <button onClick={toggle}>toggle</button>
      </div>
      {collapsed ? (
        treeNode.children.map((child: TreeNode) => (
          <Node tree={child} key={child.id}></Node>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Node;
