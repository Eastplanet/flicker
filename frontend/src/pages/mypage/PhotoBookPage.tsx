import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import photobook from "/assets/photobook/photobook.png";
import "../../css/PhotoBook.css";
import { useUserQuery } from "../../hooks/useUserQuery";
import photobookmain from "/assets/background/photobookmain.png";

const PhotoBookPage: React.FC = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useUserQuery();
  if (!data) return <p>유저 정보가 없습니다.</p>;
  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>유저 정보를 불러오는데 실패했습니다.</p>;

  const goToPhotoCard = () => {
    const sidebarElement = document.querySelector(".SideBar") as HTMLElement;
    if (sidebarElement) {
      sidebarElement.style.transition = "opacity 0.3s ease";
      sidebarElement.style.opacity = "0";
    }

    const photobookElement = document.querySelector(
      ".photobook-img"
    ) as HTMLElement;
    const textElements = document.querySelectorAll(
      ".photobook-text"
    ) as NodeListOf<HTMLElement>;
    const coverImageElement = document.querySelector(
      ".cover-image"
    ) as HTMLElement;

    if (photobookElement) {
      photobookElement.classList.add("book-animation-out");
    }
    textElements.forEach((textElement) => {
      textElement.classList.add("text-animation-out");
    });
    if (coverImageElement) {
      coverImageElement.classList.add("cover-animation-out");
    }

    setTimeout(() => {
      navigate("/photocard");
    }, 400);
  };

  return (
    <div className="bg-black w-full min-h-screen flex flex-col items-center justify-center  overflow-hidden">
      <header className="w-full fixed top-0 z-50">
        <Navbar />
      </header>

      <div
        className="relative cursor-pointer mt-16 hover:scale-105 taransition-transform duration-300 ese-in-out"
        onClick={goToPhotoCard}
      >
        
        <img
          src={photobook}
          alt="photobook"
          className="photobook-img w-[1000px] mx-auto"
          decoding="async"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center pl-32 pb-10">
          <h1 className="photobook-text text-5xl font-bold italic text-black mb-4">
            MOVIE MEMORIES
          </h1>
          <hr className="photobook-text border-t-2 border-neutral-500 my-1 w-3/5" />
          <hr className="photobook-text border-t-2 border-neutral-500 my-1 w-3/5" />
          <p className="photobook-text text-lg italic mt-3 text-black text-right self-end mr-60">
            made by {data.nickname}
          </p>
          <img
            src={photobookmain}
            alt="Cover Image"
            className="cover-image w-3/5 h-1/2 mt-10"
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoBookPage;
