!(function() {
  var paintWaterMark = function(conf) {
    var canvas = document.getElementById("watermark-canvas");
    var markConfig = {
      text: "watermark",
      fontSize: 16,
      fontFamily:
        "Microsoft YaHei, PingFangSC-Light, SimHei, SimSun, FangSong, KaiTi, Arial, Tahoma, Verdana, Times New Roman",
      color: "#333333",
      opacity: 0.1,
      angle: 20
    };
    var deg = (markConfig.angle * Math.PI) / 180,
      markWidth = getTextSizeWidth(markConfig.text, markConfig.fontSize) + 100,
      markHeight = getTextSizeHeight(markConfig.text, markConfig.fontSize) + 60;
    var watermarkCanvas = createEmptyCanvas();
    var cheight = canvas.height,
      cwidth = canvas.width;

    var actualWidth = cwidth * Math.cos(deg) + cheight * Math.sin(deg),
      actualHeight = cwidth * Math.sin(deg) + cheight / Math.cos(deg);
    watermarkCanvas.width = actualWidth;
    watermarkCanvas.height = actualHeight;
    var watermarkCtx = watermarkCanvas.getContext("2d");
    watermarkCtx.rotate(-deg);
    watermarkCtx.font = markConfig.fontSize + "px " + markConfig.fontFamily;
    watermarkCtx.fillStyle = markConfig.color;
    watermarkCtx.globalAlpha = markConfig.opacity;
    var col = parseInt(actualWidth / markWidth);
    var row = parseInt(actualHeight / markHeight);
    // 旋转后左边会有空白，需要填充
    var fillLeft = canvas.height * Math.tan((Math.PI / 180) * 20);
    for (var r = 0; r < row + 1; r++) {
      for (var c = 0; c < col + 3; c++) {
        watermarkCtx.fillText(
          markConfig.text,
          c * markWidth - fillLeft + (r % 2 === 0 ? -100 : 0),
          r * markHeight
        );
      }
    }

    var ctxr = canvas.getContext("2d");
    ctxr.fillStyle = ctxr.createPattern(watermarkCanvas, "no-repeat");
    ctxr.fillRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);
  };

  var createEmptyCanvas = function() {
    var canvas = document.createElement("canvas");
    if (!document.createElement("canvas").getContext) {
      canvas = window.G_vmlCanvasManager.initElement(canvas);
    }
    return canvas;
  };

  var getTextSizeWidth = function(text, fontSize) {
    var body = document.getElementsByTagName("body")[0];
    var span = document.createElement("span");
    body.appendChild(span);

    if (fontSize == null) {
      fontSize = 12;
    }
    fontSize = fontSize + "px";
    span.innerText = text;
    span.style.fontSize = fontSize;

    var width = span.offsetWidth;
    body.removeChild(span);
    return width;
  };

  var getTextSizeHeight = function(text, fontSize) {
    var body = document.getElementsByTagName("body")[0];
    var span = document.createElement("span");
    body.appendChild(span);

    if (fontSize == null) {
      fontSize = 12;
    }
    fontSize = fontSize + "px";
    span.innerText = text;
    span.style.fontSize = fontSize;

    var height = span.offsetHeight;
    body.removeChild(span);
    return height;
  };

  paintWaterMark({});
})();
