import { Component, For, onMount } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import Typography from "../../components/Typography";
import ContentLayout from "../../layouts/ContentLayout";
import Button from "../../components/Button";
import html2canvas from "html2canvas";

import exit from "../../assets/exit.svg";
import { setAnswers, setItems } from "../../store";
import logo from "../../assets/logo.png";



const Result: Component = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = (location.state as { items: any })?.items || {};

  const adjustImageForCanvas = (img: HTMLImageElement) => {
    const container = img.parentElement as HTMLElement;
    const containerAspectRatio = container.offsetWidth / container.offsetHeight;
    const imageAspectRatio = img.naturalWidth / img.naturalHeight;

    let newWidth, newHeight;
    if (imageAspectRatio > containerAspectRatio) {
      newHeight = container.offsetHeight;
      newWidth = newHeight * imageAspectRatio;
    } else {
      newWidth = container.offsetWidth;
      newHeight = newWidth / imageAspectRatio;
    }

    img.style.width = `${newWidth}px`;
    img.style.height = `${newHeight}px`;
    img.style.maxWidth = "none";
    img.style.maxHeight = "none";
    img.style.position = "absolute";
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transform = "translate(-50%, -50%)";
  };

  onMount(() => {
    const images = document.querySelectorAll("#result-img img") as NodeListOf<HTMLImageElement>;
    images.forEach((img) => {
      if (img.complete) {
        adjustImageForCanvas(img);
      } else {
        img.onload = () => adjustImageForCanvas(img);
      }
    });
  });

  const handleDownload = () => {
    const element = document.getElementById("result-card");
    if (element) {
      html2canvas(element, {
        onclone: (document) => {
          const images = document.querySelectorAll("#result-img img") as NodeListOf<HTMLImageElement>;
          images.forEach(adjustImageForCanvas);
        },
        useCORS: true,
        allowTaint: true
      }).then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "my-kpop-chart.png";
        link.href = dataUrl;
        link.click();
      });
    }
  };


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
    navigate("/", {
      replace: true
    });
  };

  return (
      <div class="bg-white flex min-h-screen w-full flex-col items-start justify-start pb-16">
        <div class="flex w-full flex-col bg-white">
          <div class="flex w-full flex-row items-center justify-between bg-white px-4 pb-5 pt-5 text-center">
            <img src={exit} alt="" class="h-6 w-6 opacity-0" />
            <Typography variant="body4" textColor="text-black">
              취향표 저장
            </Typography>
            <button onClick={() => handleExit()}>
              <img src={exit} alt="back button" class="h-6 w-6" />
            </button>
          </div>
          <div class="h-1 w-full bg-grey-50"></div>
        </div>
        <div id="result-card" class="w-full px-5 pt-8 pb-4 flex flex-col">
          <div class="grid grid-cols-3 gap-4">
            <For each={Object.values(items)}>
              {(item: any) => (
                <div class="text-center">
                  <div id="result-img" class="relative aspect-square w-full overflow-hidden rounded">
                    <img
                      src={item.artistMember?.profileImage}
                      alt={item.artistMember?.name}
                      class="absolute h-full w-full object-cover"
                    />
                  </div>
                  <div class="mt-2 w-full text-center text-body3 font-semibold tracking-body3 text-grey-800">
                    {item.title}
                  </div>
                </div>
              )}
            </For>
          </div>
          <div class="size-12"></div>
          <img src={logo} alt="logo" class="w-1/6" />
        </div>
        <Button variant="point" onClick={handleDownload}>
          다운로드
        </Button>
      </div>
  );
};

export default Result;
