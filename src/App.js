import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import AuthService from "./service/auth";
import Footer from "./components/footer/footer"
import "./App.css";
import Nav from "./components/navigator/nav";
import Main from  "./router/main/main";

import './init.css';

function App() {

  /* 로그인 */
  const authService = new AuthService();

  function onLogin(){
    authService.login().then((data)=>{loginData(data.user)})
  };

  let [emailCheck, setEmailCheck] = useState(false);

  function loginData(user){
    console.log(user);
    localStorage.setItem("emailCheck", user.emailVerified);
    loginCheck();
  }

  function loginCheck(){
    let getLocalEmail = localStorage.getItem("emailCheck");

    if(getLocalEmail){
      setEmailCheck(true);
    }
    else{
      setEmailCheck(false);
    }
  };

  return (
    <div className="App">
      <Nav loginData={loginData} emailCheck={emailCheck} setEmailCheck={setEmailCheck} onLogin={onLogin}></Nav>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
