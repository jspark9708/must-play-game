import React from 'react';
import styles from './detail.module.css';
import InfoIcon from '@mui/icons-material/Info';
import Review from '../../components/review/review'
import Streams from '../../components/streams/streams';

const Detail = (props) => {
    let data = localStorage.getItem("itemData");
    data = JSON.parse(data);

    const handleClick = () => {
        // Check if steamLink is available before redirecting
        if (data.steamLink) {
            window.open(data.steamLink, '_blank');
        } else {
            console.error('Steam Link is not available.');
        }
    };


    return (
        <div className={styles.pageContainer}>
            <div className={styles.navCover}></div>
            <div className={`${styles.headContents} ${styles.gridContainer}`}>
                <div className={styles.fullContainer}>
                    <div className={styles.gridContainerWide}>
                        <p>개발 ·  {data.develop}</p>
                    </div>
                    <div className={`${styles.gameContainer} ${styles.grid}`}>
                        {/* 게임, 설명, 기타등등 요소가 들어갈 칸 */}
                        <div className={styles.leftContainer}>
                            {/* 비디오 */}
                            <div className={styles.videoArea}>
                                <iframe src={data.gameVideo}
                                frameBorder="0" title='gameVideo'></iframe>
                            </div>
                            <div className={styles.scoreboard}>
                                <div className={styles.scoreboardText}>
                                    <h2>메타스코어</h2>
                                    <div className={styles.samerow}>
                                        <InfoIcon sx={{fontSize:13}}/>
                                        <p>Metacritic에서 제공하는 작품에 대한 평가를 종합한 점수입니다.</p>
                                    </div>
                                </div>
                                <div className={styles.scoreBox}>{data.score}</div>
                            </div>
                            <div className={styles.gridContainerNarrow}></div>
                        </div>
                        {/* 게임 제목, 플랫폼 등 */}
                        <div className={styles.rightContainer}>
                            <div className={styles.textContents}>
                                <div className={styles.withLink}>
                                    <h1>{data.gameTitle}</h1>
                                    <div className={`${styles.release} ${styles.marginLeft}`}>
                                        <h3>발매일</h3>
                                        <p>{data.gameDate}</p>
                                    </div>
                                    <div className={`${styles.platform} ${styles.marginLeft}`}>
                                        <h3>플랫폼</h3>
                                        {data.platform && data.platform.length > 0 && (
                                        <div className={styles.platformContainer}>
                                            {data.platform.map((platform, index) => (
                                                <p key={index} className={`${styles.platformItem} ${styles[platform]}`}>{platform}</p>
                                            ))}
                                        </div>
                                        )}
                                    </div>
                                </div>
                                {/* 게임 설명 */}
                                <div className={styles.description}>
                                    <p>{data.gameDescript}</p>
                                </div>
                                <div className={styles.linkButton} onClick={handleClick}>
                                    <span>스팀에서 보기</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.midContents} ${styles.gridContainer}`}>
                <Review/>
            </div>
            <div className={styles.tailContents}>
                {/* 트위치 방송 API 관련 영역 */}
                <Streams/>
            </div>
        </div>
    );
};

export default Detail;