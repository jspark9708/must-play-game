import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import AuthService from "./service/auth";
import "./App.css";
import Nav from "./components/navigator/nav";

function App() {

  /* 로그인 기능 */
  const authService = new AuthService();

  function onLogin(){
    authService.login().then((data)=>{loginData(data.user)})
  };

  /* 로그인 확인 */


  return (
    <div className="App">
      <Nav loginData={loginData} emailCheck={emailCheck} setEmailCheck={setEmailCheck} onLogin={onLogin}></Nav>
    </div>
  );
}

export default App;
