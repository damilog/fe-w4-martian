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

const sendSignal = () => {
  //words를 5초마다 receive에 보낸다.
  const words = ["hello", "crong", "daisy"];
  setTimeout(receiveCharSignal(words[2]), 5000);
};

const receiveCharSignal = data => {
  //수신기
  receivedSignalStorage.push(data); //daisy
  convertCharToHex(data);
}; //수신기는 5초간격으로 문자를 수신받는다. 전달받은 문자를 16진수로 변환한다.

const convertCharToHex = data => {
  //단어를 알파벳으로 나눠서 그 알파벳으로 만든 16진수를 hexList에 넣음
  const char = data; //daisy
  const hexList = []; //[["64", "61", "69", "73", "79"]

  for (const idx in char) {
    hexList.push(char.charCodeAt(idx).toString(16));
  }
  pointHexString(hexList); // 화살표로 16진수 문자들을 가리키는 함수
};

const pointHexString = hex => {
  // 화살표로 16진수 문자들을 가리키는 함수
  const hexList = [...hex];

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(hex[0]), 2000); //2초뒤에 -> 화살표를 회전시키는 함수 호출
  });
  promise.then(hex => rotateArrow(hex));
};

const rotateArrow = hex => {
  //화살표를 회전시키는 함수 hex값에 해당하는 deg만큼 화살표를 회전시킴
  console.log("promise resolved");
  console.log(hex);
  $arrow.style.transform = `rotate(${hexLocations[hex[0]]}deg)`;
  showReceivedHexStr(hex[0]); //input에 현재 hex값을 보여줌
  colorReceivedHexStr(hex[0]); //현재 hex값에 해당하는 elem을 깜빡거리게 함
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
