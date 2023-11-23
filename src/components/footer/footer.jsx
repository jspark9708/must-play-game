import React, {useState} from 'react';
import styles from './footer.module.css';
import { Link } from 'react-router-dom';

import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';


const Footer = () => {

    let [pageState, setPageState] = useState(null);

    return (
        <div>
            <footer className={styles.footer}>
                <div className={styles.container}>
                <div className={styles.textcenter}>
                    <div className={styles.logoContent}>
                        <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="Logo"></img>
                        <h1>MUST PLAY GAME</h1>
                    </div>
                </div>
                <div className={`${styles.grid} ${styles.footer_container}`}>
                    <div className={`${styles.links}`}>
                        <h2>Overview</h2>
                        <ul>
                            <li onClick={() => {setPageState(3)}} className={pageState === 3 ? `${styles.active}` : null}>
                                <Link to="/About"><em>About</em></Link>
                            </li>
                            <li onClick={() => {setPageState(4)}} className={pageState === 4 ? `${styles.active}` : null}>
                                <Link to="/Contact"><em>Contact</em></Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.social}>
                        <h2>Follow us</h2>
                        <span><a href="https://www.youtube.com/hashtag/metacritic" target='_blank' rel='noreferrer'><YouTubeIcon/></a></span>
                        <span><a href="https://www.facebook.com/Metacritic/" target='_blank' rel='noreferrer'><FacebookIcon/></a></span>
                        <span><a href="https://www.instagram.com/metacritic/" target='_blank' rel='noreferrer'><InstagramIcon/></a></span>
                    </div>
                    <div className={styles.brands}>
                        <h2>Explore Other</h2>
                        <span><a href="https://www.metacritic.com" target='_blank' rel='noreferrer'>metacritic</a></span>
                        <span><a href="https://kr.ign.com/" target='_blank' rel='noreferrer'>IGN</a></span>
                        <span><a href="https://www.gamespot.com/" target='_blank' rel='noreferrer'>gamespot</a></span>
                        <span><a href="https://store.steampowered.com/" target='_blank' rel='noreferrer'>steam</a></span>
                    </div>
                </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;