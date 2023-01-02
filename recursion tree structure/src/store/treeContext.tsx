import _ from 'lodash';
import React, { useState } from 'react';
import { TreeNode } from '../components/models/Node.model';

const TreeContext = React.createContext({
    tree: { id: "", label: "", depth: 0 },
    treeCount: 0,
    deletedCount: 0,
    addChild: (locateNode: TreeNode) => { },
    removeFolder: (locateNode: TreeNode) => { },
});

const generateUUID = (): string => {
    return window.crypto.randomUUID();
};

export const TreeContextProvider = (props: any) => {
    const [treeCount, setTreeCount] = useState(1);
    const [deleteCount, setDeleteCount] = useState(0);
    const [tree, setTree] = useState<TreeNode>({
        id: generateUUID(),
        label: "Tree Structure Example",
        depth: 0,
        children: [{
            id: generateUUID(),
            label: "Tree Structure 0",
            depth: 1,
            children: [],
            parent: {
                id: generateUUID(),
                label: "Tree Structure Example",
                depth: 0,
            }
        }]
    });

    const updateNode = (parentNode: TreeNode, locateNode: TreeNode) => {
        if (parentNode.id === locateNode.id) {
            parentNode = _.cloneDeep(locateNode);
            return;
        }

        parentNode.children.forEach(kid => {
            updateNode(kid, locateNode)
        })
    }

    const addChild = (locateNode: TreeNode) => {
        const id: string = generateUUID();
        const depth: number = locateNode.depth + 1;

        let parentNode = _.cloneDeep(locateNode);
        delete parentNode.children;
        const newNode: TreeNode = {
            id: id,
            label: `Tree Structure ${treeCount}`,
            depth: depth,
            children: [],
            parent: parentNode,
        };

        setTreeCount(prevState => prevState = treeCount + 1);
        locateNode.children = [...locateNode.children, newNode]
    }

    const removeFolder = (locateNode: TreeNode) => {

        let parentNode = findParent(tree, locateNode.parent.id);

        const parentNodeChild = parentNode.children.filter(node => node.id !== locateNode.id);

        parentNode.children = parentNodeChild;

        updateNode(tree, parentNode)

        const deletedCount: number = getChildCount(locateNode);

        setDeleteCount(prevState => prevState += deletedCount)
    }

    const getChildCount = (locateNode: TreeNode): number => {
        let count = 1;

        if (locateNode.children.length === 0) {
            return 1;
        } else {
            locateNode.children.forEach(child => {
                return count += getChildCount(child);
            })
        }

        return count;
    }
    
    const findParent = (node: TreeNode, id: string) => {
        let found: TreeNode = null;
        if (node.id === id) {
            found = node;
            return found;
        }
        node.children.forEach(child => {
            found = findParent(child, id);
            if (found !== null) return found
        })
        if (found !== null) return found
    }

    return (
        <TreeContext.Provider
            value={{
                tree: tree,
                treeCount: treeCount,
                deletedCount: deleteCount,
                addChild: addChild,
                removeFolder: removeFolder,
            }}
        >
            {props.children}
        </TreeContext.Provider>
    )
}

export default TreeContext