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

    const dbRef = firebase.database().ref("reviews");

    dbRef.once("value").then((snapshot) => {
      const reviews = snapshot.val();

      if (reviews) {
        const gameAverage = Object.keys(reviews).map((game) => {
          const reviewsForGame = Object.values(reviews[game]);
          const averageRate =
            reviewsForGame.reduce((sum, review) => sum + review.rating, 0) /
            reviewsForGame.length;

          return {
            game,
            averageRate,
          };
        });

        const sortedGames = gameAverage.sort(
          (a, b) => b.averageRate - a.averageRate
        );

        /*console.log("sort", sortedGames);*/

        const bestGames = sortedGames.slice(0, 5);

        setBestGames(bestGames);
      }
    });
    return () => {};
  }, []);

  return (
    <div className={styles.test}>
      <h1>최고의 5개 게임들</h1>
      <ul>
        {bestGames.map((game) => (
          <li keys={game.game}>
            <strong>{game.game}</strong> : {game.averageRate.toFixed(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Best;
