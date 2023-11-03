/* 스크롤을 하면 양쪽에서 게임과 metecritic평점이 담긴
div가 좌우 양쪽에서 서서히 나오도록 하면 component */

import React from 'react';
import styles from './showbox.module.css';
import { useInView } from 'react-intersection-observer';

const Showbox = () => {
    const[ref1, inView1] = useInView({ threshold: 0.8, triggerOnce: 'true' });
    const[ref2, inView2] = useInView({ threshold: 0.8, triggerOnce: 'true' });
    const[ref3, inView3] = useInView({ threshold: 0.8, triggerOnce: 'true' });

    const[ref_item1, inViewItem1] = useInView({ threshold: 0.4, triggerOnce: 'true'});
    const[ref_item2, inViewItem2] = useInView({ threshold: 0.4, triggerOnce: 'true' });
    const[ref_item3, inViewItem3] = useInView({ threshold: 0.4, triggerOnce: 'true' });


    return(
        <div>
            <div className={styles.container}>
                <div className={styles.textContainer}>
                    <h1 ref={ref1} className={inView1 ? styles.show : styles.hide}>
                        Games to Play Right Now !!
                    </h1>
                    <p ref={ref2} className={inView2 ? styles.show : `${styles.hide} ${styles.translateLTR}`}>
                        metacritic에서 선정한 최고의 게임들입니다.
                    </p>
                    <p ref={ref3} className={inView3 ? styles.show : `${styles.hide} ${styles.translateRTL}`}>
                        진정한 게이머가 되기위한 여정을 준비하세요.
                    </p>
                </div>
                <div className={styles.gameContainer}>
                    <div className={styles.imgContainer}>
                        <div ref={ref_item1} className={inViewItem1 ? styles.show_itemL : `${styles.hide} ${styles.translateLTR_item}`}>
                            <img src={`${process.env.PUBLIC_URL}/img/game3.jpeg`} width={280}></img>
                            <div className={styles.scoreOverlay}>97</div>
                        </div>
                        <div className={styles.commentsR}>
                            <p>GTA 5</p>
                            <p>PS 최고의 명작</p>
                            <p>다양한 활동</p>
                            <p>매우 발전된 그래픽</p>
                        </div>
                    </div>
                    <div className={styles.imgContainer}>
                        <div ref={ref_item2} className={inViewItem2 ? styles.show_itemR : `${styles.hide} ${styles.translateRTL_item}`}>
                            <img src={`${process.env.PUBLIC_URL}/img/game2.jpeg`} width={280}></img>
                            <div className={styles.scoreOverlay}>97</div>
                        </div>
                        <div className={styles.commentsL}>
                            <p>젤다 BOTW</p>
                            <p>흥미진진한 스토리</p>
                            <p>엄청난 자유도</p>
                            <p>독창적 퍼즐 요소</p>
                        </div>
                    </div>
                    <div className={styles.imgContainer}>
                        <div  ref={ref_item3} className={inViewItem3 ? styles.show_itemL : `${styles.hide} ${styles.translateLTR_item}`}>
                            <img src={`${process.env.PUBLIC_URL}/img/game1.jpeg`} width={280}></img>
                            <div className={styles.scoreOverlay}>95</div>
                        </div>
                        <div className={styles.commentsR}>
                            <p>PORTAL 2</p>
                            <p>최고의 퍼즐 게임</p>
                            <p>흥미진진한 플롯</p>
                            <p>매혹적인 음악</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Showbox;