import { Editor, Clients } from '../Components/index'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams,useNavigate,Navigate } from 'react-router-dom'
import { initSocket } from '../socket'; // Adjust the path if needed
import ACTIONS, { JOINED } from './Actions';
import toast from 'react-hot-toast';

const Editor_page = () => {

  const location = useLocation()
  const socketRef = useRef(null)
  const codeRef = useRef(null)
  const { roomId } = useParams()
  const [clients, setClients] = useState([])
  const reactNavigator = useNavigate()
  useEffect(() => {
    const init = async () =>{
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err))
      socketRef.current.on('connect_failed', (err) => handleErrors(err))
      function handleErrors(e){
        console.log('socket error',e)
        toast.error('Connection Fails Try Again')
        reactNavigator('/');
      }
     // sending event to the server of jopinijng
      socketRef.current.emit(ACTIONS.JOIN,{
        roomId,
        username: location.state?.username,
        
      });
      // console.log(roomId)
      // listening for joi event 
      socketRef.current.on(ACTIONS.JOINED,({clients,username,socketId})=>{
        if(username !== location.state?.username){
          toast.success(`${username} joined the room`)
          console.log(`${username} joined`)

        }
        setClients(clients)
        socketRef.current.emit(ACTIONS.SYNC_CODE,{
          code :codeRef.current,
          socketId,
        })
      })
      //disconnecting event 
      socketRef.current.on(ACTIONS.DISCONNECTED,({socketId,username})=>{
        toast.success(`${username} left the room`)
        setClients((prev)=>{
          return prev.filter(
            (clients) => clients.socketId !== socketId)
        })
      })
 
    }
    init()
    return () =>{
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);

    }
  }, []);
  if(!location.state){

    return <Navigate to ='/' />
  }

// copy the room id to the funciton
async function copyRoomId() {
  try{
      await navigator.clipboard.writeText(roomId)
      toast.success('Copied to clipboard ')
  }
  catch(err){
toast.error('could hnot copy the Id')
console.log(err)
  }
}

function  leaveRoom() {
  reactNavigator('/');
}


  return (
    <>
    <div className='w-[100%] h-screen flex ' >
    <div className='w-[15%] h-screen  border-r-2 border-black bg-black/90  ' >
    {/* Sidebar */}
    <div className='h-[100%] p-1 ' >
      <div className='p-5 text-white ' >  Logo goes here </div>
      <hr />
      <h3 className='my-5 text-xl font-medium text-white ' >Connected</h3>
      <div className="clientsList flex justify-normal gap-4 flex-wrap "  >
{clients.map((clients)=>(
  <Clients 
  key={clients.socketId}
  username ={clients.username} />
))}
</div>

<div className='flex flex-col space-y-6  justify-end h-[60%]  p-3  ' >
<div><button className='w-full bg-slate-50 text-black rounded text-sm py-2 ' onClick={copyRoomId} >Copy Room ID</button></div>
<div><button className='w-full bg-green-500 text-black rounded text-sm py-2 ' onClick={leaveRoom} >Leave</button></div>

</div>
    </div>
    
    
    
    
    </div>
    <div className='w-[85%]  h-screen ' > <Editor socketRef={socketRef} roomId={roomId}
      onCodeChange={(code)=>
      {codeRef.current =code }} />  </div>
    </div>
    </>
  )
}

export default Editor_page

