// streams.jsx
import React, { useEffect, useState } from 'react';
import styles from './streams.module.css';
import api from '../../service/api';

function Streams() {
    const [channels, setChannels] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // 슬라이드 인덱스 추가
    const data = JSON.parse(localStorage.getItem("itemData"));

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const response = await api.get('https://api.twitch.tv/helix/streams', {
                    params: {
                        game_id: data.gameId,
                        first: 10,
                    },
                });

                const modifiedData = response.data.data.map(game => ({
                  ...game,
                  thumbnail_url: game.thumbnail_url.replace('{width}', '450').replace('{height}', '300')
                }));

                setChannels(modifiedData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchChannels();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (channels.length / 5 ));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 +  (channels.length / 5 )) %  (channels.length / 5 ));
    };

    return (
        <div>
            <div className={styles.container}>
                <h4>트위치 목록</h4>
            </div>
            <div className={styles.carousel}>
                <ul style={{ transform: `translateX(${-currentIndex * 100}%)` }}>
                    {channels.map((channel, index) => (
                        <li key={channel.id} className={index === currentIndex ? styles.active : ''}>
                            <strong>{channel.user_name}</strong> - Views: {channel.viewer_count}
                            <img src={channel.thumbnail_url} alt={`Thumbnail ${index}`}></img>
                        </li>
                    ))}
                </ul>
                <button onClick={handlePrev} className={styles.prevButton}>이전</button>
                <button onClick={handleNext} className={styles.nextButton}>다음</button>
            </div>
        </div>
    );
}

export default Streams;
