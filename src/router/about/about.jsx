/* about & contact 페이지 */
import React from "react";
import styles from "./about.module.css";

const About = () => {
  const contactInfo = [
    { label: "GitHub", value: "https://github.com/jspark9708" },
    { label: "GitHub Repo", value: "https://github.com/jspark9708/must-play-game" },
    { label: "Email", value: "flash246@naver.com" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.about}>
        <div>
          <h2>Meta Critic Must Play</h2>
          <div className={styles.meta}>
            <img
              src={`${process.env.PUBLIC_URL}/img/must-play.png`}
              alt="must play game"
            />
            <p>
              게임 평가 및 리뷰 플랫폼에서 특별히 권장하는 게임을 나타냅니다.
              이는 게임 평론가 및 사용자 평가를 종합하여 도출된 결과로, 높은
              품질과 엔터테인먼트가 기대되는 게임을 강조합니다. "Must Play"에
              선정된 게임들은 그들의 독특한 경험, 흥미진진한 스토리, 혹은
              혁신적인 게임 플레이로 주목받고 있습니다. 이러한 추천은 게이머들이
              훌륭한 게임을 선택할 때 유용한 지침으로 활용될 수 있습니다. "Must
              Play"로 선정된 게임은 메타 크리틱 사용자들에게 높은 기대와
              긍정적인 평가를 받아, 게임 커뮤니티에서 큰 주목을 받고 있음을
              의미합니다.
            </p>
          </div>
        </div>
        <div>
          <h2>Must Play Game</h2>
          <div className={styles.mpg}>
            <img
              src={`${process.env.PUBLIC_URL}/img/logo.png`}
              alt="must play game"
            />
            <div>
              <p>
                must play game은 이러한 메타크리틱에서 선정한 최고의 게임들을
                추천해주는 웹 사이트입니다. PC, Playstation, Switch의 플랫폼,
                콘솔로 즐길 수 있는 게임과 이를 통해 경험할 수 있는 유저들간의
                느낌을 공유하고 추천해줄 수 있는 서비스를 이용할 수 있습니다. (본 사이트는 PC환경에서 쾌적하게 이용가능합니다.)
              </p>
              <p>다양한 게임과 유저들의 생생한 후기를 확인해보세요!!</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contact}>
        <div>
          <h2>Contact</h2>
          <div className={styles.contactText}>
            <ul className={styles.contactList}>
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <strong>{info.label}:</strong>{" "}
                  <p>{info.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
