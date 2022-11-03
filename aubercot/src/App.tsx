import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { FC, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

import Login from "./components/auth/Login";
import AuthenticationContext from "./store/authentication-content";
import HomePage from "./components/common/HomePage";
import Header from "./components/common/Header";

const App: FC = () => {
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

  if (!authenticationContext.isLoaded) {
    return <div></div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Routes>
        {authenticationContext.isLoggedIn ? (
          <Route path="/" element={<HomePage />} />
        ) : (
          <Route path="/" element={<Login alert={notify} />} />
        )}
      </Routes>
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
