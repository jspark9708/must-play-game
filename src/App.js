import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import AuthService from "./service/auth";
import firebaseApp from './service/firebase';
import Footer from "./components/footer/footer"
import "./App.css";
import Nav from "./components/navigator/nav";
import Main from  "./router/main/main";
import PC from "./router/pc/pc";
import Switch from "./router/switch/switch";
import Playstation from "./router/playstation/playstation";
import Detail from './router/detail/detail';
import About from './router/about/about';
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
    localStorage.setItem("userDisplayName", user.displayName);//사용자 이름 사용
    localStorage.setItem("userPhotoURL", user.photoURL);      //사용자 사진 사용
    localStorage.setItem("userEmail", user.email);            //사용자 이메일로 본인 비교용
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
        localStorage.removeItem("userEmail"); // userEmail 값 삭제 추가
        
        setEmailCheck(false);
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
        <Route path="/Switch" element={<Switch></Switch>}></Route>
        <Route path="/Playstation" element={<Playstation></Playstation>}></Route>
        <Route path="/Detail/:id" loginData={loginData} emailCheck={emailCheck} onLogout={onLogout} element={<Detail></Detail>}></Route>
        <Route path="/About" element={<About></About>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
