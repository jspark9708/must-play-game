import React from 'react';
import { useState, useEffect } from 'react';
import styles from './detail.module.css';

const Detail = (props) => {
    let data = localStorage.getItem("itemData");
    data = JSON.parse(data);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.headContents}>
                <div className={styles.gridContainerWide}>
                    <p>{data.develop}</p>
                </div>
                <div className={styles.gameContainer}>
                    {/* 게임, 설명, 기타등등 요소가 들어갈 칸 */}
                    <div className={styles.leftContainer}>
                        <div className={styles.videoArea}></div>
                        <div className={styles.gridContainerNarrow}>
                            <p>{data.develop}</p>
                        </div>
                        <div className={styles.summary}></div>
                    </div>
                    <div className={styles.rightContainer}></div>
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