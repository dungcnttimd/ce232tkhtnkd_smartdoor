import React from 'react'
import './Control.css'
import HomeLogInAdmin from '../Home/HomeLogInAdmin'
import HomeLogInIn from "../Home/HomeLogIn"
import { database } from '../../firebase'
import { useRef, useState } from 'react'
import { BiDoorOpen } from 'react-icons/bi'
const ControlAdmin = () => {
  const [body, setBody] = useState('Open')
  const btnRef = useRef()

  const changeText = (text) => setBody(text)
  var buttonState
  function openDoor() {
    database.ref('door').set('o')
    console.log('f')
  }
  function closeDoor() {
    database.ref('door').set('f')
    console.log('f')
  }
  return (
    <>
      {/* <form onSubmit={toggle}> */}
      {/* <HomeLogInAdmin></HomeLogInAdmin> */}
      <HomeLogInIn></HomeLogInIn>
      <div className='door'>
        <div className='icon'>
          <BiDoorOpen></BiDoorOpen>
        </div>
        <div className='btn'>
          <button onClick={openDoor}>Open</button>
        </div>
        <div className='btn'>
          <button onClick={closeDoor}>Close</button>
        </div>
        {/* <div className='btn'>
            <input type='submit' ref={btnRef} value='Open' />
          </div> */}
      </div>
      {/* </form> */}
    </>
  )
}

export default ControlAdmin
