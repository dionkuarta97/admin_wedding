import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
