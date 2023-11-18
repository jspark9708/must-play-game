import React, { useEffect, useState } from "react";
import firebaseApp from '../../service/firebase'; // firebase.js 파일의 경로에 맞게 수정

const Review = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const user = firebaseApp.auth().currentUser;

    const updateUserProfile = () => {
      if (user) {
        setUserProfile({
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          // You can also add other desired user information.
        });
      }
    };

    // Update user profile initially
    updateUserProfile();

    // Subscribe to changes in the authentication state
    const unsubscribe = firebaseApp.auth().onAuthStateChanged((updatedUser) => {
      updateUserProfile();
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array means this effect will only run once and on unmount

  return (
    <div>
      <h2>Detail Page</h2>
      {userProfile && (
        <div className="test">
          <img src={userProfile.photoURL} alt="Profile" />
          <p>Email: {userProfile.email}</p>
          <p>Nickname: {userProfile.displayName}</p>
          {/* 기타 원하는 사용자 정보 출력 */}
        </div>
      )}
      {/* 로그인하지 않았을 경우에 대한 처리도 추가 가능 */}
    </div>
  );
};

export default Review;