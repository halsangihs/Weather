import React, { useState } from "react";
import Home from "./pages/Home.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={
        darkMode ? "dark bg-black text-white" : "bg-orange-100 text-black"
      }
    >
      <Home darkMode={darkMode} />
    </div>
  );
}

export default App;
