import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter as Router, Routes, Route, Link } from "react-router-dom";

import App from "./App";
import VoiceWidget from "./lib/VoiceWidget";

import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <nav>
        <Link to={"/"}>Root</Link>
        <Link to={"/test"}>Test</Link>
      </nav>

      <Routes>
        <Route path="/">
          <Route index element={<App />} />
          <Route path="test" element={<VoiceWidget />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
