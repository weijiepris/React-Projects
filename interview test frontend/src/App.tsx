import React from "react";
import "./App.css";

import Todo from "./components/Todo";

import { Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TodoModel } from "./components/models/todo.model";
import TestAxios from "./components/TestAxios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import TestPromise from "./components/TestPromise";
import TestProxy from "./components/TestProxy";
import Main from "./components/Main";

function App() {
  const notify = () => toast.success("Wow so easy!");
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <Main/>
          <ToastContainer />
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
