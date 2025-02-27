import { useState } from 'react'
import './App.css'
import User from './user'
import { io } from 'socket.io-client'

// Use relative URL for production compatibility
const socket = io('/', { transports: ['websocket'] });

function App() {
  return (
    <>
      <User socket={socket} />
    </>
  );
}

export default App;
