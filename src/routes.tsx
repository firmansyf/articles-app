import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="" element={} /> */}
    </Routes>
  );
};

export { Router };
