import React, { useState, useEffect, useContext } from "react";
import TreeContext from "../store/treeContext";
import { TreeNode } from "./models/Node.model";
import "./Node.css";

interface Props {
  tree: TreeNode;
}

const Node: React.FC<Props> = ({ tree }) => {
  const [treeNode, setTreeNode] = useState<TreeNode>(tree);
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const treeContext = useContext(TreeContext);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div style={{ marginLeft: `${(tree.depth * 100) / tree.depth}px` }}>
        <div className="node">
          {treeNode.label}
          {tree.depth === 0 ? <></> : <>
            <button onClick={() => treeContext.addChild(tree)}>Add</button>
            {tree.depth === 1 ? <></> : <><button onClick={() => treeContext.removeFolder(tree)}>Remove</button></>}
            <button onClick={toggle}>toggle</button></>}

        </div>
        {collapsed ? (
          treeNode.children.map((child: TreeNode) => (
            <Node tree={child} key={child.id}></Node>
          ))
        ) : (
          <div></div>
        )}
      </div></>
  );
};

export default Node;
