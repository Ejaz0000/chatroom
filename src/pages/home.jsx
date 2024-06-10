
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setName, setRoom } from '../store';


const Home = () => {
    const [userName, setUserName] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const navigate = useNavigate(); 
    const dispatch = useDispatch();



    function handlebtn(){
        dispatch(setName(userName));
        dispatch(setRoom(roomCode));
        navigate('/chatroom');
    }
  return (
    <div className='flex flex-col pt-[100px] lg:px-[200px] justify-center items-center'>
      <div>
        <h1 className='text-white text-6xl text-center'>WELCOME TO CHATaPP</h1>
      </div>
      <div className='bg-gray-900 mt-[100px] rounded-lg '>
        <div className='flex flex-col justify-center items-center mx-6 lg:mx-12 my-10'>
        <h1 className='text-white text-2xl my-4'>Enter your name</h1>
        <input className='py-1 px-2 text-center text-lg w-[300px] rounded-md' onChange={(e)=>setUserName(e.target.value)} value={userName} />
        <h1 className='text-white text-2xl my-4'>Enter Room code</h1>
        <input className='py-1 px-2 text-center text-lg w-[300px] rounded-md' onChange={(e)=>setRoomCode(e.target.value)} value={roomCode} />
        <button onClick={()=> handlebtn()} className='bg-gray-200 text-xl py-2 px-3 font-semibold mt-10  text-gray-900 w-full rounded-md'>Enter The Chatroom</button>
        </div>
      </div>

    </div>
  )
}

export default Home