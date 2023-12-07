import React from 'react';
import styles from './main.module.css';
import Showbox from '../../components/showbox/showbox';
import Best from '../../components/best/best';

const Main = (props) => {
    return (
        <div>
            <div className={styles.vid}>
                <video
                    autoPlay
                    controls={false}
                    loop
                    muted
                    playsInline //모바일 환경 비디오 자동 전체화면 방지
                    style={{ width: '100%', height: 'auto'}}
                >
                    <source src={`${process.env.PUBLIC_URL}/video/2018-bestgame.mp4`} type="video/mp4"/>
                    Your browser dose not support the video tag.
                </video>
            </div>
            
            <div>
                <div className={styles.separator}></div>
                <Showbox></Showbox>
            </div>
            <div>
                <div className={styles.separator}></div>
            </div>
            <div>
                <Best></Best>
            </div>
        </div>
    );

};

export default Main;
