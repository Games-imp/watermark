export function getTextSize(text, fontSize = 12) {
  let body = document.getElementsByTagName("body")[0];
  let span = document.createElement("span");
  body.appendChild(span);
  fontSize = fontSize + "px";
  span.innerText = text;
  span.style.fontSize = fontSize;

  const width = span.offsetWidth;
  const height = span.offsetHeight;
  body.removeChild(span);
  return {
    width: width,
    height: height
  };
}

export function calDegree(angle) {
  return (angle * Math.PI) / 180;
}

export function extend(first, second) {
  const secondKeys = Object.keys(second);
  secondKeys.forEach(key => (first[key] = second[key]));
  return first;
}
