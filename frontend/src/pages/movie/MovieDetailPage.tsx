import React, { useState, useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Navbar from "../../components/common/Navbar";
import MoviesList from "../../components/MoviesList";
import { useNavigate } from "react-router-dom";

const MovieDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const [isFilled, setIsFilled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [interestOption, setInterestOption] = useState("관심 없음");

  const actors = [
    "Tom Cruise",
    "Miles Teller",
    "Monica Barbaro",
    "Lewis Pullman",
    "Jay Eills",
    "Danny Ramirez",
    "Glem Powell",
    "Kara Wang",
    "Greg Tarzan Davis",
    "Bashir Salahuddin",
    "Jon Hamm",
    "Tom Cruise",
    "Miles Teller",
    "Monica Barbaro",
    "Lewis Pullman",
    "Jay Eills",
    "Danny Ramirez",
  ];

  const movieImg = [
    "/assets/survey/image1.jpg",
    "/assets/survey/image2.jpg",
    "/assets/survey/image3.jpg",
    "/assets/survey/image4.jpg",
    "/assets/survey/image5.jpg",
    "/assets/survey/image6.jpg",
    "/assets/survey/image7.jpg",
    "/assets/survey/image8.jpg",
    "/assets/survey/image9.jpg",
    "/assets/survey/image10.jpg",
    "/assets/survey/image11.jpg",
    "/assets/survey/image12.jpg",
    "/assets/survey/image13.jpg",
  ];

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };

  const goToReview = () => {
    navigate("/review");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = () => {
    setInterestOption((prev) =>
      prev === "관심 없음" ? "관심 없음 취소" : "관심 없음"
    );
    setIsDropdownOpen(false);
  };

  // 드롭다운 외부 클릭 시 닫히도록 설정
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col bg-black h-screen overflow-y-auto">
      <div className="relative h-auto">
        {/* 배경 이미지 영역 */}
        <div
          className="absolute inset-0 h-[650px] w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/background/topgun-bg.png')" }}
        >
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>
        {/* Header with Navbar */}
        <header className="sticky top-0 bg-transparent z-20">
          <Navbar />
        </header>
        {/* Top section */}
        <div className="relative flex items-end text-white p-3 w-[1100px] h-[480px] bg-transparent ml-[50px] mt-[100px] overflow-hidden">
          {/* Left Section: Movie Poster and Details */}
          <div className="flex flex-col lg:flex-row">
            <img
              src="/assets/background/topgun-poster.jpg"
              alt="Movie Poster"
              className="w-[270px] h-[410px] shadow-md border"
            />
            <div className="mt-4 ml-[60px] flex-1">
              <div className="flex">
                <h2 className="text-4xl font-bold flex items-center">
                  탑건: 매버릭
                  <span className="flex items-end ml-4">
                    <span className="text-blue-500 text-2xl">⭐</span>
                    <span className="text-2xl">4.1</span>
                  </span>
                </h2>
                <div
                  className="flex items-end ml-[400px] relative"
                  ref={dropdownRef}
                >
                  <svg
                    className={`w-6 h-6 cursor-pointer ${
                      isFilled
                        ? "fill-red-500"
                        : "fill-none stroke-red-500 stroke-[2px]"
                    }`}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={toggleHeart}
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <button
                    className="text-white text-3xl ml-2 relative"
                    onClick={toggleDropdown}
                  >
                    ⋮
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-gray-200 text-black bg-opacity-90 rounded-md shadow-lg z-50 font-bold text-left">
                        <div
                          className="cursor-pointer px-4 py-2 text-base hover:bg-gray-400 rounded-md hover:bg-opacity-80 shadow-lg z-50"
                          onClick={handleOptionClick}
                        >
                          {interestOption}
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              <p className="mt-6 text-lg">
                최고의 파일럿이자 전설적인 인물 매버릭(톰 크루즈)은 자신이
                졸업한 훈련학교 교관으로 발탁된다. 그의 명성을 모르던 팀원들은
                매버릭의 지시를 무시하지만 실전을 방불케 하는 상공 훈련에서
                눈으로 봐도 믿기 힘든 전설적인 조종 실력에 모두가 압도된다.
                매버릭의 지휘아래 견고한 팀워크를 쌓아가던 팀원들에게 국경을
                뛰어넘는 위험한 임무가 주어지자 매버릭은 자신이 가르친 동료들과
                함께 마지막이 될 지 모를 하늘 위 비행에 나서는데…
              </p>

              <div className="flex w-full h-[40px] bg-transparent border-b border-opacity-50 border-white text-white justify-start items-center space-x-4 mt-4">
                <div className="font-bold text-[18px]">배우</div>
                <div className="font-bold text-[18px]">감독</div>
                <div className="font-bold text-[18px]">장르</div>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {actors.map((actor, index) => (
                  <span
                    key={index}
                    className="relative px-3 py-1 text-[15px] rounded-[5px] text-white bg-black bg-opacity-70 z-10" // z-index: 10, 네비게이션 바보다 낮음
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 리뷰 섹션 */}
      <div className="flex">
        <div className="p-4 bg-black text-black w-[800px] h-[400px] mt-[100px] ml-[150px] border-b border-white">
          <div className="flex w-[800px] justify-between">
            <h3 className="text-2xl font-bold text-white">Reviews</h3>
            <div
              className="text-white flex ml-auto items-end cursor-pointer italic underline"
              onClick={goToReview}
            >
              more
            </div>
          </div>
          <div className="mt-4 space-y-4 text-white text-[14px]">
            <div className="flex items-start space-x-2">
              <div className="bg-gray-800 w-8 h-8 flex items-center justify-center rounded-full">
                <span className="text-white font-bold">B</span>
              </div>
              <p className="flex-1 ">
                <strong>busangangstar</strong> • 5.0 ⭐️
                <br />
                탑건1(1986년)의 36년만의 나온 속편. 매우 만족 스러웠고 매우
                재밌었다 무조건 특별관에서 봐야되는 영화 2022년 개봉작
                영화중에서 범죄도시2 이후 2번째로 엄청 좋았던 영화 톰 크루즈
                미모는 여전히 잘생겼다 1편을 보고 가야되는 질문에서 답을 하자면
                1편 보고 가는게 더 좋다 감동도 2배 더 느낄 수 있음
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="bg-gray-800 w-8 h-8 flex items-center justify-center rounded-full">
                <span className="text-white font-bold">J</span>
              </div>
              <p className="flex-1">
                <strong>jaechan</strong> • 4.5 ⭐️
                <br />
                영화관에서 영화관에서 탑건 보고 집에 가려고 차 핸들 잡는데 F-18
                탄것도 아니면서 쓸데없이 비장해짐 보고 집에 가려고 할 때 듣는
                느낌...
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="bg-gray-800 w-8 h-8 flex items-center justify-center rounded-full">
                <span className="text-white font-bold">B</span>
              </div>
              <p className="flex-1 ">
                <strong>busangangstar</strong> • 5.0 ⭐️
                <br />
                탑건1(1986년)의 36년만의 나온 속편. 매우 만족 스러웠고 매우
                재밌었다 무조건 특별관에서 봐야되는 영화 2022년 개봉작
                영화중에서 범죄도시2 이후 2번째로 엄청 좋았던 영화 톰 크루즈
                미모는 여전히 잘생겼다 1편을 보고 가야되는 질문에서 답을 하자면
                1편 보고 가는게 더 좋다 감동도 2배 더 느낄 수 있음
              </p>
            </div>
          </div>
        </div>

        {/* 트레일러 섹션 */}
        <div className="w-[700px] bg-black text-white flex justify-center items-center m-4 p-4 h-[400px] ml-[50px] mt-[100px]">
          <div className="relative w-full max-w-4xl h-full">
            <iframe
              src="https://www.youtube.com/embed/qSqVVswa420?autoplay=1&mute=1"
              title="YouTube video player"
              className="w-full h-full rounded-lg shadow-md"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
              <svg className="w-12 h-12" />
            </button>
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-3 py-1 rounded-br-lg">
              절찬 상영중
            </div>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-[1700px] flex-shrink-0 mb-[100px] mt-[20px]">
        <MoviesList
          category="탑건: 매버릭과 유사한 장르 작품들"
          movieImg={movieImg}
        />
      </div>
    </div>
  );
};

export default MovieDetailPage;
