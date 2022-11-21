import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import React, { FC, useContext, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

import AuthenticationContext from "./store/authentication-content";
import Sidebar from "./components/common/Sidebar";

const Login = lazy(() => import("./components/auth/Login"));
const Header = lazy(() => import("./components/common/Header"));
const HomePage = lazy(() => import("./components/common/HomePage"));
const Bottombar = lazy(() => import("./components/common/Bottombar"));
const Settings = lazy(() => import("./components/common/Settings"));
const Inventory = lazy(() => import("./components/pages/Inventory/Inventory"));
const Customers = lazy(() => import("./components/pages/Customers/Customers"));
const Sales = lazy(() => import("./components/pages/Sales/Sales"));
const Scan = lazy(() => import("./components/pages/Scan/Scan"));
const Suppliers = lazy(() => import("./components/pages/Suppliers/Suppliers"));

const App: FC = () => {
  const notify = (response: { message: string; type: string }) => {
    if (response.type === "error") {
      toast.error(response.message);
      return;
    }

    if (response.type === "success") {
      toast.success(response.message);
      return;
    }

    toast(response.message);
  };

  const queryClient = new QueryClient();

  const authenticationContext = useContext(AuthenticationContext);

  if (!authenticationContext.isLoaded) {
    return <div></div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<></>}>
        {authenticationContext.isLoggedIn ? (
          <>
            <Header alert={notify} />
            <Sidebar />
          </>
        ) : (
          <></>
        )}
        <Routes>
          {authenticationContext.isLoggedIn ? (
            <>
              <Route path="/" element={<HomePage alert={notify} />} />
              <Route path="/inventory" element={<Inventory alert={notify} />} />
              <Route path="/scan" element={<Scan alert={notify} />} />
              <Route path="/sales" element={<Sales alert={notify} />} />
              <Route path="/customers" element={<Customers alert={notify} />} />
              <Route path="/suppliers" element={<Suppliers alert={notify} />} />
              <Route path="/settings" element={<Settings alert={notify} />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login alert={notify} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
        {authenticationContext.isLoggedIn ? <Bottombar /> : <></>}
      </React.Suspense>
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
