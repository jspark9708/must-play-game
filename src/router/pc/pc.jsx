import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import firebaseConfig from '../../service/firebase.js'
import styles from './pc.module.css';
import SmartToyIcon from '@mui/icons-material/SmartToy';

//data 주고받기 위한 redux 
import { useDispatch } from 'react-redux';
import { addDetailData } from '../../store.js';

const PC = () => {
  let navigate = useNavigate();
  const [games, setGames] = useState();
  let dispatch = useDispatch();

  //const game에 filter
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const dbRef = firebase.database().ref('games');

    dbRef.on('value', (snapshot) => {
      const gamesData = snapshot.val();
      
      // 필터링된 데이터를 가져오기
      const filteredGames = Object.keys(gamesData).reduce((acc, key) => {
        const game = gamesData[key];
        if (game.platform.includes('PC')) {
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
  
  const handleGameClick = (game) => {
    dispatch(addDetailData(game));
    navigate(`/Detail/${game.key}`);
  }

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
                <div key={game.key} onClick={()=> handleGameClick(game)} className={styles.gameItem}>
                  <div className={styles.gameImg}>
                    <img src={game.gameCover} alt={game.gameTitle}/>
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
        </div>
        <div className={styles.cookie}>
          <p><SmartToyIcon/></p>
          <p>마음에 드는 게임을 찾으셨길 바래요!</p>
        </div>
      </div>
    </div>
  );
};

export default PC;
