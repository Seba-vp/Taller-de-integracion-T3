import io from 'socket.io-client';

let socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
    path: "/flights/",
  });

socket.on('connect', function() {
  console.log('check connection', socket.connected);
});



export default socket;