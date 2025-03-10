import React, { useState } from "react";
import thumbUpOutline from "../../assets/review/thumb_up_outline.png";
import starFull from "../../assets/review/star.png";
import starHalf from "../../assets/review/star_half.png";
import star_outline from "../../assets/review/star_outline.png";
import "../../css/PhotoCard.css";
import { PhotoCardFrontProps } from "../../type";
import { useNavigate } from "react-router-dom";

const PhotoCardDetailPage: React.FC<{
  card: PhotoCardFrontProps["images"][0] | null;
  handleCloseModal: () => void;
}> = ({ card, handleCloseModal }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const goToMovieDetail = () => {
    if (card !== null) navigate(`/moviedetail/${card.movieSeq}`);
  }
  

  if (!card) {
    return <p>카드 데이터가 없습니다.</p>;
  }

  return (
    <div
      className="w-[450px] h-full photo-card-animation"
      onClick={handleCardClick}
    >
      <div className={`photo-card ${isFlipped ? "flipped" : ""}`}>
        <div className="photo-card-front bg-white p-4 opacity-95 shadow-2xl shadow-black rounded-lg ">
          <img
            src={card.src}
            alt="Front"
            className="w-full h-[550px] object-cover rounded-md"
          />
          <h2 className="text-right text-xl mr-2 mt-4 text-black">
            {card.createdAt.slice(0, 10)}
          </h2>
        </div>

        <div className="photo-card-back bg-white p-10 opacity-95 shadow-xl shadow-neutral-600  rounded-lg relative">
          <img
            src="/assets/common/x.png"
            alt="Back Button"
            className="w-4 h-4 absolute top-4 right-4 cursor-pointer hover:opacity-70"
            onClick={handleCloseModal}
          />
          <h2 className="text-center text-xl italic mb-3 text-black">
            My Photo Card
          </h2>
          <hr className="mb-2 border-gray-600" />
          <p className="text-center text-sm mb-2 text-black" lang="ko">
            {card.movieYear}
          </p>
          <div className="relative group">
            <h1 className="text-center text-2xl font-bold mb-2 text-black">
              {card.movieTitle}
            </h1>
            <div className="flex justify-end">
              <div
                className="text-neutral-600 text-xs mb-1 underline hover:text-black cursor-pointer ml-auto"
                onClick={goToMovieDetail}
              >
                영화 상세페이지
              </div>
            </div>
          </div>
          <hr className="mb-6 border-gray-600" />
          <div className="flex items-center justify-center mb-6">
            {Array.from({ length: 5 }, (_, index) => {
              const fullStars = Math.floor(card.reviewRating);
              const hasHalfStar = card.reviewRating % 1 !== 0;

              if (index < fullStars) {
                return (
                  <img
                    key={index}
                    src={starFull}
                    alt="Star"
                    className="w-7 h-7 ml-1"
                  />
                );
              } else if (index === fullStars && hasHalfStar) {
                return (
                  <img
                    key={index}
                    src={starHalf}
                    alt="Half Star"
                    className="w-7 h-7 ml-1"
                  />
                );
              } else {
                return (
                  <img
                    key={index}
                    src={star_outline}
                    alt="Star Outline"
                    className="w-7 h-7 ml-1"
                  />
                );
              }
            })}
            <span className="ml-3 text-2xl text-black font-bold" lang="ko">
              {card.reviewRating.toFixed(1)}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2 ml-2 text-black text-lg italic">
              info
            </h3>
            <div
              className="border border-gray-500 rounded-sm p-4 text-black font-semibold"
              lang="ko"
            >
              <p>{card.createdAt.slice(0, 10).replace(/-/g, ".")}</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold ml-2 mb-2 text-black text-lg italic">
                my review
              </h3>
              <div className="flex items-center mr-1">
                <img
                  src={thumbUpOutline}
                  alt="Thumb Up"
                  className="w-5 h-5 mr-1 cursor-pointer"
                />
                <span className="text-gray-600 font-semibold" lang="ko">
                  {card.likes}
                </span>
              </div>
            </div>
            <div className="border border-gray-500 rounded-sm p-4 text-black font-semibold leading-relaxed">
              <p>{card.content}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 bottom-0 w-[100px] h-[100px] hover-trigger"></div>
    </div>
  );
};

export default PhotoCardDetailPage;
