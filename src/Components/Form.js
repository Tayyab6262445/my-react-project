import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
const Form = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  // creating a id by using the pkg uuid and importing it uuuidV4 the fourth version of uuid
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a New Room");
  };
  const joinRoom = () => {
    if (!roomId || !username) {
        toast.error("Room ID and Username are required");
        return;
    }
    navigate(`/editor/${roomId}`, {
        state: {
            username
        },
    });
};
const handleInputEnter = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent any default behavior (optional, based on context)
    joinRoom(); // Call the function to join the room
  }
};

 
  return (
    <>
      <div className="border-4 p-2 border-black min-w-[50vw] min-h-[30vh] ">
        <div className="text-2xl  text-center ">Logo Here</div>
        <div className="mainLabel">Paste Input ID </div>
        <div className="inputGroup flex flex-col ">
          {/* input for the room id */}

          <div className="border-2  border-black my-1 rounded w-full ">
            <input
              type="text"
              className="inputBox outline-none px-2 py-1 w-full    "
              placeholder="ROOM ID"
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value);
              }}
              onKeyUp={handleInputEnter}
            />
          </div>

          <div className="my-1 border-2 border-black rounded  w-full ">
            {/*  input for the user name*/}
            <input
              type="text"
              className="inputBox outline-none px-2 py-1  w-full "
              placeholder="USERNAME"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onKeyUp={handleInputEnter}
            />
          </div>
        </div>
        <div className="flex justify-center my-2">
          {/* <button
            type="submit"
            onClick={joinRoom}
            className="bg-emerald-600 hover:bg-emerald-600/80 px-4 py-2 rounded"
          >
            JOIN
          </button> */}
          <button
  type="submit"
  onClick={joinRoom}
  disabled={!roomId || !username}
  className={`bg-emerald-600 hover:bg-emerald-600/80 px-4 py-2 rounded ${
    !roomId || !username ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  JOIN
</button>

        </div>
        <div>
          <h1 className="createInfo  text-center text-xl uppercase ">
            IF you donto have invite create &nbsp;{" "}
            <a onClick={createNewRoom} href="" className="createNewBtn">
              <span className="underline text-blue-700 font-semibold">
                New Room{" "}
              </span>
            </a>
          </h1>
        </div>
      </div>
    </>
  );
};

export default Form;
