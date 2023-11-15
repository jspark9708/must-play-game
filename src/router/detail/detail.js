import React from 'react';
import { useState, useEffect } from 'react';
import styles from './detail.module.css';

const Detail = (props) => {
    let data = localStorage.getItem("itemData");
    data = JSON.parse(data);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.navCover}></div>
            <div className={`${styles.headContents} ${styles.grid} ${styles.gridContainer}`}>
                <div className={styles.gridContainerWide}>
                    <p>개발 : {data.develop}</p>
                </div>
                <div className={styles.gameContainer}>
                    {/* 게임, 설명, 기타등등 요소가 들어갈 칸 */}
                    <div className={styles.leftContainer}>
                        <div className={styles.videoArea}>
                            <iframe src={data.gameVideo}></iframe>
                        </div>
                        <div className={styles.gridContainerNarrow}>
                        </div>
                        <p>{data.gameTitle}</p>
                    </div>
                    <div className={styles.rightContainer}>
                        <img src={data.gameBanner}></img>
                        <div className={styles.summary}>
                            <p>{data.gameDescript}</p>
                        </div>
                        {data.platform && data.platform.length > 0 && (
                            <div>
                                {data.platform.map((platform, index) => (
                                    <p key={index}>{platform}</p>
                                ))}
                            </div>
                        )}
                        <div className={styles.example}>
                            <p>link: {data.steamLink}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.midContents}>
                {/* 리뷰 관련 영역 */}
            </div>
            <div className={styles.tailContents}>
                {/* 트위치 방송 API 관련 영역 */}
            </div>
        </div>
    );
};

export default Detail;