// streams.jsx
import React, { useEffect, useState } from 'react';
import styles from './streams.module.css';
import api from '../../service/api';

function Streams() {
    const [channels, setChannels] = useState([]);
    const data = JSON.parse(localStorage.getItem("itemData"));

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

                setChannels(modifiedData);
                console.log("채널목록 : ", modifiedData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchChannels();
    }, []);

    return (
        <div>
            <div className={styles.container}>
                <h4>트위치 목록</h4>
            </div>
            <ul>
                {channels.map(channel => (
                    <li key={channel.id}>
                        <strong>{channel.user_name}</strong> - Views: {channel.viewer_count}
                        <img src={channel.thumbnail_url}></img>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Streams;
