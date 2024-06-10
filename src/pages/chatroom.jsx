
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const Chatroom = () => {
    const [heading, setHeading] = useState("You are not Connected Yet!!");
    const [messages, setMessages] = useState([]);
    const [noOfuser, setNoOfuser] = useState([]);
    const [message, setMessage] = useState({user:"", message:""});
    const [socket, setSocket] = useState(null);
    const name = useSelector((state) => state.name);
    const room = useSelector((state) => state.room);
    const navigate = useNavigate(); 

    
    useEffect(() => {
     if(name ===""){
      navigate('/');

     }
     const newSocket = io('https://chatroom-backend-sj3x.onrender.com');
     setSocket(newSocket);
  
        newSocket.on('connect',()=>{
          console.log("connected to server");
          newSocket.emit('joinRoom',{user: name, room: room})
          setHeading("Welcome to the Chatroom!!")
      })
  
      newSocket.on('roomUser', ({room,users}) => {
        setNoOfuser([...users]);
        
      });

      newSocket.on('message', (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
        
      });
  
      return () => {
        newSocket.disconnect();
    };
  
      
    }, []);
  
   function handleSend(e){
    e.preventDefault();
    setMessages(prevMessages => [...prevMessages, message]);
    socket.emit('chatMessage',message);
    setMessage("")
   }
  return (
    <div className='flex flex-col pt-[50px] px-[200px] justify-center items-center'>
      <div className='text-center'>
        <h1 className='text-white text-4xl mb-[30px]'>{heading}</h1>
        <h1 className='text-gray-500 text-2xl mt-2 mb-[20px]'>Hi <span className='text-gray-300'>{name}</span>! you are in Room:<span className='text-gray-300'>{room}</span></h1>
      </div>
      <div className="flex flex-col lg:flex-row">


      <div className="bg-gray-600 lg:h-[400px] py-3 px-2  rounded-md">
       <h3 className="border-b-2 hidden lg:block">Total Members: <span className="text-green-300 font-bold">{noOfuser.length}</span></h3>
       
       <div className=' flex flex-row lg:flex-col'>
        {noOfuser && noOfuser.map((user,index)=>(
          <div key={index} className="my-3 ml-2 flex  items-center">
            <div className='bg-blue-950 rounded-full w-[30px] h-[30px] flex justify-center items-center mx-2'>{user.user[0]}</div>
           <span className="text-white font-semibold hidden lg:inline">{user.user}</span>
          </div>
        ))}
       </div>
      </div>
      <div className='flex flex-col items-center'>
      <div className='h-[450px] pt-[50px] w-[345px] lg:w-[550px] overflow-y-scroll'>
        {messages && messages.map((msg,index)=>(
        <div key={index}>
          {msg.user === "server" ? (
            <div className="w-full flex justify-center py-2 px-2">
            <div className='bg-cyan-700 py-1 px-2 rounded-md text-sm'>
            <p>{msg.message}</p>
            </div>
            
          </div>
          ):
        (
            <div className={`w-full flex ${msg.user === name ? 'justify-end':'justify-start'} py-2 px-2`}>
            <div className='bg-cyan-950 py-1 px-2 rounded-md'>
            <p className="text-sm text-cyan-500">{msg.user}</p>
            <p>{msg.message}</p>
            </div>
            
          </div>
        )
        }
        </div>
          
        ))}
      </div>
      <div>
        <form onSubmit={handleSend}>
          <div className=" flex">
            <input className='py-1 px-2' onChange={(e)=>setMessage({user:name, message:e.target.value})} value={message.message} />
            <button type='submit' className='bg-cyan-900 px-2 py-1'>Send</button>
          </div>
        </form>
      </div>
      
      </div>

      </div>
      
    </div>
  )
}

export default Chatroom