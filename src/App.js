import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import AuthService from "./service/auth";
import firebaseApp from './service/firebase';
import Footer from "./components/footer/footer"
import "./App.css";
import Nav from "./components/navigator/nav";
import Main from  "./router/main/main";
import PC from "./router/pc/pc";
import Detail from './router/detail/detail';
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

  function onLogout(){
      firebaseApp.auth().signOut()
      .then(() => {
        setEmailCheck(false);
        // 로그아웃 성공 시 로컬 스토리지와 상태 초기화
        localStorage.removeItem("emailCheck");
        localStorage.setEmailCheck(false);
        localStorage.loginData(null); // 또는 다른 방법으로 사용자 정보를 초기화
      })
      .catch((error) => {
        console.error("로그아웃 에러:", error);
      });
  }

  return (
    <div className="App">
      <Nav loginData={loginData} emailCheck={emailCheck} setEmailCheck={setEmailCheck} onLogin={onLogin} onLogout={onLogout}></Nav>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/PC" element={<PC></PC>}></Route>
        <Route path="/Detail/:id" element={<Detail></Detail>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
