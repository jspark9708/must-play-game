import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebaseConfig from "../../service/firebase";
import firebase from "firebase/compat/app";
import styles from "./best.module.css";

const Best = () => {
  const [bestGames, setBestGames] = useState([]);
  let navigate = useNavigate();
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

  const handleGameClick = (game) => {
    navigate(`/Detail/${game.key}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1>유저 선정 TOP 5 게임</h1>
      </div>
      <div className={styles.gameContainer}>
        <ul>
          {bestGames.map((game, index) => (
            <li key={game.game}>
              <div className={styles.cardContainer}>
                {game.gameCover && (
                  <div className={styles.card} onClick={() => handleGameClick(game)}>
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
