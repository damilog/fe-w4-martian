import _ from "./util.js";
import { resetReceiver } from "./receiveSignal.js";
//지구로 보내기 누를 때 왼쪽 화면 리셋
// 리셋 후 convert데이터로 send 재실행
const $inputSend = _.$(".input-send");
const $inputSendConvert = _.$(".input-send-convert");
const $btnSend = _.$(".btn-send");

const convertOneCharToHex = char => {
  return char
    .split("")
    .map(x => x.charCodeAt(0).toString(16))
    .join(" ");
};

const showConvertedResult = evt => {
  const currentInput = $inputSend.value;
  const convertedInput = convertOneCharToHex(currentInput);
  $inputSendConvert.value = convertedInput;
};
const reset = () => {
  resetReceiver();
};
const onSendEvent = () => {
  $inputSend.addEventListener("input", showConvertedResult);
  $btnSend.addEventListener("click", () => reset());
};

onSendEvent();

export { onSendEvent };
