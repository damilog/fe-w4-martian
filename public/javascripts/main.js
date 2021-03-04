import MyPromise from "./MyPromise.js";
import { sendSignal, convertCharToHex } from "./receiveSignal.js";
import { onSendEvent } from "./sendSignal.js";

sendSignal(convertCharToHex("crong"));
onSendEvent();
