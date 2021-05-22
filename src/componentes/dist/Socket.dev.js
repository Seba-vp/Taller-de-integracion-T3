"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _socket = _interopRequireDefault(require("socket.io-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socket = (0, _socket.default)("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
  path: "/flights/"
});
socket.on('connect', function () {
  console.log('check connection', socket.connected);
});
var _default = socket;
exports.default = _default;