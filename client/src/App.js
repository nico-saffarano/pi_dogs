import "./App.css";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";
import { useState,useEffect } from "react";

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
  }, [access]);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/create" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
