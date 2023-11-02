import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bestGameVideo from '../../source/video/2018-bestgame.mp4';
import styles from './main.module.css';

const Main = (props) => {
    let nav = useNavigate();

    return (
        <div>
            
            <div className={styles.vid}>
            <video
                autoPlay
                controls={false}
                loop
                muted
                style={{ width: '100%', height: 'auto'}}
                >
                    <source src={bestGameVideo} type="video/mp4"/>
                    Your browser dose not support the video tag.
                </video>
            </div>
        </div>
    );

};

export default Main;
