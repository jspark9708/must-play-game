import { React, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from './nav.module.css';

const Nav = (props) => {
  let slideMenu = useRef(null);
  let hamburger = useRef(null);
  let [pageState, setPageState] = useState(null);

  /* 슬라이드 메뉴 */
  function sliderOpen(e){
    hamburger.current.classList.toggle(`${styles.active}`);
    slideMenu.current.classList.toggle(`${styles.active}`);
  }

  function sliderClose(){
    hamburger.current.classList.remove(`${styles.active}`);
    slideMenu.current.classList.remove(`${styles.active}`);
  }

  function logout(){
    localStorage.removeItem("emailCheck");
    props.setEmailCheck(false);
  }

  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.slideMenu} ref={slideMenu}>
            <div className={styles.logo}>
              <Link to="/" onClick={() => { setPageState(null) }}>
                <div className={styles.logoContent}>
                  <img src={`${process.env.PUBLIC_URL}/img/logo.png`} width={30} height={30} alt="Logo"></img>
                  <h1>MUST PLAY GAME</h1>
                </div>
              </Link>
            </div>
            <ul>
              <li onClick={() => {setPageState(0); sliderClose();}} className={pageState == 0 ? `${styles.active}` : null}>
                <Link to="/PC"><em>PC</em></Link>
              </li>
              <li onClick={() => {setPageState(1); sliderClose();}} className={pageState == 1 ? `${styles.active}` : null}>
                <Link to="/Switch"><em>Switch</em></Link>
              </li>
              <li onClick={() => {setPageState(2); sliderClose();}} className={pageState == 2 ? `${styles.active}` : null}>
                <Link to="/PlayStation"><em>Playstation</em></Link>
              </li>
            </ul>
          </div>
          <div className={styles.login}>
            <ul>
              {
                props.emailCheck == false ?
                <li className={styles.login_btt} onClick={props.onLogin}><em>LOGIN</em></li>
                :
                <li className={styles.login_btt} onClick={logout}><em>LOGOUT</em></li>
              }
              <li className={`${styles.hamburger} hamburger`} onClick={(e)=>sliderOpen(e.currentTarget)} ref={hamburger}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
