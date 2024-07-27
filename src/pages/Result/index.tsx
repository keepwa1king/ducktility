import { Component, onMount } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import exit from "../../assets/exit.svg";
import logo from "../../assets/logo.png";
import { setAnswers, setItems } from "../../store";
import saveAs from "file-saver";

const Result: Component = () => {
  let canvasRef: HTMLCanvasElement | undefined;
  const location = useLocation();
  const navigate = useNavigate();

  const items = (location.state as { items: any })?.items || {};

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

    const drawImageCovered = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number, radius: number = 4) => {
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

      // 원래 컨텍스트 상태 저장
      ctx.save();

      // 둥근 모서리 패스 생성
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      ctx.lineTo(x + radius, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();

      // 패스를 클리핑 영역으로 설정
      ctx.clip();

      // 이미지 그리기
      ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);

      // 컨텍스트 상태 복원
      ctx.restore();
    };
    const drawStyle = async () => {
      const itemSize = 250;
      const spacing = 60;
      const startX = 75;
      const startY = 50;

      const itemPromises = Object.values(items).map(async (item: any, index) => {
        const col = index % 3;
        const row = Math.floor(index / 3);
        const x = startX + col * (itemSize + spacing);
        const y = startY + row * (itemSize + spacing);

        if (item.artistMember?.profileImage) {
          const img = await loadImage(item.artistMember.profileImage);
          drawImageCovered(ctx, img, x, y, itemSize, itemSize, 4);
        }

        ctx.fillStyle = "black";
        ctx.font = "600 18px Pretendard Variable";
        ctx.textAlign = "center";
        ctx.fillText(item.title, x + itemSize / 2, y + itemSize + 30);
      });

      await Promise.all(itemPromises);

      // 로고 추가
      const logoImage = await loadImage(logo);
      const logoSize = 75;
      const logoX = canvas.width - logoSize - 30;
      const logoY = canvas.height - 30;
      ctx.drawImage(logoImage, logoX, logoY, logoSize, 17.145);
    };

    drawStyle();
  });

  const handleDownload = () => {
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
            saveAs(blob, 'my-type-collage.png');
          }
        }, 'image/png');
      }
    }
  };

  const handleExit = () => {
    setAnswers({});
    const initialItems = Object.fromEntries(
      Array(9)
        .fill(0)
        .map((_, index) => [index, { title: "", artistMember: null }])
    );
    setItems(initialItems);
    navigate("/", { replace: true });
  };

  return (
    <div>
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
        <div class="size-4"></div>
        <canvas ref={canvasRef} width={1000} height={1000} class="w-full bg-white" />
      </div>
      <Button variant="point" onClick={handleDownload}>
        다운로드
      </Button>
    </div>
  );
};

export default Result;