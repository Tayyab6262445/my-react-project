// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const ACTIONS =  require('./src/Pages/Actions')
// const app = express();
// const server = http.createServer(app); // Create HTTP server

// // Configure CORS for Socket.IO to allow connections from frontend (http://localhost:3000)
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",  // Allow frontend to connect from localhost:3000
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true,  // Allow cookies and authorization headers
//   },
// });
// const userSocketMap = {}
// function getAllConnectedClients(roomId){
//   // get the room id from the room of specific user
//   //using array from method to get the array other wise we have map 
//  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
//   (socketId) => {
//   return {
//     socketId,
//     username:userSocketMap[socketId],
//   }
//  });
// }
// // Set up Socket.IO connection
// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.id}`);
  
//   // Example: Send a message to the client
//   socket.emit('message', 'Welcome to the server!');

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log(`User disconnected: ${socket.id}`);


//   });
//   socket.on(ACTIONS.JOIN,({roomId,username})=>{
//     userSocketMap[socket.id] = username;
//     socket.join(roomId)
     
//     const clients = getAllConnectedClients(roomId)
//     // console.log(clients)

//     clients.forEach(({socketId})=>{
//       io.to(socketId).emit(ACTIONS.JOINED,{
//         clients,
//         username,
//         socketId : socket.id,
//       })
      
//     })
//   });



//   //code change and updating ton then otther cli3ent side code
//   socket.on(ACTIONS.CODE_CHANGE,({roomId,code})=>{
//     socket.in(roomId).emit(ACTIONS.CODE_CHANGE,{code}) // hewrer the s3erfver is sending the code

//   })
// // for making the code asunc
//   socket.on(ACTIONS.SYNC_CODE,({socketId,code})=>{
//     io.to(socketId).emit(ACTIONS.CODE_CHANGE,{code}) 

//   })
//   socket.on('disconnecting',()=>{
//     const rooms = [...socket.rooms]
//     rooms.forEach((roomId)=>{
//       socket.in(roomId).emit(ACTIONS.DISCONNECTED,{
//         socketId:socket.id,
//         username:userSocketMap[socket.id],
//       });

//     })
//     delete userSocketMap[socket.id];
//     socket.leave();
//   })

// });
// // Serve the app on port 5000
// server.listen(5000, () => {
//   console.log('Server running on http://localhost:5000');
// });
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const ACTIONS = require('./src/Pages/Actions');

const app = express();
const server = http.createServer(app); // Create HTTP server

// Configure CORS for Socket.IO to allow connections from frontend (http://localhost:3000)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",  // Allow frontend to connect from localhost:3000
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,  // Allow cookies and authorization headers
  },
});

const userSocketMap = {};

// Function to get all connected clients in a room
function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
    return {
      socketId,
      username: userSocketMap[socketId],
    };
  });
}

// Set up Socket.IO connection
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // Welcome message to the client
  socket.emit('message', 'Welcome to the server!');

  // Handle user joining a room
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);
    
    // Notify all clients in the room about the new user
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  // Handle code change updates
  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // Synchronize code with a specific user
  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // Handle disconnection
  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Serve the app on port 5000
server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
