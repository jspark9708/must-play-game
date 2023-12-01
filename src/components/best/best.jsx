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

          const gameSnapshot = await dbRefGames.orderByChild("gameTitle").equalTo(game).once("value");
          const gameData = gameSnapshot.val();
          const gameKey = Object.keys(gameData)[0];

          return {
            game: gameData[gameKey].gameTitle,
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
    <div className={styles.test}>
      <h1>최고의 5개 게임들</h1>
      <ul>
        {bestGames.map((game) => (
          <li key={game.game}>
            <strong>{game.game}</strong> : {game.averageRate.toFixed(1)}
            {game.gameCover && (
              <img src={game.gameCover} alt={`${game.game} cover`} sx={{ width: "100px" }} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Best;
