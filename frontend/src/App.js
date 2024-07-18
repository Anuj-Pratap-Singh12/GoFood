import "./App.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./components/screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./components/screens/LogIn";
import SignUp from "./components/screens/SignUp.js";
import { CardProvider } from "./components/ContextReducer.js";
import Myorder from "./components/screens/Myorder.js";

function App() {
  return (
    <CardProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/LogIn" element={<LogIn />} />
            <Route exact path="/createuser" element={<SignUp />} />
            <Route exact path="/myorder" element={<Myorder />} />
          </Routes>
        </div>
      </Router>
    </CardProvider>
  );
}

export default App;
