"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _socket = _interopRequireDefault(require("socket.io-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socketChat = (0, _socket.default)("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
  path: "/flights/"
});
socketChat.on('connect', function () {
  console.log('check connection chat', socketChat.connected);
});
var _default = socketChat;
exports.default = _default;