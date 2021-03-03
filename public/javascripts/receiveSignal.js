import _ from "./util.js";
// 5초마다 문자를 보낸다.
let receivedSignalStorage = [];
const $arrow = _.$(".arrow");
//이런식으로 얼만큼 돌면 화살표가 그 문자를 향하게 되는지 적기
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

const $inputReceive = _.$(".input-receive");

const sendSignal = word => {
  //words를 5초마다 receive에 보낸다.
  const currentWord = [...word];
  const hexadecimal = currentWord
    .map(x => x.charCodeAt(0).toString(16)) //10진수 -> 16진수
    .map(x => [...x]);

  let idx = 0;

  const sender = setInterval(() => {
    if (idx === hexadecimal.length) {
      clearInterval(sender);
      console.log("전송 완료");
    } else {
      receiveCharSignal(hexadecimal[idx]); //["6","4"]형태로 전달
      idx++;
    }
  }, 3000);
};

const receiveCharSignal = data => {
  console.log(data);
};

const pointHexString = hex => {
  // 화살표로 16진수 문자들을 가리키는 함수
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(hex), 2000); //2초뒤에 -> 화살표를 회전시키는 함수 호출
  });
  promise.then(hex => rotateArrow(hex));
};

const rotateArrow = hex => {
  //화살표를 회전시키는 함수 hex값에 해당하는 deg만큼 화살표를 회전시킴

  $arrow.style.transform = `rotate(${hexLocations[hex]}deg)`;
  showReceivedHexStr(hex); //input에 현재 hex값을 보여줌
  colorReceivedHexStr(hex); //현재 hex값에 해당하는 elem을 깜빡거리게 함
};

const convertHexToChar = () => {};

const showReceivedHexStr = str => {
  //input에 현재 hex값을 보여줌
  $inputReceive.value = str;
};

const colorReceivedHexStr = key => {
  //현재 hex값에 해당하는 elem을 깜빡거리게 함
  console.log(key);
  const $currentHex = _.$(`#text-${key}`);
  $currentHex.classList.add("blink");
};

export { sendSignal };
