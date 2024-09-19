// src/Pages/ContactPage.tsx
import React from "react";
import Navbar from "../../components/common/Navbar";
import Member from "../../components/Member";

const ContactPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white pb-10">
      {/* NavBar 고정 */}
      <header className="sticky top-0 bg-transparent z-10">
        <Navbar />
      </header>

      {/* 팀 소개 영역 */}
      <section className="flex flex-col items-center justify-center mt-28 space-y-10 px-80 mb-12">
        <div className="flex items-center justify-center space-x-10">
          {/* 팀 이미지 */}
          <img
            src="https://via.placeholder.com/500x300"
            alt="Team"
            className="w-96 h-60 object-cover"
          />
          {/* 팀 설명 */}
          <div className="text-left">
            <h1 className="text-[50px] font-bold">
              Hello, We are "
              <span className="text-[#4D7FFF]">6 CAN DO IT !</span>"
            </h1>
            <p className="mt-6 text-2xl">
              We made movie recommendation service called by Flicker. We always
              do our best to make sure our users can be 100% satisfied. Blah
              blah blah (we have to add more explanation !!)
            </p>
          </div>
        </div>
      </section>

      {/* Meet Expert Team 영역 */}
      <section className="mt-16 text-center px-80">
        <p className="text-[25px] text-[#4D7FFF]">our team</p>
        <h2 className="text-[50px] font-bold">
          Meet Expert <span className="text-[#4D7FFF]">Team.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          <Member
            name="HaHyul Kim"
            role="Frontend"
            description="담당했던 작업, 간단한 자기소개"
            githubUrl="https://github.com/busangangster"
            emailUrl="gkgbf1034@gmail.com"
          />
          <Member
            name="JiHwan Gong"
            role="Backend"
            description="담당했던 작업, 간단한 자기소개"
            githubUrl="https://github.com/izgnok"
            emailUrl="rinch12332@gmail.com"
          />{" "}
          <Member
            name="HyunJeong Cho"
            role="Frontend"
            description="담당했던 작업, 간단한 자기소개"
            githubUrl="https://github.com/hyunjeongg11"
            emailUrl="guswjd4585@gmail.com"
          />
          <Member
            name="DongGyu Oh"
            role="Backend"
            description="담당했던 작업, 간단한 자기소개"
            githubUrl="https://github.com/Eastplanet"
            emailUrl="ehdrb1645@gmail.com"
          />{" "}
          <Member
            name="JaeChan Lee"
            role="Infra"
            description="담당했던 작업, 간단한 자기소개"
            githubUrl="https://github.com/jaechanjj"
            emailUrl="jaechanjj@gmail.com"
          />
          <Member
            name="JaeYoung Choi"
            role="Backend"
            description="담당했던 작업, 간단한 자기소개"
            githubUrl="https://github.com/wodyddldl333"
            emailUrl="wodyddldl333@naver.com"
          />{" "}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
