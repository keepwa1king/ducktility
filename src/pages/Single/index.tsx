import { Component, For, createMemo, onMount } from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router";
import Typography from "../../components/Typography";
import arrow from "../../assets/arrow_back.svg";
import ContentLayout from "../../layouts/ContentLayout";
import SelectButton from "../../components/SelectButton";
import Button from "../../components/Button";
import { items, setAnswers, setItems } from "../../store";

const Single: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 모든 항목이 채워졌는지 확인하는 메모
  const allItemsFilled = createMemo(() => {
    return Object.values(items).every((item) => item.title && item.artistMember);
  });

  // 완료 버튼 클릭 핸들러
  const handleComplete = () => {
    if (allItemsFilled()) {
      navigate("/collage/type/result", { state: { items } }); // 결과 페이지로 이동
    }
  };
  const backPath = () =>
    (location.state as { previous?: string })?.previous && (location.state as { previous?: string })?.previous != "/"
      ? -1
      : "/";

  const handleExit = () => {
    // answers 초기화
    setAnswers({});

    // items 초기화
    const initialItems = Object.fromEntries(
      Array(9)
        .fill(0)
        .map((_, index) => [index, { title: "", artistMember: null }])
    );
    setItems(initialItems);
    // 홈으로 navigate
    navigate(backPath().toString(), {
      replace: true
    });
  };

  return (
    <ContentLayout backgroundColor="bg-white">
      <div class="flex h-full min-h-dvh w-full flex-col items-start justify-start pb-16">
        <div class="flex w-full flex-col bg-white">
          <div class="w-full bg-white px-2 pb-3 pt-14">
            <button onClick={() => handleExit()}>
              <img src={arrow} alt="back button" class="h-9 w-9" />
            </button>
          </div>
          <div class={allItemsFilled() ? "h-1 w-full bg-black" : "h-1 w-1/2 bg-black"}></div>
        </div>
        <div class="w-full px-5 py-7">
          <Typography variant="title" textColor="text-grey-800">
            취향표를 입력해 주세요
          </Typography>
          <div class="size-7"></div>
          <div class="grid grid-cols-3 gap-x-4 gap-y-7">
            <For each={Array.from(Array(9).keys())}>
              {(index) => (
                <SelectButton
                  userId={`select-button-${index + 1}`}
                  index={index}
                  type={"single"} // single 타입으로 설정
                  mode="edit" // edit 모드로 설정하여 textarea 표시
                />
              )}
            </For>
          </div>
        </div>
        <Button variant={allItemsFilled() ? "active" : "unactive"} onClick={handleComplete}>
          완료
        </Button>
      </div>
    </ContentLayout>
  );
};

export default Single;
