import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { SidebarLeft, SidebarRight } from './Containers'
import { AuthPage, Chat } from './Pages'
import { routes } from './routes'
import { MenuMobile } from './Components'
import { soundMessage } from '../src/assets'
import socket from './socketio/socketio'
import './App.css'

const audio = new Audio(soundMessage)
function App() {
  const user = useSelector(state => state.authReducer.authData)
  const dispatch = useDispatch()
  useEffect(() => {
    if (user) {
      socket.emit('new-user-add', user.user._id)
    }
  }, [user])
  useEffect(() => {
    socket.on('receive-message', (data) => {
      dispatch({ type: 'HAVE_NEW_MSG' })
      audio.play()
    })
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path='auth' element={!user ? <AuthPage /> : <Navigate to={'../'} />} />
        <Route path='chat' element={user ? <Chat /> : <Navigate to={'../'} />} />
        <Route path='*' element={user ? <Main /> : <Navigate to={'../auth'} />} />
      </Routes>
    </div>
  )
}
export default App

const Main = () => {
  return (
    <div className='Main'>
      <MenuMobile />
      <div className="Main__left">  <SidebarLeft /> </div>
      <div className="Main__center">
        <Routes> {routes.map((route, index) => <Route key={index} path={route.path} element={route.element} />)} </Routes>
      </div>
      <div className="Main__right">  <SidebarRight /></div>
    </div>
  )
}