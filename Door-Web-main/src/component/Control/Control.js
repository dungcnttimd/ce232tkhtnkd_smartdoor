import React from 'react'
import './Control.css'
import HomeLogInIn from '../Home/HomeLogInIn'
import { database } from '../../firebase'
import { useRef, useState, useEffect } from 'react'
import { BiDoorOpen } from 'react-icons/bi'
import Swal from 'sweetalert2'
const Control = () => {
  const [body, setBody] = useState('Open')
  const btnRef = useRef()
  const open = 'Open'
  const close = 'Close'
  const changeText = (text) => setBody(text)
  var buttonState = true
  // function toggle() {
  //   buttonState = !buttonState
  //   if (buttonState) {
  //     database.ref('door').set('f')
  //     console.log('f')
  //     dangerouslySetInnerHTML = { __html: 'First &middot; Second' }
  //   } else {
  //     database.ref('door').set('o')
  //     console.log('o')
  //   }
  // }
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     database.ref('door').set('f')
  //   }, 5000)
  //   return () => clearTimeout(timer)
  // }, [openDoor])
  function openDoor() {
    database.ref('door').set('o')
    console.log('f')
    Swal.fire({
      title: 'Close door after 5s',
      icon: 'success',
      confirmButtonText: 'Ok',
      timer: 5000,
    })
    // setTimeout(() => {
    //   database.ref('door').set('f')
    // }, 5000)
  }
  function closeDoor() {
    database.ref('door').set('f')
    console.log('f')
  }
  return (
    <div>
      {/* <form onSubmit={toggle}> */}
      <HomeLogInIn></HomeLogInIn>
      <div className='wrappercontrol'>

        {/* <div className='icon'>
          <BiDoorOpen></BiDoorOpen>
          <span class='bi bi-door-open' style={{color: 'black'}}></span>

        </div> */}
        {/* <div>
         <h1>Door</h1>
        </div>
      
        <div className='btn'>
          <button onClick={openDoor}>Open</button>
        </div>
        <div className='btn'>
          <button onClick={closeDoor}>Close</button>
        </div> */}
        
        <main id="todolist">
  <h1>
   Devices
    <span>Make you life become easier</span>
  </h1>

  <div >
    <transition-group name="todolist" tag="ul">
      <li >
        <span class="label">Door</span>
        <div class="actions">
          <button onClick={openDoor} style={{marginRight : "1rem"}} >
            Open
          </button>
          <button onClick={closeDoor} >
            Close
          </button>
        </div>
      </li>
    </transition-group>
    
  </div>

</main>
       
       
      </div>
      {/* </form> */}
  

    </div>
     
   
  )
}

export default Control
