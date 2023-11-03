/* 스크롤을 하면 양쪽에서 게임과 metecritic평점이 담긴
div가 좌우 양쪽에서 서서히 나오도록 하면 component */

import React from 'react';
import styles from './showbox.module.css';
import { useInView } from 'react-intersection-observer';

const Showbox = () => {
    const[ref1, inView1] = useInView({ threshold: 1.0 });
    const[ref2, inView2] = useInView({ threshold: 1.0 });
    const[ref3, inView3] = useInView({ threshold: 1.0 });

    return(
        <div>
            <div className={styles.container}>
                <h1 ref={ref1} className={inView1 ? styles.show : styles.hide}>
                    Games to Play Right Now
                </h1>
                <p ref={ref2} className={inView2 ? styles.show : `${styles.hide} ${styles.translateLTR}`}>
                    metacritic에서 선정한 최고의 게임들입니다.
                </p>
                <p ref={ref3} className={inView3 ? styles.show : `${styles.hide} ${styles.translateRTL}`}>
                    진정한 게이머가 되기위한 여정을 준비하세요!
                </p>
            </div>
        </div>
    );
};

export default Showbox;