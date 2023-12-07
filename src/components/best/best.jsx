import React, { useState, useEffect } from "react";
import firebaseConfig from "../../service/firebase";
import firebase from "firebase/compat/app";
import styles from "./best.module.css";
import { useInView } from 'react-intersection-observer';

const Best = () => {
  const [bestGames, setBestGames] = useState([]);
  
  const[ref1, inView1] = useInView({ threshold: 0.8, triggerOnce: 'true' });
  const[ref2, inView2] = useInView({ threshold: 0.8, triggerOnce: 'true' });

  const[ref_item, inViewItem] = useInView({ threshold: 0.2, triggerOnce: 'true'});
 
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const dbRefReviews = firebase.database().ref("reviews");
    const dbRefGames = firebase.database().ref("games");

    dbRefReviews.once("value").then((snapshot) => {
      const reviews = snapshot.val();

      if (reviews) {
        const gameAverage = Object.keys(reviews).map(async (game) => {
          const reviewsForGame = Object.values(reviews[game]);
          const averageRate =
            reviewsForGame.reduce((sum, review) => sum + review.rating, 0) /
            reviewsForGame.length;

          const gameSnapshot = await dbRefGames
            .orderByChild("gameTitle")
            .equalTo(game)
            .once("value");
          const gameData = gameSnapshot.val();
          const gameKey = Object.keys(gameData)[0];

          return {
            key: gameKey,
            game: gameData[gameKey].gameTitle,
            devel: gameData[gameKey].develop,
            metaScore: gameData[gameKey].score,
            averageRate,
            gameCover: gameData[gameKey].gameCover || null,
          };
        });

        Promise.all(gameAverage).then((gamesWithCovers) => {
          const sortedGames = gamesWithCovers.sort(
            (a, b) => b.averageRate - a.averageRate
          );

          const bestGames = sortedGames.slice(0, 5);
          setBestGames(bestGames);
        });
      }
    });
    return () => {};
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 ref={ref1} className={inView1 ? styles.show : styles.hide}>유저 선정 TOP 5 게임</h1>
        <p ref={ref2} className={inView2 ? styles.show : styles.hide}>실제 등록된 유저리뷰 기반 선정 5개 최고 게임들 입니다.</p>
      </div>
      <div ref={ref_item} className={`${styles.gameContainer} ${inViewItem ? styles.showLocate : styles.hideLocate}`}>
        <ul>
          {bestGames.map((game, index) => (
            <li key={game.game}>
              <div className={styles.cardContainer}>
                {game.gameCover && (
                  <div className={styles.card}>
                    <img
                      className={styles.background}
                      src={game.gameCover}
                      alt={`${game.game} cover`}
                    />

                    <div className={styles.cardContent}>
                      <div className={styles.profileImage}>
                        <h2>{index + 1}</h2>
                      </div>
                      <div className={styles.title}>
                        <h3>{game.game}</h3>
                        <h3>유저 평점: {game.averageRate.toFixed(1)}</h3>
                      </div>
                    </div>
                    <div className={styles.backdrop}></div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Best;
