import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          authenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <WelcomePage
              onSuccess={() => setAuthenticated(true)}
            />
          )
        }
      />

      <Route
        path="/home"
        element={
          authenticated ? (
            <HomePage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}
