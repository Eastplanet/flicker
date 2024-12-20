import React, { useState } from "react";
import starFull from "../assets/review/star.png";
import starHalf from "../assets/review/star_half.png";
import star_outline from "../assets/review/star_outline.png";
import thumbUpOutline from "../assets/review/thumb_up_outline.png";
import thumbUp from "../assets/review/thumb_up.png";
import { ReviewProps } from "../type";
import { likeReview, cancelLikeReview } from "../apis/movieApi";
import DeleteModal from "./DeleteModal";
import Modal from "./common/Modal"; 
import { GrStatusGood } from "react-icons/gr";

const Review: React.FC<ReviewProps> = ({
  review,
  userSeq,
  onDelete,
  onShowMore,
  isDetailPage,
}) => {
  const [showContent, setShowContent] = useState(!review.spoiler);
  const [liked, setLiked] = useState(review.liked);
  const [likes, setLikes] = useState(review.likes);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); 
  const [isLikeErrorModalOpen, setIsLikeErrorModalOpen] = useState(false); 
  const MAX_LENGTH = 250;
  const content = review.content || "";
  const isLongContent = content.length > MAX_LENGTH;
  const [showMore, setShowMore] = useState(false);

  const toggleContent = () => {
    if (review.spoiler) {
      setShowContent((prev) => !prev);
    }
  };

  const handleShowMoreClick = () => {
    if (isDetailPage && onShowMore) {
      onShowMore(review.reviewSeq); 
    } else {
      setShowMore((prev) => !prev);
    }
  };

  // 리뷰 삭제 처리
  const handleDeleteReview = async () => {
    if (onDelete) {
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    try {
      if (onDelete) {
        await onDelete(review.reviewSeq);
        setIsSuccessModalOpen(true); 

        setTimeout(() => {
          window.location.reload(); 
        }, 1500);
      }
    } catch (error) {
      console.error("리뷰 삭제 중 오류 발생:", error);
    } finally {
      setIsDeleteModalOpen(false); // 삭제 모달 닫기
    }
  };

  // 좋아요 버튼 클릭 시 처리
  const handleLikeToggle = async () => {
    try {
      if (liked) {
        await cancelLikeReview(userSeq, review.reviewSeq); 
        setLiked(false);
        setLikes((prevLikes) => prevLikes - 1);
      } else {
        await likeReview(userSeq, review.reviewSeq); 
        setLiked(true);
        setLikes((prevLikes) => prevLikes + 1);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
      setIsLikeErrorModalOpen(true); 
    }
  };

  return (
    <div key={review.reviewSeq} className="border-b border-gray-700 mb-2">
      <div className="flex items-start mt-5">
        <div className="rounded-full bg-gray-500 w-8 h-8 flex items-center justify-center text-white font-bold">
          {review.nickname.charAt(0)}
        </div>
        <div className="ml-4 flex flex-col w-full">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <span className="font-semibold">{review.nickname}</span>
              <span className="text-gray-400 text-sm ml-2">
                's flick record is
              </span>
              <span className="ml-2 text-[#4D7FFF] flex items-center">
                {Array.from(
                  { length: Math.floor(review.reviewRating) },
                  (_, index) => (
                    <img
                      key={index}
                      src={starFull}
                      alt="Full Star"
                      className="w-5 h-5"
                    />
                  )
                )}
                {review.reviewRating % 1 !== 0 && (
                  <img src={starHalf} alt="Half Star" className="w-5 h-5" />
                )}
                {Array.from({ length: 5 - review.reviewRating }, (_, index) => (
                  <img
                    key={index}
                    src={star_outline}
                    alt="empty Star"
                    className="w-5 h-5"
                  />
                ))}
                <span className="ml-2 text-white font-bold" lang="ko">
                  {review.reviewRating}
                </span>
              </span>
            </div>

            <div className="flex items-center">
              {onDelete && (
                <button
                  onClick={handleDeleteReview}
                  className="mr-3 text-white bg-[#44547B] px-2 py-1 rounded-md hover:bg-gray-700 text-sm border-none cursor-pointer"
                >
                  삭제
                </button>
              )}
              <button
                className="flex items-center p-0 bg-transparent border-none outline-none"
                onClick={handleLikeToggle}
              >
                <img
                  src={liked ? thumbUp : thumbUpOutline}
                  alt="Thumb Up"
                  className="w-4 h-4 mr-1"
                />
                <span className=" text-gray-300" lang="ko">
                  {likes}
                </span>
              </button>
            </div>
          </div>

          {showContent ? (
            <>
              <p className="text-white mt-1 mb-1" onClick={toggleContent}>
                {showMore || !isLongContent
                  ? review.content
                  : review.content.slice(0, MAX_LENGTH)}
                {isLongContent && (
                  <button
                    className="text-gray-400 ml-2 underline"
                    onClick={handleShowMoreClick}
                  >
                    {showMore ? "접기" : "더보기"}
                  </button>
                )}
              </p>
            </>
          ) : (
            <p
              className="text-gray-400 cursor-pointer mt-1 mb-1"
              onClick={toggleContent}
            >
              스포일러 내용이 포함되어 있어요! 클릭하면, 내용을 볼 수 있어요.
            </p>
          )}
          <span className="text-gray-400 text-sm self-end mb-1" lang="ko">
            {new Date(review.createdAt).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </span>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onDeleteConfirm={confirmDelete}
          title="리뷰 삭제"
          description="이 리뷰를 삭제하시겠습니까?"
          // icon={cancelLikeReview}
        />
      )}

      {isSuccessModalOpen && (
        <Modal
          onClose={() => setIsSuccessModalOpen(false)}
          title="성공"
          description="리뷰가 성공적으로 삭제되었습니다."
          buttonText="확인"
          icon={GrStatusGood}
          iconColor="#20BD4D"
        />
      )}

      {isLikeErrorModalOpen && (
        <Modal
          onClose={() => setIsLikeErrorModalOpen(false)}
          title="오류"
          description="좋아요 처리 중 오류가 발생했습니다."
          buttonText="확인"
        />
      )}
    </div>
  );
};

export default Review;
