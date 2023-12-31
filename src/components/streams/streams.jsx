import React, { useEffect, useState } from "react";
import styles from "./streams.module.css";
import api from "../../service/api";
import InfoIcon from "@mui/icons-material/Info";

function Streams() {
  const [channels, setChannels] = useState([]);
  const [twitchGameName, setTwitchGameName] = useState("");

  const data = JSON.parse(localStorage.getItem("itemData"));

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const gameResponse = await api.get(
          "https://api.twitch.tv/helix/games",
          {
            params: {
              id: data.gameId,
            },
          }
        );
        const gameName = gameResponse.data.data[0]?.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/:/g, "")
          .replace(/'/g, "");
        setTwitchGameName(gameName);
        console.log(gameName);

        const response = await api.get("https://api.twitch.tv/helix/streams", {
          params: {
            game_id: data.gameId,
            first: 10,
          },
        });

        const modifiedData = await Promise.all(
          response.data.data.map(async (game) => {
            const userResponse = await api.get(
              "https://api.twitch.tv/helix/users",
              {
                params: {
                  id: game.user_id,
                },
              }
            );

            const profileImageUrl =
              userResponse.data.data[0]?.profile_image_url;

            return {
              ...game,
              thumbnail_url: game.thumbnail_url
                .replace("{width}", "440")
                .replace("{height}", "248"), //트위치 규격 썸네일 크기
              profile_image_url: profileImageUrl,
            };
          })
        );

        console.log(modifiedData);
        setChannels(modifiedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchChannels();
  }, [data.gameId]);


  const toTwitch = (channel) => {
    const twitchUrl = `https://twitch.tv/${channel.user_login}`;
    window.open(twitchUrl, '_blank');
  };

  return (
    <div>
      <div className={styles.componentArea}>
        <div className={styles.contentsTitle}>
          <h2>관련 방송</h2>
          <div className={styles.samerow}>
            <InfoIcon sx={{fontSize:13}}/>
            <p>현재 트위치에서 방송중인 상위 10개의 스트림을 보여드립니다.</p>
          </div>
        </div>
        <div className={styles.streamContainer}>
          {channels.length === 0 ? (
            <div className={styles.forNone}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"
                />
              </svg>
              <p>현재 {data.gameTitle}을(를) 방송중인 스트리머가 없습니다.</p>
            </div>
          ) : (
            <ul>
              {channels.map((channel, index) => (
                <li key={channel.id} onClick={() => toTwitch(channel)}>
                  <div className={styles.thumbnail}>
                    <img
                      src={channel.thumbnail_url}
                      alt={`Thumbnail ${index}`}
                    ></img>
                    <div className={styles.liveInfo}>
                      <div>
                        <span>생방송</span>
                      </div>
                      <div>
                        <p>
                          시청자 {channel.viewer_count.toLocaleString("ko-KR")}
                          명
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.streamerInfo}>
                    <img
                      src={channel.profile_image_url}
                      alt="Streamer Profile"
                    ></img>
                    <div className={styles.streamerInfoText}>
                      <strong>{channel.title}</strong>
                      <p>{channel.user_name}</p>
                    </div>
                  </div>
                </li>
              ))}
              <li>
                <div className={styles.twitchButton}>
                  <a
                    href={`https://twitch.tv/directory/category/${twitchGameName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"
                      />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Streams;
