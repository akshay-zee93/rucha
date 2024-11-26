// RouteHandler.js

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const User = lazy(() => import("./user"));
const Home = lazy(() => import("./input"));

const RouteHandler = ({ variation }) => {
  return (
    <Routes>
      {/* Define routes here */}
      <Route
        path="/"
        element={
          variation !== "" && variation === "A" ? (
            <Suspense fallback={<>loading...</>}>
              <User />
            </Suspense>
          ) : (
            <Suspense fallback={<>loading...</>}>
              <Home />
            </Suspense>
          )
        }
      />
    </Routes>
  );
};

export default RouteHandler;
