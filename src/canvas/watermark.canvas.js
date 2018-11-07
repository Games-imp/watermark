import { getTextSize, extend, getDegree } from "../utils";

function createEmptyCanvas() {
  let canvas = document.createElement("canvas");
  if (!document.createElement("canvas").getContext) {
    canvas = window.G_vmlCanvasManager.initElement(canvas);
  }
  return canvas;
}

export default function paintWaterMark(canvas, conf = {}) {
  const markConfig = extend(
    {
      text: "watermark",
      fontSize: 20,
      fontFamily:
        "Microsoft YaHei, PingFangSC-Light, SimHei, SimSun, FangSong, KaiTi, Arial, Tahoma, Verdana, Times New Roman",
      color: "#333333",
      opacity: 0.1,
      angle: 20
    },
    conf
  );
  canvas.width = markConfig.width;
  canvas.height = markConfig.height;
  const deg = calDegree(markConfig.angle),
    textSize = getTextSize(markConfig.text, markConfig.fontSize),
    markWidth = textSize.width + 100,
    markHeight = textSize.height + 60;
  let watermarkCanvas = createEmptyCanvas();
  const cheight = canvas.height,
    cwidth = canvas.width;

  const actualWidth = cwidth * Math.cos(deg) + cheight * Math.sin(deg),
    actualHeight = cwidth * Math.sin(deg) + cheight / Math.cos(deg);
  watermarkCanvas.width = actualWidth;
  watermarkCanvas.height = actualHeight;
  let watermarkCtx = watermarkCanvas.getContext("2d");
  watermarkCtx.rotate(-deg);
  watermarkCtx.font = markConfig.fontSize + "px " + markConfig.fontFamily;
  watermarkCtx.fillStyle = markConfig.color;
  watermarkCtx.globalAlpha = markConfig.opacity;
  const col = parseInt(actualWidth / markWidth);
  const row = parseInt(actualHeight / markHeight);
  // 旋转后左边会有空白，需要填充
  var fillLeft = canvas.height * Math.tan(deg);
  for (let r = 0; r < row + 1; r++) {
    for (let c = 0; c < col + 3; c++) {
      watermarkCtx.fillText(
        markConfig.text,
        c * markWidth - fillLeft + (r % 2 === 0 ? -100 : 0),
        r * markHeight
      );
    }
  }

  let ctxr = canvas.getContext("2d");
  ctxr.fillStyle = ctxr.createPattern(watermarkCanvas, "no-repeat");
  ctxr.fillRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);
}
