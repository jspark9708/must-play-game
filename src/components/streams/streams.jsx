import React, { useEffect, useState } from 'react';
import styles from './streams.module.css'
import api from '../../service/api';

function Streams() {
    const [games, setGames] = useState ([]);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await api.get('https://api.twitch.tv/helix/games/top');
            // 새로운 배열을 생성하고, 각 요소를 새로운 객체로 만들어서 값을 할당
            const modifiedData = result.data.data.map(game => ({
              ...game,
              box_art_url: game.box_art_url.replace('{width}', '300').replace('{height}', '400')
            }));
      
            console.log(modifiedData);
            setGames(modifiedData);
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
      
        fetchData();
      }, []); // 두번째 인자에 빈 배열을 전달하여 최초 한 번만 호출되도록 함
      


    return (
        <div>
            <div className={styles.container}>
                <h4>트위치 목록</h4>
            </div>
            <div>
                {games.map(game => (
                    <div>
                        <img src={game.box_art_url} alt="none"></img>
                        <h5>{game.name}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Streams;