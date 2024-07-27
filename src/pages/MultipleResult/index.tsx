import { Component, createEffect, For, onMount } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import Typography from "../../components/Typography";
import ContentLayout from "../../layouts/ContentLayout";
import Button from "../../components/Button";
import html2canvas from "html2canvas";

import exit from "../../assets/exit.svg";
import logo from "../../assets/logo.png";
import { setAnswers, setItems, setState, state } from "../../store";
import saveAs from "file-saver";

const MultipleResult: Component = () => {
  let canvasRef: HTMLCanvasElement | undefined;
  const navigate = useNavigate();

  onMount(() => {
    if (!canvasRef) return;

    const canvas = canvasRef;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
        img.crossOrigin = "anonymous";
      });
    };

    const wrapText = (context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines: number) => {
      let lines = [];
      let line = '';
      let lineCount = 0;

      for (let i = 0; i < text.length; i++) {
        let testLine = line + text[i];
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
          if (lineCount === maxLines - 1) {
            lines.push(line.slice(0, -3) + '...');
            break;
          }
          lines.push(line);
          line = text[i];
          lineCount++;
        } else {
          line = testLine;
        }

        if (i === text.length - 1) {
          lines.push(line);
        }
      }

      if (lines.length > maxLines) {
        lines = lines.slice(0, maxLines);
        lines[maxLines - 1] = lines[maxLines - 1].slice(0, -3) + '...';
      }

      if(lines.length > 1) {
        for (let i = 0; i < lines.length; i++) {
          context.fillText(lines[i], x, y + 7 + (i * lineHeight));
        }
      } else {
        context.fillText(lines[0], x, y + (1 * lineHeight));
      }
    };

    const drawImageCovered = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) => {
      const aspectRatio = img.width / img.height;
      let sx, sy, sWidth, sHeight;

      if (aspectRatio > 1) {
        sWidth = img.height;
        sHeight = img.height;
        sx = (img.width - sWidth) / 2;
        sy = 0;
      } else {
        sWidth = img.width;
        sHeight = img.width;
        sx = 0;
        sy = (img.height - sHeight) / 2;
      }

      ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
    };


    const drawStyle = async () => {
      const questionSize = 115;
      const answerSize = 115;
      const userImageSize = 80;
      const spacing = 0;

      // Draw questions
      ctx.font = "600 16px Pretendard Variable";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      state.questions.forEach((question, index) => {
        const x = 225 + index * (questionSize + spacing) + questionSize / 2;
        const y = 40;
        wrapText(ctx, question, x, y, questionSize, 18, 3);
      });

      const userImagePromises = state.users.map((user, userIndex) => {
        if (!user.profileImage || !user.name) return null;
        return loadImage(user.profileImage).then(userImage => {
          const x = 100;
          const y = 100 + (userImageSize + 35) * userIndex;

          // Draw user image
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y + 5 + userImageSize / 2 , userImageSize / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          drawImageCovered(ctx, userImage, x - userImageSize / 2, y + 5, userImageSize, userImageSize);
          ctx.restore();

          // Draw username
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.font = "500 16px Pretendard Variable";
          ctx.fillText(user.name, x, y + userImageSize + 30);

          const answerPromises = user.answers.map((answer, answerIndex) => {
            if (!answer.profileImage) return null;
            return loadImage(answer.profileImage).then(answerImage => {
              const imageX = 225 + answerIndex * (answerSize + spacing);
              const imageY = y;
              drawImageCovered(ctx, answerImage, imageX, imageY, answerSize, answerSize);
            });
          });

          return Promise.all(answerPromises);
        });
      });

      await Promise.all(userImagePromises);

      // 로고 추가
      const logoImage = await loadImage(logo);
      const logoSize = 100;  // 로고 크기를 조절하세요
      const logoX = canvas.width - logoSize - 30;  // 오른쪽 여백 10px
      const logoY = canvas.height - 40;
      ctx.drawImage(logoImage, logoX, logoY, logoSize, 22.86);
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
    <div>
        <div class="bg-white flex h-full min-h-screen w-full flex-col items-start justify-start pb-16">
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
        </div>
      <Button variant="point" onClick={saveAsImage}>
        다운로드
      </Button>
    </div>
  );
};

export default MultipleResult;
