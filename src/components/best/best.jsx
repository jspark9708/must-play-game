import React, { useState, useEffect } from "react";
import firebaseConfig from "../../service/firebase";
import firebase from "firebase/compat/app";
import styles from "./best.module.css";

const Best = () => {
  const [bestGames, setBestGames] = useState([]);

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
        <h1>유저 선정 TOP 5 게임</h1>
      </div>
      <div className={styles.gameContainer}>
        <ul>
          {bestGames.map((game) => (
            <li key={game.game}>
              <div className={styles.average}>
                <div><strong>메타 스코어</strong><p>{game.metaScore}</p></div>
                <div><strong>유저 스코어</strong><p>{game.averageRate}</p></div>
              </div>
              <div className={styles.imgArea}>
                {game.gameCover && (
                  <img src={game.gameCover} alt={`${game.game} cover`} />
                )}
                {/*{game.averageRate.toFixed(1)}*/}
              </div>
              <div className={styles.gameTitle}>
                <strong>{game.game}</strong>
                <p>{game.devel}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Best;
