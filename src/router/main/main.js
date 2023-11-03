import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './main.module.css';
import { useInView } from 'react-intersection-observer';
import Showbox from '../../components/showbox/showbox';

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
                    <source src={`${process.env.PUBLIC_URL}/video/2018-bestgame.mp4`} type="video/mp4"/>
                    Your browser dose not support the video tag.
                </video>
            </div>
            <div>
                <Showbox></Showbox>
                <h1>after showbox</h1>
            </div>
        </div>
    );

};

export default Main;
