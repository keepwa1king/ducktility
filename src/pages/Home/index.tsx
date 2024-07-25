import { Component } from "solid-js";
import Typography from "../../components/Typography";
import MultiLineText from "../../components/MultiLineText";

import logo from "../../logo.svg";
import puzzle from "../../puzzle.svg";
import puzzles from "../../puzzles.svg";
import ContentLayout from "../../layouts/ContentLayout";

import { A } from "@solidjs/router";

const Home: Component = () => {
  return (
    <ContentLayout backgroundColor="bg-white">
      <div class="flex min-h-screen flex-col items-center justify-end px-5 pb-12">
        <img src={logo} alt="logo" class="h-[55px]" />
        <div class="size-32"></div>
        <_NavBtn
          title="하나의 팀에서 선택하기"
          description="한 그룹에서만 선택해서\n취향표를 만들어요"
          imgSrc={puzzle}
          route="/select"
        />
        <div class="size-5"></div>
        <_NavBtn
          title="여러 팀에서 선택하기"
          description="여러 그룹을 자유롭게 선택해서\n취향표를 만들어요"
          imgSrc={puzzles}
          route="/custom"
        />
        <div class="size-12"></div>
        <Typography variant="caption2" textColor="text-grey-600">
          <a href="/request">추가요청이 있다면 알려주세요!</a>
        </Typography>
        <div class="size-4"></div>
        <Typography variant="caption1" textColor="text-grey-600">
          <a href="https://twitter.com/DevvTyga">@DevvTyga</a>
        </Typography>
      </div>
    </ContentLayout>
  );
};
export default Home;

interface _BtnProps {
  title: string;
  description: string;
  imgSrc: string;
  route: string;
}

function _NavBtn(props: _BtnProps) {
  return (
    <A class="rounded-btn flex h-32 w-full items-center bg-grey-50 py-5 pl-4 pr-9" href={props.route}>
      <div class="flex h-20 w-20 items-center justify-center">
        <img src={props.imgSrc} alt="puzzle" class="h-14" />
      </div>
      <div class="size-3"></div>
      <div class="flex-col">
        <Typography variant="body5" textColor="text-grey-800">
          {props.title}
        </Typography>
        <div class="size-2"></div>
        <Typography as="div" variant="body1" textColor="text-grey-400">
          <MultiLineText text={props.description} />
        </Typography>
      </div>
    </A>
  );
}
