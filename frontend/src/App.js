import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WardrobesPage from "./pages/WardrobesPage";
import Page3D from "./pages/Page3D";

import { Menubar } from "primereact/menubar";

function App() {
  const navigate = useNavigate();

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    {
      label: "Wardrobes",
      icon: "pi pi-list",
      command: () => navigate("/wardrobes"),
    },

    {
      label: "3D",
      icon: "pi pi-box",
      command: () => navigate("/3d"),
    },
  ];

  return (
    <div>
      {/* helps us for ui and navigation (from prime react) */}
      <Menubar model={items} />

      {/* Route definitions */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wardrobes" element={<WardrobesPage />} />
        <Route path="/wardrobes/:id/3d" element={<Page3D />} />
      </Routes>
    </div>
  );
}

export default App;
