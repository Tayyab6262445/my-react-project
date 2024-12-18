import React from 'react'
import Avatar from 'react-avatar'

const Clients = (props) => {
  return (
    <>
    <div className="client mt-5  ">
  
<div className='flex flex-col items-center' >
<div><Avatar name={props.username} size={50} round="14px" />  </div>
<div className='text-white' >{props.username}</div>
</div>
</div>
    
    </>
  )
}

export default Clients