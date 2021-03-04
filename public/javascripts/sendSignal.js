import _ from "./util.js";

const $inputSend = _.$(".input-send");
const $inputSendConvert = _.$(".input-send-convert");

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

const onSendEvent = () => {
  $inputSend.addEventListener("input", showConvertedResult);
};

onSendEvent();

export { onSendEvent };
