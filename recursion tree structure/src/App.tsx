import React, { useState, useContext } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { Button } from 'primereact/button';
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Node from "./components/Node";
import TreeContext from "./store/treeContext";

const App: React.FC = () => {

  const treeContext = useContext(TreeContext);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <Button onClick={() => console.log(treeContext.tree)}>SHOW TREE STRUCTURE IN CONSOLE</Button>
          {treeContext.treeCount} folders created
          <br />
          {treeContext.deletedCount} folders deleted
          <Node tree={treeContext.tree} key={treeContext.tree.id}></Node>
        </header>
      </div>
    </QueryClientProvider>
  );
};

export default App;
