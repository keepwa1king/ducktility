import { Component, createEffect, For, onMount } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import Typography from "../../components/Typography";
import ContentLayout from "../../layouts/ContentLayout";
import Button from "../../components/Button";
import html2canvas from "html2canvas";

import exit from "../../assets/exit.svg";
import { setAnswers, setItems, setState, state } from "../../store";
import saveAs from "file-saver";

const MultipleResult: Component = () => {
  let canvasRef: HTMLCanvasElement | undefined;
  const navigate = useNavigate();

  createEffect(() => {
    if (!canvasRef) return;

    const canvas = canvasRef;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawStyle = () => {
      state.users.forEach((user, userIndex) => {
        if (!user.profileImage || !user.name) return;

        const userImage = new Image();
        userImage.src = user.profileImage;

        const x = 100;
        const y = 100 + (100 + 40) * userIndex + 25;
        const radius = 45;

        ctx.save();
        // 현재 컨텍스트 설정 저장

        // 클리핑 영역을 원으로 설정
        ctx.beginPath();
        ctx.arc(x, y + 20, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // 원 안에 이미지 그리기
        const imageSize = Math.min(userImage.width, userImage.height); // 이미지의 크기 중에서 작은 값을 기준으로 정사각형 크기 설정
        const sourceX = (userImage.width - imageSize) / 2; // 이미지의 중앙에서 크롭할 위치 계산
        const sourceY = (userImage.height - imageSize) / 2;
        const sourceSize = imageSize;

        ctx.drawImage(
          userImage,
          sourceX,
          sourceY,
          sourceSize,
          sourceSize,
          x - radius,
          y + 20 - radius,
          radius * 2,
          radius * 2
        );

        ctx.restore(); // 이전 컨텍스트 설정으로 복원

        const userAnswers = user.answers;

        const answerTextY = y - radius;
        const answerTextX = x + radius + 160;

        // 이미지 너비와 높이 설정
        const imageWidth = 120; // 이미지 너비
        const imageHeight = 120; // 이미지 높이

        // 이미지 간격 설정
        const imageSpacingY = 0; // Y축 간격

        userAnswers.forEach((answer, answerIndex) => {
          if (!answer.profileImage) return;
          const textX = answerTextX + answerIndex * imageWidth;
          const textY = answerTextY;
          if (userIndex === 0) {
            ctx.font = "500 30px Pretendard Variable";
            ctx.fillText(state.questions[answerIndex], textX, textY - 10);
          }

          const imageX = textX - 60;
          const imageY = answerTextY + imageSpacingY + 20;

          const answerImage = new Image();
          answerImage.crossOrigin = "anonymous";
          answerImage.src = answer.profileImage;

          answerImage.onload = () => {
            ctx.drawImage(answerImage, imageX, imageY, imageWidth, imageHeight);
          };
        });
      });
    };

    drawStyle();
  });

  const saveAsImage = () => {
    if (canvasRef) {
      const scale = 3;
      const canvas = document.createElement("canvas");
      canvas.width = canvasRef.width * scale;
      canvas.height = canvasRef.height * scale;
      const context = canvas.getContext("2d");

      if (context) {
        context.scale(scale, scale);
        context.drawImage(canvasRef, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, `k-pop.png`);
          }
        });
      }
    }
  };

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
    navigate("/", {
      replace: true
    });
  };

  return (
    <ContentLayout backgroundColor="bg-white">
      <div class="flex h-full min-h-dvh w-full flex-col items-start justify-start pb-16">
        <div class="flex w-full flex-col bg-white">
          <div class="flex w-full flex-row items-center justify-between bg-white px-4 pb-5 pt-14 text-center">
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
        <div class="size-7"></div>
        <canvas ref={canvasRef} width={1400} height={1000} class="w-full bg-white" />
        <Button variant="point" onClick={saveAsImage}>
          다운로드
        </Button>
      </div>
    </ContentLayout>
  );
};

export default MultipleResult;
