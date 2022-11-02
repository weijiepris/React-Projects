import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthContext from "./store/auth-context";
import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
import Login from "./components/auth/Login";

function App() {
  const notify = (response: { message: string; type: string }) => {
    if (response.type === "error") {
      toast.error(response.message);
    }

    if (response.type === "success") {
      toast.success(response.message);
    }
  };
  const queryClient = new QueryClient();
  const ctx = useContext(AuthContext);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {ctx.isLoggedIn ? (
          <Route path="/" element={<div>homepage</div>} />
        ) : (
          <Route path="/" element={<Login alert={notify} />} />
        )}
      </Routes>
      {/* <div className="App">
        <header className="App-header">
          <Button onClick={notify}>Test Button</Button>
          <ToastContainer />
        </header>
      </div> */}
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
