// import React, { useEffect, useRef, useState } from 'react'
// // import { useLocation, useSearchParams } from 'react-router-dom'
// import {Clients} from './index'


// const Sidebar = () => {
//   const [clients, setClients] = useState([
//     {socketId:1 , username:"tayyab"},
//     {socketId:2 , username:"Abeer"},
//     {socketId:3 , username:"Ali"}
  
//   ])

//   return (
//     <>
//     <div className='h-[100%] p-1 ' >
//       <div className='p-5 text-white ' >  Logo goes here </div>
//       <hr />
//       <h3 className='my-5 text-xl font-medium text-white ' >Connected</h3>
//       <div className="clientsList flex justify-normal gap-4 flex-wrap "  >
// {clients.map((clients)=>(
//   <Clients 
//   key={clients.socketId}
//   username ={clients.username} />
// ))}
// </div>

// <div className='flex flex-col space-y-6  justify-end h-[60%]  p-3  ' >
// <div><button className='w-full bg-slate-50 text-black rounded text-sm py-2 ' onClick={copyRoomId} >Copy Room ID</button></div>
// <div><button className='w-full bg-green-500 text-black rounded text-sm py-2 ' >Leave</button></div>

// </div>
//     </div>
//     </>
//   )
// }

// export default Sidebar