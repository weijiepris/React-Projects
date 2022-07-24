import React from "react";
import { Routes, Route } from "react-router-dom";

import Footer from "./components/common/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Footer />} />
      <Route path="messages" element={<Footer />} />
      <Route path="tasks" element={<Footer />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
