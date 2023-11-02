import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import AuthService from "./service/auth";
import "./App.css";
import Nav from "./components/navigator/nav";
import Main from  "./router/main/main";

import './init.css';

function App() {

  return (
    <div className="App">
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
      </Routes>
    </div>
  );
}

export default App;
