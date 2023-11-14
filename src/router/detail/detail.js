import React from 'react';
import { useState, useEffect } from 'react';
import styles from './detail.module.css';

const Detail = (props) => {
    let gameData = localStorage.getItem("itemData");
    gameData = JSON.parse(gameData);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.headContents}>
                <div className={styles.gridContainer}>
                    {/* 초록 게임 설명 칸 */}
                    <br/><br/><br/><br/><br/>
                    <h1>{gameData.gameTitle}</h1>
                    <h1>{gameData.gameDescript}</h1>
                    <iframe width="560" height="315" src={gameData.gameVideo} frameborder="0" allowfullscreen></iframe>
                    <img src={gameData.gameBanner}></img>
                </div>
                <div className={styles.gameContainer}>
                    {/* 게임, 설명, 기타등등 요소가 들어갈 칸 */}
                    <div className={styles.rightContainer}>
                        <div className={styles.videoArea}></div>
                        <div className={styles.summary}></div>
                    </div>
                    <div className={styles.leftContainer}></div>
                </div>
            </div>
            <div className={styles.midContents}>
                {/* 리뷰 관련 영역 */}
            </div>
        </div>
    );
};

export default Detail;