import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'
import VideoCall from './pages/VideoCall'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/chat' element={<Chat />} />
      <Route path='/video-call' element={<VideoCall />} />
    </Routes>
  )
}

export default App
