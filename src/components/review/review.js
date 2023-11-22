import React, { useState, useEffect } from "react";
import firebaseApp from "../../service/firebase";
import styles from "./review.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "../slider/slider.js";

const Review = () => {
  const [reviewState, setReviewState] = useState({
    reviewText: "",
    rating: 0,
    isReviewSubmitted: false,
    reviews: [],
    currentLength: 0,
    isModalOpen: false,
    filter: "all",
    sort: "desc",
  });

  const { reviewText, rating, isReviewSubmitted, reviews, currentLength, isModalOpen, filter, sort } = reviewState;

  const data = JSON.parse(localStorage.getItem("itemData"));
  const userEmail = localStorage.getItem("userEmail");

  const handleReviewSubmit = () => {
    const emailCheck = localStorage.getItem("emailCheck");

    if (emailCheck === "true") {
      const gameId = data.gameTitle;

      const reviewData = {
        text: reviewText,
        rating: rating,
        user: localStorage.getItem("userDisplayName"),
        email: localStorage.getItem("userEmail"),
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };

      firebaseApp
        .database()
        .ref(`reviews/${gameId}`)
        .push(reviewData)
        .then(() => {
          setReviewState((prevState) => ({
            ...prevState,
            reviewText: "",
            rating: 0,
            isReviewSubmitted: true,
          }));
          console.log("리뷰 저장 성공");
        })
        .catch((error) => {
          console.error("리뷰 저장 에러:", error);
        });
    } else {
      alert("로그인 후 리뷰를 작성할 수 있습니다.");
      console.log("로그인 후 리뷰를 작성할 수 있습니다.");
    }
  };

  const handleReviewDelete = (reviewId) => {
    const gameId = data.gameTitle;

    firebaseApp
      .database()
      .ref(`reviews/${gameId}/${reviewId}`)
      .remove()
      .then(() => {
        const updatedReviews = reviews.filter((review) => review.id !== reviewId);
        setReviewState((prevState) => ({ ...prevState, reviews: updatedReviews }));
        console.log("리뷰 삭제 성공");
        console.log(reviewId, "의 리뷰 삭제를 진행했습니다.");
      })
      .catch((error) => {
        console.error("리뷰 삭제 에러:", error);
      });
  };

  useEffect(() => {
    const gameId = data.gameTitle;
    const reviewsRef = firebaseApp.database().ref(`reviews/${gameId}`);

    const updateReviews = (snapshot) => {
      const reviewData = snapshot.val();
      if (reviewData) {
        const reviewsArray = Object.entries(reviewData).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setReviewState((prevState) => ({ ...prevState, reviews: reviewsArray }));
      }
    };

    reviewsRef.on("value", updateReviews);

    return () => {
      reviewsRef.off("value", updateReviews);
    };
  }, [data.gameTitle]);

  const openModal = () => {
    setReviewState((prevState) => ({
      ...prevState,
      isModalOpen: true,
    }));
  };

  const closeModal = () => {
    setReviewState((prevState) => ({
      ...prevState,
      reviewText: "",
      currentLength: 0,
      isModalOpen: false,
      isReviewSubmitted: false,
    }));
  };

  const handleRatingChange = (rating) => {
    setReviewState((prevState) => ({ ...prevState, rating }));
  };

  useEffect(() => {
    const gameId = data.gameTitle;
    const reviewsRef = firebaseApp.database().ref(`reviews/${gameId}`);

    const updateReviews = (snapshot) => {
      const reviewData = snapshot.val();
      if (reviewData) {
        const reviewsArray = Object.entries(reviewData).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setReviewState((prevState) => ({ ...prevState, reviews: reviewsArray }));

        const reviewCount = reviewsArray.length;
        const averageRating =
          reviewCount > 0
            ? reviewsArray.reduce((sum, review) => sum + review.rating, 0) / reviewCount
            : 0;
        const ratingsCount = Array.from({ length: 11 }, (_, index) => reviewsArray.filter(review => review.rating === index).length);

        setReviewOverviewData({
          reviewCount,
          averageRating,
          ratingsCount,
        });
      } else {
        setReviewOverviewData({
          reviewCount: 0,
          averageRating: 0,
          ratingsCount: Array(11).fill(0),
        });
      }
    };

    reviewsRef.on("value", updateReviews);

    return () => {
      reviewsRef.off("value", updateReviews);
    };
  }, [data.gameTitle]);

  const [reviewOverviewData, setReviewOverviewData] = useState({
    reviewCount: 0,
    averageRating: 0,
    ratingsCount: Array(11).fill(0),
  });

  const getBarColor = (score) => {
    if (score >= 1 && score <= 3) {
      return "#ff6874"; // 1점부터 3점까지 빨간색
    } else if (score >= 4 && score <= 7) {
      return "#ffbd3f"; // 4점부터 7점까지 노란색
    } else if (score >= 8 && score <= 10) {
      return "#00ce7a"; // 8점부터 10점까지 초록색
    } else {
      return "gray"; // 그 외의 경우 회색
    }
  };

  const handleFilter = (filterType) => {
    setReviewState((prevState) => ({ ...prevState, filter: filterType }));
  };

  const handleSort = (event) => {
    setReviewState((prevState) => ({ ...prevState, sort: event.target.value }));
  };

  const filteredReviews = reviews.filter((review) => {
    switch (filter) {
      case "all":
        return true;
      case "positive":
        return review.rating >= 8;
      case "mixed":
        return review.rating >= 4 && review.rating <= 7;
      case "negative":
        return review.rating <= 3;
      default:
        return true;
    }
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sort) {
      case "asc":
        return a.rating - b.rating;
      case "desc":
        return b.rating - a.rating;
      case "registration":
        console.log(a.date, b.date);
        return a.date.localeCompare(b.date);//오류 존재
        // TODO: 날짜가 같으면 시간 비교를 수행하여 더 정확한 정렬이 필요
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className={styles.componentArea}>
        <div className={styles.contentsTitle}>
          <h2>유저 리뷰</h2>
          <button type="button" onClick={openModal}>
            리뷰 남기기
          </button>
        </div>
        {isModalOpen && (
          <div className={styles.modalBg}>
            <div className={styles.modal}>
              {isReviewSubmitted ? (
                <div>
                  <div className={styles.closeBtn}>
                    <button onClick={closeModal}>
                      <CloseIcon />
                    </button>
                  </div>
                  <p style={{ color: "green" }}>리뷰가 성공적으로 제출되었습니다!</p>
                </div>
              ) : (
                <div className={styles.modalContents}>
                  <div className={styles.closeBtn}>
                    <button onClick={closeModal}>
                      <CloseIcon />
                    </button>
                  </div>
                  <h2>리뷰 남기기</h2>
                  <div className={styles.container}>
                    <div className={styles.banner}>
                      <img src={data.gameCover} alt="gameCover"></img>
                      <p>
                        <span style={{ fontWeight: "bold" }}>{data.gameTitle}</span>
                        에 대한 리뷰를 남겨주세요!
                      </p>
                    </div>
                    <div className={styles.sliderContainer}>
                      <Slider onRatingChange={handleRatingChange} />
                    </div>
                    <div className={styles.textareaContainer}>
                      <textarea
                        placeholder="이곳에 리뷰를 작성해주세요"
                        rows={4}
                        value={reviewText}
                        onChange={(e) => {
                          const inputText = e.target.value;
                          if (inputText.length <= 200) {
                            setReviewState((prevState) => ({ ...prevState, reviewText: inputText, currentLength: inputText.length }));
                          }
                        }}
                        maxLength={200}
                      />
                      <p>{currentLength}/200</p>
                    </div>
                    <div className={styles.buttonSet}>
                      <button onClick={closeModal}>작성 취소</button>
                      <button onClick={handleReviewSubmit}>리뷰 제출</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <div className={styles.reviewContainer}>
          <div className={styles.overview}>
            <div className={styles.scoreOverview}>
              <div className={styles.userScore}>
                <h3>유저 평점</h3>
                <div className={styles.userAver}>
                  <p>
                    {reviewOverviewData.averageRating.toFixed(1) >= 1 &&
                    reviewOverviewData.averageRating.toFixed(1) < 2
                      ? "매우 부정적"
                      : reviewOverviewData.averageRating.toFixed(1) >= 2 &&
                        reviewOverviewData.averageRating.toFixed(1) < 4
                      ? "대체로 부정적"
                      : reviewOverviewData.averageRating.toFixed(1) >= 4 &&
                        reviewOverviewData.averageRating.toFixed(1) < 7
                      ? "보통"
                      : reviewOverviewData.averageRating.toFixed(1) >= 7 &&
                        reviewOverviewData.averageRating.toFixed(1) < 9
                      ? "대체로 긍정적"
                      : "매우 긍정적"}
                  </p>
                </div>
              </div>
              <div
                className={styles.scoreOverlay}
                style={{
                  backgroundColor:
                    reviewOverviewData.averageRating.toFixed(1) >= 1 &&
                    reviewOverviewData.averageRating.toFixed(1) < 4
                      ? "#ff6874" // red
                      : reviewOverviewData.averageRating.toFixed(1) >= 4 &&
                        reviewOverviewData.averageRating.toFixed(1) < 7
                      ? "#ffbd3f" // orange
                      : "#00ce7a", // green
                }}
              >
                {reviewOverviewData.averageRating.toFixed(1)}
              </div>
            </div>
            <div className={styles.reviewOverview}>
              <div>
                <div className={styles.reviewGraph}>
                  {reviewOverviewData.ratingsCount.map((count, index) => (
                    <div
                      key={index}
                      className={styles.progressBar}
                      style={{
                        width: `${(count / reviewOverviewData.reviewCount) * 100}%`,
                        backgroundColor: getBarColor(index),
                      }}
                    ></div>
                  ))}
                </div>
                <div className={styles.reviewSum}>
                  <p>부정적 {reviewOverviewData.ratingsCount.slice(1, 4).reduce((sum, count) => sum + count, 0)}명</p>
                  <p>보통 {reviewOverviewData.ratingsCount.slice(4, 8).reduce((sum, count) => sum + count, 0)}명</p>
                  <p>긍정적 {reviewOverviewData.ratingsCount.slice(8, 11).reduce((sum, count) => sum + count, 0)}명</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.reviewList}>
            <div className={styles.functionBtnContainer}>
              <div className={styles.filterBtn}>
                <button onClick={() => handleFilter("all")}>모든 리뷰 보기</button>
                <button onClick={() => handleFilter("positive")}>긍정적 리뷰 보기</button>
                <button onClick={() => handleFilter("mixed")}>복합적 리뷰 보기</button>
                <button onClick={() => handleFilter("negative")}>부정적 리뷰 보기</button>
              </div>
              <div className={styles.sortBtn}>
                <select value={sort} onChange={handleSort}>
                  <option value="asc">낮은 순</option>
                  <option value="desc">높은 순</option>
                  <option value="registration">등록 순</option>
                </select>
              </div>
            </div>
            <ul>
              {sortedReviews.map((review) => (
                <li key={review.id}>
                  <p>
                    평점: {review.rating} - 작성자: {review.user} - 날짜: {review.date}
                    {userEmail === review.email && (
                      <button onClick={() => handleReviewDelete(review.id)}>삭제</button>
                    )}
                  </p>
                  <p>{review.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
