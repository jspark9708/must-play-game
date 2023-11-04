import React from 'react';
import styles from './footer.module.css';
import { Link } from 'react-router-dom';

import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';


const Footer = () => {

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
                            <li><a>About</a></li>
                            <li><a>Contact</a></li>
                        </ul>
                    </div>
                    <div className={styles.social}>
                        <h2>Follow us</h2>
                        <span><a href="https://www.youtube.com/hashtag/metacritic" target='_blank'><YouTubeIcon/></a></span>
                        <span><a href="https://www.facebook.com/Metacritic/" target='_blank'><FacebookIcon/></a></span>
                        <span><a href="https://www.instagram.com/metacritic/" target='_blank'><InstagramIcon/></a></span>
                    </div>
                    <div className={styles.brands}>
                        <h2>Explore Other</h2>
                        <span><a href="https://www.metacritic.com" target='_blank'>metacritic</a></span>
                        <span><a href="https://kr.ign.com/" target='_blank'>IGN</a></span>
                        <span><a href="https://www.gamespot.com/" target='_blank'>gamespot</a></span>
                        <span><a href="https://store.steampowered.com/" target='_blank'>steam</a></span>
                    </div>
                </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;