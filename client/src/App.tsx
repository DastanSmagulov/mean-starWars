import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import People from "./scenes/People";
import Planets from "./scenes/Planet";
import Starships from "./scenes/Starship";
import "./styles/globals.css";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/people" element={<People />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/starships" element={<Starships />} />
      </Routes>
    </Router>
  );
}

export default App;
