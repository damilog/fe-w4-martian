import _ from "./util.js";
const $arrow = _.$(".arrow");
const $inputReceive = _.$(".input-receive");
const hexLocations = {
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
  A: 240,
  B: 260,
  C: 280,
  D: 300,
  E: 330,
  F: 350,
};

//const go = (...args) => reduce((acc, fun) => fun(acc), args);

const convertCharToHex = word => {
  const currentWord = [...word];
  return currentWord
    .map(x => x.charCodeAt(0).toString(16)) //10진수 -> 16진수
    .map(x => [...x]);
};

const sendSignal = hexList => {
  //words를 5초마다 receive에 보낸다.
  const hexadecimals = hexList;
  let idx = 0;

  const sender = setInterval(() => {
    if (idx === hexadecimals.length) {
      clearInterval(sender);
      showInterpretedHexStr(interpretHexStr($inputReceive.value)); // 수신 완료 시 버튼 활성화 -> 버튼 클릭시 show 되게
      console.log("전송 완료");
    } else {
      console.log(hexadecimals[idx]);
      receiveHexSignal(hexadecimals[idx]); //["6","4"]형태로 전달
      idx++;
    }
  }, 3000);
};

const receiveHexSignal = data => {
  const hexadecimals = data; //["6","4"]형태로 전달받음
  console.log(hexadecimals, "받음");

  const transmitter = new Promise((resolve, reject) => {
    setTimeout(() => resolve(hexadecimals), 1000);
  });

  transmitter
    .then(hex => {
      console.log(hex[0], "0번 rotate에 보냄");
      rotateArrow(hex[0]);
      return hex;
    })
    .then(hex => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(hex), 1000);
      });
    })
    .then(hex => {
      console.log(hex[1], "1번 rotate에 보냄");
      rotateArrow(hex[1]);
    })
    .finally(hex => {
      rotateArrow(hex, true);
    });
};

const rotateArrow = (hex, finished = false) => {
  //화살표를 회전시키는 함수 hex값에 해당하는 deg만큼 화살표를 회전시킴

  $arrow.style.transform = `rotate(${hexLocations[hex]}deg)`;
  showReceivedHexStr(hex, finished); //input에 현재 hex값을 보여줌
  //colorReceivedHexStr(hex); //현재 hex값에 해당하는 elem을 깜빡거리게 함
};

const saveReceivedHexStr = str => {};

const showReceivedHexStr = (str, finished) => {
  finished ? ($inputReceive.value += " ") : ($inputReceive.value += str);

  console.log($inputReceive.value);
};

const showInterpretedHexStr = str => {
  const $inputInterpret = _.$("#input-interpret");
  $inputInterpret.value = str;
};

const interpretHexStr = str => {
  const hexStr = str
    .split(" ")
    .filter(x => x)
    .map(x => parseInt(x, 16));
  const char = String.fromCharCode(...hexStr);
  return char;
};
const colorReceivedHexStr = key => {
  console.log(key);
  const $currentHex = _.$(`#text-${key}`);
  $currentHex.classList.add("blink");
};

export { sendSignal, convertCharToHex };
