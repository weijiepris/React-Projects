import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

import Login from "./components/auth/Login";
import AuthenticationContext from "./store/authentication-content";

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

  const authenticationContext = useContext(AuthenticationContext);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {authenticationContext.isLoggedIn ? (
          <Route path="/" element={<div>homepage</div>} />
        ) : (
          <Route path="/" element={<Login alert={notify} />} />
        )}
      </Routes>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
