import io from 'socket.io-client';

let socketChat = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
    path: "/flights/",
  });

socketChat.on('connect', function() {
  console.log('check connection chat', socketChat.connected);
});


export default socketChat;