import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import firebaseConfig from '../../service/firebase.js'
import styles from './pc.module.css';



const PC = () => {
  const [games, setGames] = useState();
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    // Initialize Firebase app
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Firebase Realtime Database에서 데이터 가져오기
    const dbRef = firebase.database().ref('games');

    dbRef.on('value', (snapshot) => {
      const gamesData = snapshot.val();
      
      // 필터링된 데이터를 가져오기
      const filteredGames = Object.keys(gamesData).reduce((acc, key) => {
        const game = gamesData[key];
        if (game.platform.includes('pc')) {
          acc.push({ key, ...game });
        }
        return acc;
      }, []);

      setGames(filteredGames);
    });

    return () => {
      dbRef.off(); // 컴포넌트가 unmount될 때 listener 해제
    };
  }, []);
 
  // 이미지 로드 함수
  // TODO : 무한 로드 해결하기
  const loadImages = async () => {
    const storage = firebase.storage();
    const updatedGames = [];

    for (const game of games) {
      if (!loadedImages[game.key]) {
        const imageUrl = game.gameCover;

        try {
          const imageRef = storage.refFromURL(imageUrl);
          const imageURL = await imageRef.getDownloadURL();
          updatedGames.push({ ...game, imageUrl: imageURL });
          setLoadedImages({ ...loadedImages, [game.key]: true });
        } catch (error) {
          console.error("Error fetching image:", error);
          updatedGames.push({ ...game, imageUrl: '' });
        }
      } else {
        // If the image is already loaded, use the existing URL
        updatedGames.push({ ...game, imageUrl: game.imageUrl });
      }
    }

    setGames(updatedGames);
  };

  // Rest of your code remains the same

  useEffect(() => {
    if (games && games.length > 0) {
      loadImages();
    }
  }, [games]);
  
  return (
    <div className={styles.bgColor}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1>Must Play PC Game</h1>
          <h3>다음에 플레이할 PC 최고의 명작 10가지를 소개해드립니다!</h3>
          <div className={styles.separator}></div>
        </div>
        <div className={styles.listContainer}>
          <div className={styles.feature}>
            {/* what i played 필터, search 기능 */}
          </div>
          
          <div className={styles.gameContainer}>
            {games && games.length > 0 ? (
            <div className={`${styles.gridContainer} ${styles.grid}`}>
              {games.map((game) => (
                <div key={game.key} className={styles.gameItem}>
                  <div className={styles.gameCover}>
                    <img src={game.imageUrl} alt={game.gameTitle} width={250}/>
                  </div>
                  <div className={styles.gameDetail}>
                    <div className={styles.gameTitle}>
                      <h3>{game.gameTitle}</h3>
                    </div>
                    <div className={styles.scoreContainer}>
                      <div className={styles.scoreBox}>{game.score}</div>
                      <p>metascore</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No games available</p>
          )}
          </div>
          
          {/*
          <div className={styles.gameContainer}>
            <div className={`${styles.gridContainer} ${styles.grid}`}>
              <div className={styles.gameItem}>
                <div className={styles.gameCover}>
                  <img src={`${process.env.PUBLIC_URL}/img/game1.jpeg`}/>
                </div>
                <div className={styles.gameDetail}>
                  <div className={styles.gameTitle}>
                    <h3>Portal : the legend of zelda</h3>
                  </div>
                  <div className={styles.scoreContainer}>
                    <div className={styles.scoreBox}>95</div>
                    <p>metascore</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        */}
        </div>
      </div>
    </div>
  );
};

export default PC;
