import { Component } from "solid-js";
import Typography from "../../components/Typography";
import MultiLineText from "../../components/MultiLineText";

import logo from "../../assets/logo.svg";
import person from "../../assets/person.svg";
import people from "../../assets/people.svg";
import ContentLayout from "../../layouts/ContentLayout";

import { A } from "@solidjs/router";
import { Link } from "../../components/Link";
import { setAnswers, setItems, setState } from "../../store";

const Home: Component = () => {
  return (
    <div class="bg-white flex h-svh flex-col items-center justify-end px-5 pb-12">
      <img src={logo} alt="logo" class="h-[55px]" />
      <div class="size-16"></div>
      <Typography variant="body1" textColor="text-grey-800" class="text-center">
        편한 덕질을 위한
        <br />
        여러 유틸리티들을
        <br />
        제작하고 있습니다.
      </Typography>
      <div class="size-16"></div>
      <div class="flex w-full flex-row items-center justify-center">
        <_NavBtn
          title="취향표 - 개인용"
          description="나만의 취향표를 제작하고\n저장할 수 있어요!"
          imgSrc={person}
          route="/collage/type/single"
          onClick={() => {
            // answers 초기화
            setAnswers({});

            // items 초기화
            const initialItems = Object.fromEntries(
              Array(9)
                .fill(0)
                .map((_, index) => [index, { title: "", artistMember: null }])
            );
            setItems(initialItems);
          }}
        />
        <div class="size-4"></div>
        <_NavBtn
          title="취향표 - 다인용"
          description="친구들과 함께 취향표를\n제작할 수 있어요!"
          imgSrc={people}
          route="/collage/type/multiple"
          onClick={() => {
            setState({
              questions: Array(9).fill(""),
              users: [
                {
                  name: "",
                  profileImage: null,
                  answers: Array(9).fill({ profileImage: "" })
                },
                {
                  name: "",
                  profileImage: null,
                  answers: Array(9).fill({ profileImage: "" })
                },
              ]
            });
          }}
        />
      </div>
      <div class="size-12"></div>
      <Typography variant="caption2" textColor="text-grey-600">
        <a href="https://forms.gle/1sr9gBPbDn9QFcw48">건의사항은 여기로!</a>
      </Typography>
      <div class="size-4"></div>
    </div>
  );
};
export default Home;

interface _BtnProps {
  title: string;
  description: string;
  imgSrc: string;
  route: string;
  onClick?: () => void;
}

function _NavBtn(props: _BtnProps) {
  return (
    <Link
      class="flex w-[168px] flex-col items-center justify-center rounded-btn bg-grey-50 py-5"
      href={props.route}
      onClick={props.onClick}
    >
      <Typography variant="body5" textColor="text-grey-800">
        {props.title}
      </Typography>
      <div class="size-3"></div>
      <img src={props.imgSrc} alt="icon" class="h-12 w-12" />
      <div class="size-5"></div>
      <Typography as="div" variant="body1" textColor="text-grey-400" class="px-2">
        <MultiLineText text={props.description} />
      </Typography>
    </Link>
  );
}
