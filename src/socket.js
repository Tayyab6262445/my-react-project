// import {io} from 'socket.io-client'

// export const initSocket = async () =>{
//     const option = {
//         'force new connection ' : true,
//         reconnectionAttempt : 'Infinity',
//         timeout : 10000,
//         transport : ['websocket'],
//     };
//     return io(process.env.REACT_APP_BACKEND_URL, option);
// };

// import { io } from "socket.io-client";

// // Connect to the backend WebSocket
//  const socket = io("http://localhost:5000", {
//   withCredentials: true,  // Include cookies in the request if needed
//   transports: ['websocket'], // Use WebSocket transport for better performance
// });

// socket.on('connect', () => {
//   console.log('Connected to the backend with ID:', socket.id);
// });

// socket.on('message', (message) => {
//   console.log('Received message:', message);
// });
// socket.js
import { io } from 'socket.io-client';

export const initSocket = async () => {
  const options = {
    'force new connection': true,
    reconnectionAttempt: 'Infinity',
    timeout: 10000,
    transport: ['websockets'],
  };
  return io(process.env.REACT_APP_BACKEND_URL, options);
};
