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
                    <source src="https://firebasestorage.googleapis.com/v0/b/mustplaygame.appspot.com/o/video%2F2018-bestgame.mp4?alt=media&token=8084aa56-71b0-40f4-b8c9-72909fec71c2" type="video/mp4"/>
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
