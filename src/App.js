import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import AuthService from "./service/auth";
import "./App.css";
import Nav from "./components/navigator/nav";
import './init.css';

function App() {

  return (
    <div className="App">
      <Nav></Nav>
      <Routes>
        <Route></Route>
      </Routes>
    </div>
  );
}

export default App;
