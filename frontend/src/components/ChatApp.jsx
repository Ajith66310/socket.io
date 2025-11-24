import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io(import.meta.env.VITE_BACKEND_URL)


const ChatApp = () => {

  const [messageInput, setMessageInput] = useState('')
  const [messages,setMessages] = useState([]);


  const sendMessage = () => {
    if(messageInput.trim()!==""){
      socket.emit("message",messageInput);
      setMessageInput('')
    }

  }

  useEffect(() => {
    socket.on('message',(message)=>{
    setMessages(prevMessages => [...prevMessages, message]);
    })
    return()=>{
      socket.off("message")
    }
  },[])
  

  return (
    <>
      <div>
        {
          messages.length === 0 ?
            <div>
              <p>
                no messages yet
              </p>
            </div>
            :
            <div>
              {
                messages.map((message, index) => {
                  return (
                    <div key={index}>
                      <p>{message}</p>
                    </div>
                  )
                })
              }
            </div>
        }

        <input type="text"
          placeholder='type text here....'
          value={messageInput}
          onChange={(e) => { setMessageInput(e.target.value) }}
        />
        <button type="submit"
          onClick={sendMessage}>
          send
        </button>
      </div>
    </>
  )
}

export default ChatApp