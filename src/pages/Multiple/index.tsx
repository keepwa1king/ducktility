import { Component, For, createMemo } from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router";
import Typography from "../../components/Typography";
import arrow from "../../assets/arrow_back.svg";
import ContentLayout from "../../layouts/ContentLayout";
import SelectButton from "../../components/SelectButton";
import Button from "../../components/Button";
import { addUser, setState, state } from "../../store";
import TextInput from "../../components/TextInput";
import MultipleForm from "../../components/MultipleForm";
import { produce } from "solid-js/store";
import add from "../../assets/add_white.svg";

const Multiple: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 모든 항목이 채워졌는지 확인하는 메모
  const allItemsFilled = createMemo(() => {
    return (
      Object.values(state.users).every((user) => user.name && user.profileImage) &&
      Object.values(state.questions).every((question) => question !== "") &&
      Object.values(state.users).every((user) => user.answers.every((answer) => answer.profileImage !== ""))
    );
  });

  // 완료 버튼 클릭 핸들러
  const handleComplete = () => {
    if (allItemsFilled()) {
      navigate("/collage/type/multipleresult");
    }
  };
  const backPath = () =>
    (location.state as { previous?: string })?.previous && (location.state as { previous?: string })?.previous != "/"
      ? -1
      : "/";

  const handleExit = () => {
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
        }
      ]
    });

    // 홈으로 navigate
    navigate(backPath().toString(), {
      replace: true
    });
  };

  return (
      <div class="flex h-full min-h-screen bg-white w-full flex-col items-start justify-start pb-24">
        <div class="flex w-full flex-col bg-white">
          <div class="w-full bg-white px-2 pb-3 pt-5">
            <button onClick={() => handleExit()}>
              <img src={arrow} alt="back button" class="h-9 w-9" />
            </button>
          </div>
          <div class={allItemsFilled() ? "h-1 w-full bg-black" : "h-1 w-1/2 bg-black"}></div>
        </div>
        <div class="flex flex-col justify-center px-5 py-7 w-full">
          <div class="flex flex-col items-center">
            <MultipleForm />
            {state.users.length < 7 && state.questions.every((q) => q !== "") && (
              <button
                onClick={addUser}
                class="flex items-center justify-center rounded bg-ourBlue px-[10px] py-[5.5px] text-white"
              >
                <img src={add} alt="add" class="h-6" />
                <div class="size-1"></div>
                <Typography variant="body3" textColor="text-white">
                  사람 추가하기
                </Typography>
              </button>
            )}
          </div>
        </div>

        <Button variant={allItemsFilled() ? "active" : "unactive"} onClick={handleComplete}>
          완료
        </Button>
      </div>
  );
};

export default Multiple;
