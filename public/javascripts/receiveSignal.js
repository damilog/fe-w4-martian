import _ from "./util.js";
const $arrow = _.$(".arrow");
const $inputReceive = _.$(".input-receive");
const $btnConvert = _.$(".btn-interpret");
const $inputInterpret = _.$(".input-receive-convert");
const hexLocations = {
  //  회전 각도 이렇게 값으로 넣지 않으려 했는데 원판을 잘못 만들었는지 30,150,240,330도 다음에 있는 문자로 이동할 때 마다
  // 20도가 아닌 30도를 더해줘야 화살표가 영역 중앙에 위치해서 이렇게 객체에 넣게 되었습니다..ㅠㅠ
  Total: 360,
  0: 10,
  1: 30,
  2: 60,
  3: 80,
  4: 100,
  5: 120,
  6: 150,
  7: 170,
  8: 190,
  9: 210,
  a: 240,
  b: 260,
  c: 280,
  d: 300,
  e: 330,
  f: 350,
};

//const go = (...args) => reduce((acc, fun) => fun(acc), args);
const resetReceiver = () => {
  $btnConvert.disabled = true; // 버튼 비활성화
  $inputReceive.value = ""; //input 리셋
  $inputInterpret.value = ""; //input 결과 리셋
};

const endReceive = () => {
  $btnConvert.disabled = false;
  _.$(".blink").classList.remove("blink");
  $arrow.style.transform = "";
  console.log("전송 완료");
};

const sendSignal = hexList => {
  //words를 5초마다 receive에 보낸다.
  const hexadecimals = hexList;
  console.log(hexList);
  let idx = 0;

  const sender = setInterval(() => {
    if (idx === hexadecimals.length) {
      clearInterval(sender);
      endReceive();
    } else {
      console.log(hexadecimals[idx], "전달 시작");
      receiveHexSignal(hexadecimals[idx]); //["6","4"]형태로 전달
      idx++;
    }
  }, 5000);
};

const convertCharToHex = word => {
  //"star" =>[["7", "3"], ["7", "4"], ["6", "1"], ["7", "2"]] 이런 형식으로 반환합니다.
  return [...word]
    .map(x => x.charCodeAt(0).toString(16)) //10진수 -> 16진수
    .map(x => [...x]);
};

const convertHexToChar = str => {
  //"73 74 61 72" => "star" 이런 형식으로 반환합니다.
  return String.fromCharCode(
    ...str
      .split(" ")
      .filter(x => x)
      .map(x => parseInt(x, 16))
  );
};

const showConvertedHexStr = str => {
  $inputInterpret.value = str;
};

const receiveHexSignal = data => {
  const hexadecimals = data;

  const transmitter = new Promise((resolve, reject) => {
    setTimeout(() => resolve(hexadecimals), 2000);
  });

  transmitter
    .then(hex => {
      console.log(hex[0], "16진수 첫 번째 문자 전달 완료");
      activateReceiver(hex[0]);
      return hex;
    })
    .then(hex => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(hex), 2000);
      });
    })
    .then(hex => {
      console.log(hex[1], "16진수 두 번째 문자 전달 완료");
      activateReceiver(hex[1]);
    })
    .finally(hex => {
      activateReceiver(hex, true);
    });
};

const activateReceiver = (hex, finished = false) => {
  rotateArrow(hex, finished);
  showReceivedHexStr(hex, finished);
  colorReceivedHexStr(hex, finished);
};

const rotateArrow = (hex, finished) => {
  if (!finished) $arrow.style.transform = `rotate(${hexLocations[hex]}deg)`;
};

const showReceivedHexStr = (str, finished) => {
  finished ? ($inputReceive.value += " ") : ($inputReceive.value += str);
};

const colorReceivedHexStr = (key, finished) => {
  if (finished) return;
  const $currentHex = _.$(`#text-${key}`);

  if (!_.$(".blink")) {
    $currentHex.classList.add("blink");
  } else {
    const $blinkingHex = _.$(".blink");
    $blinkingHex.classList.remove("blink");
    $currentHex.classList.add("blink");
  }
};

const onConvertEvent = () => {
  $btnConvert.addEventListener("click", () =>
    showConvertedHexStr(convertHexToChar($inputReceive.value))
  );
};

onConvertEvent();

export { sendSignal, convertCharToHex, resetReceiver };
