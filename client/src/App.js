import "./App.css";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";
import { useState, useEffect } from "react";
import Form from "./views/Form/Form";
import About from "./views/About/About";

const EMAIL = "nico@mail.com";
const PASSWORD = "123456";

function App() {
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();

  const login = (userData) => {
    if (userData.email === EMAIL && userData.password === PASSWORD) {
      setAccess(true);
      navigate("/home");
    }
  };

  useEffect(() => {
    !access && navigate("/");
    // eslint-disable-next-line
  }, [access]);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing login={login} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dogs/:id" element={<Detail />} />
        <Route path="/create" element={<Form />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
