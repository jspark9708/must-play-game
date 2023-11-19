import React, { useState, useEffect } from 'react';
import firebaseApp from '../../service/firebase';
import styles from './review.module.css';

const Review = () => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [isReviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);

  let data = localStorage.getItem('itemData');
  data = JSON.parse(data);

  const userEmail = localStorage.getItem('userEmail');

  //리뷰 작성
  const handleReviewSubmit = () => {
    const emailCheck = localStorage.getItem('emailCheck');

    if (emailCheck === 'true') {
      const gameId = data.gameTitle;

      const reviewData = {
        text: reviewText,
        rating: rating,
        user: localStorage.getItem('userDisplayName'),
        email: localStorage.getItem('userEmail'),
      };

      firebaseApp
        .database()
        .ref(`reviews/${gameId}`)
        .push(reviewData)
        .then(() => {
          setReviewText('');
          setRating(0);
          setReviewSubmitted(true);
          console.log('리뷰 저장 성공');
        })
        .catch((error) => {
          console.error('리뷰 저장 에러:', error);
        });
    } else {
      alert('로그인 후 리뷰를 작성할 수 있습니다.');
    }
  };

  //리뷰 삭제
  const handleReviewDelete = (reviewId) => {
    const gameId = data.gameTitle;
  
    firebaseApp
      .database()
      .ref(`reviews/${gameId}/${reviewId}`)
      .remove()
      .then(() => {
        const updatedReviews = reviews.filter((review) => review.id !== reviewId);
        setReviews(updatedReviews);
        console.log('리뷰 삭제 성공');
        console.log(reviewId, '의 리뷰 삭제를 진행했습니다.');
      })
      .catch((error) => {
        console.error('리뷰 삭제 에러:', error);
      });
  };

  useEffect(() => {
    const gameId = data.gameTitle;
    const reviewsRef = firebaseApp.database().ref(`reviews/${gameId}`);

    reviewsRef.on('value', (snapshot) => {
      const reviewData = snapshot.val();
      if (reviewData) {
        const reviewsArray = Object.entries(reviewData).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setReviews(reviewsArray);
      }
    });

    return () => {
      reviewsRef.off('value');
    };
  }, []);

  return (
    <div>
      <h1>게임 리뷰</h1>
      {isReviewSubmitted ? (
        <p style={{ color: 'green' }}>리뷰가 성공적으로 제출되었습니다!</p>
      ) : (
        <div>
          <label>
            Rating: {rating}
            <input
              type="range"
              min="1"
              max="100"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>
          <textarea
            placeholder="리뷰 작성"
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button onClick={handleReviewSubmit}>리뷰 제출</button>
        </div>
      )}
      <div className={styles.reviewList}>
        <h1>리뷰 목록</h1>
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>
                평점: {review.rating} - 작성자: {review.user}
                {userEmail === review.email && ( // 이 부분을 추가
                  <button onClick={() => handleReviewDelete(review.id)}>삭제</button>
                )}
                </p>
              <p>{review.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Review;
