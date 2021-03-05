import _ from "./util.js";
import {
  sendSignal,
  convertCharToHex,
  resetReceiver,
} from "./receiveSignal.js";

const $inputSend = _.$(".input-send");
const $inputSendConvert = _.$(".input-send-convert");
const $btnSend = _.$(".btn-send");

const convertOneCharToHex = char => {
  return char
    .split("")
    .map(x => x.charCodeAt(0).toString(16))
    .join(" ");
};

const showConvertedResult = () => {
  $btnSend.disabled = false;
  const currentInput = $inputSend.value;
  const convertedInput = convertOneCharToHex(currentInput);
  $inputSendConvert.value = convertedInput;
};

const sendToEarth = () => {
  $btnSend.disabled = true;
  resetReceiver();
  sendSignal(convertCharToHex($inputSend.value));
};

const onSendEvent = () => {
  $inputSend.addEventListener("input", showConvertedResult);
  $btnSend.addEventListener("click", sendToEarth);
};

onSendEvent();

export { onSendEvent };
