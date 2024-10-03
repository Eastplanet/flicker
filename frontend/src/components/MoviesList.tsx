import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperInstance, NavigationOptions } from "swiper/types";
import { useNavigate } from "react-router-dom";
import { MoviesListProps } from "../type";
import "../css/MovieList.css"; // css 파일에서 hover 애니메이션 적용

const MoviesList: React.FC<MoviesListProps> = ({ category, movies }) => {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  );
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation = {
        ...(swiperInstance.params.navigation as NavigationOptions),
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      };

      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();

      swiperInstance.on("slideChange", () => {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
      });

      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    }
  }, [swiperInstance]);

  const handleSwiper = (swiper: SwiperInstance) => {
    setSwiperInstance(swiper);
    swiper.on("slideChange", () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    });

    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handlePrevClick = () => {
    if (swiperInstance && !isBeginning) {
      swiperInstance.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperInstance && !isEnd) {
      swiperInstance.slideNext();
    }
  };

  const goToDetail = (movieSeq: number) => {
    navigate(`/moviedetail/${movieSeq}`);
  };

  return (
    <div className="relative h-[300px] w-[1800px] flex-shrink-0 mb-[100px]">
      <h3 className="text-white mb-[10px] text-[27px] ml-[50px] mt-[20px]">
        {category}
      </h3>

      {!isBeginning && (
        <div
          ref={prevRef}
          className="swiper-button-prev-custom"
          onClick={handlePrevClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={4}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
      )}

      {!isEnd && (
        <div
          ref={nextRef}
          className="swiper-button-next-custom"
          onClick={handleNextClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={4}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}

      <Swiper
        slidesPerView={8}
        spaceBetween={20}
        slidesOffsetBefore={50}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        onSwiper={handleSwiper}
        modules={[Navigation, Pagination]}
      >
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.movieSeq}
            className="flex justify-center items-center mt-4 card-wrapper" // 카드 스타일 추가
          >
            <div className="card">
              <div className="poster">
                <img
                  src={movie.moviePosterUrl}
                  alt={`Movie ${movie.movieSeq}`}
                  onClick={() => goToDetail(movie.movieSeq)}
                  className="card-poster"
                />
              </div>
              <div className="details">
                <h1 className="text-[20px]">{movie.movieTitle}</h1>
                <div>{`${movie.movieYear} • ${movie.runningTime} • ${movie.audienceRating}`}</div>
                <div className="rating">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={
                        index + 1 <= movie.movieRating
                          ? "fas fa-star"
                          : "far fa-star"
                      }
                    ></i>
                  ))}
                  <span>{movie.movieRating}/5</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoviesList;
