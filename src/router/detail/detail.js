import React from 'react';
import { useState, useEffect } from 'react';
import styles from './detail.module.css';

const Detail = (props) => {

    return (
        <div className={styles.bgColor}>
            <div className={styles.navCover}></div>
            <div className={styles.container}> 
                <div className={styles.header}>
                    <div className={styles.headerText}><h2>The Legends of Zelda : Breath of The wild</h2></div>
                </div>
                <p>Hello</p>
            </div>
        </div>
    );
};

export default Detail;