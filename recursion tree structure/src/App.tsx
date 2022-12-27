import React, { useState } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Node from "./components/Node";
import { TreeNode } from "./components/models/todo.model";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  const getUUID = (): string => {
    return window.crypto.randomUUID();
  };

  const [tree, setTree] = useState<TreeNode>({
    id: getUUID(),
    label: "Tree Structure",
    expanded: false,
    layer: 0,
    children: [
      {
        id: getUUID(),
        label: "Tree Structure 2",
        expanded: false,
        layer: 1,
        children: [
          {
            id: getUUID(),
            label: "Tree Structure 4",
            expanded: false,
            layer: 2,
            children: [
              {
                id: getUUID(),
                label: "Tree Structure 5",
                expanded: false,
                layer: 3,
                children: [
                  {
                    id: getUUID(),
                    label: "Tree Structure 6",
                    expanded: false,
                    layer: 4,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: getUUID(),
        label: "Tree Structure 3",
        expanded: false,
        layer: 1,
        children: [],
      },
    ],
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <Node tree={tree} key={tree.id}></Node>
        </header>
      </div>
    </QueryClientProvider>
  );
};

export default App;
