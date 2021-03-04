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
      console.log("전송 완료");
    } else {
      console.log(hexadecimals[idx]);
      receiveHexSignal(hexadecimals[idx]); //["6","4"]형태로 전달
      idx++;
    }
  }, 5000);
};

const sendSignalToArrow = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};
const receiveHexSignal = data => {
  const hexadecimals = data; //["6","4"]형태로 전달받음
  console.log(hexadecimals, "받음");

  const transmitter = new Promise((resolve, reject) => {
    setTimeout(() => resolve(hexadecimals), 2000);
  });

  transmitter
    .then(hex => {
      console.log(hex[0], "0번 rotate에 보냄");
      rotateArrow(hex[0]);
      return hex;
    })
    .then(hex => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(hex), 2000);
      });
    })
    .then(hex => {
      console.log(hex[1], "1번 rotate에 보냄");
      rotateArrow(hex[1]);
    });
};

const rotateArrow = hex => {
  //화살표를 회전시키는 함수 hex값에 해당하는 deg만큼 화살표를 회전시킴

  $arrow.style.transform = `rotate(${hexLocations[hex]}deg)`;
  showReceivedHexStr(hex); //input에 현재 hex값을 보여줌
  colorReceivedHexStr(hex); //현재 hex값에 해당하는 elem을 깜빡거리게 함
};

const showReceivedHexStr = str => {
  //input에 현재 hex값을 보여줌
  let totalStr;
  totalStr = +str;
  $inputReceive.value = totalStr;
};

const colorReceivedHexStr = key => {
  //현재 hex값에 해당하는 elem을 깜빡거리게 함
  console.log(key);
  const $currentHex = _.$(`#text-${key}`);
  $currentHex.classList.add("blink");
};

export { sendSignal, convertCharToHex };
