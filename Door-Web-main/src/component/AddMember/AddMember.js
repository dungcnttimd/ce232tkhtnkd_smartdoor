import React, { useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { db, database } from '../../firebase'
import Swal from 'sweetalert2'
import './AddMember.css'
import HomeLogInIn from '../Home/HomeLogInIn'

import HomeLogInAdmin from '../Home/HomeLogInAdmin'
function AddMember() {
  const [id, setID] = useState()
  var firstCard = true
  const hotenRef = useRef()
  const mssvRef = useRef()
  const sdtRef = useRef()
  const emailRef = useRef()
  const cardIDRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup, currentUser } = useAuth()
  const history = useHistory()

  function cardRequest() {
    database.ref('cardRequest').set('o')
    database.ref('cardRequest').on('value', (snapshot) => {
      console.log(snapshot.val() + 'snapshot val')
      var value = snapshot.val()
      console.log(value + 'card id ne')
      if (value != 'o' && !firstCard) {
        //  cardIDRef.current.val(value.cardID)
        // cardIDRef.current.value = cardIDRef.val(value.cardID)
        // const cardID = cardIDRef.current.value
        // const cardID1 = cardIDRef.val(value.cardID)
        // console.log('card id ne ' + cardID)
        // console.log('card id ne ' + cardID1)
        console.log(value.cardID + ' id nde')
        cardIDRef.current.value = value.cardID

        console.log(cardIDRef + 'cardID lay dc')
        // console.log(value + 'value ne')
      }
      firstCard = false
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setLoading(true)

      await signup(emailRef.current.value, passwordRef.current.value).then(
        (res) => {
          db.collection('users').doc(res.user.uid).set({
            // db.collection('users').doc(uid).set({
            // user_id: uid,
            name: hotenRef.current.value,
            email: emailRef.current.value,
            mssv: mssvRef.current.value,
            sdt: sdtRef.current.value,
            password: passwordRef.current.value,
            role: 'user',
          })

          database.ref('allowedUids/' + res.user.uid).set(true)
          database
            .ref('users/' + res.user.uid)
            .set({
              name: hotenRef.current.value,
              email: emailRef.current.value,
              mssv: mssvRef.current.value,
              cardID: cardIDRef.current.value,
              sdt: sdtRef.current.value,
              password: passwordRef.current.value,
              role: 'user',
            })

            .catch((error) => {
              var errorMessage = error.message
              alert('Sign up error: ' + errorMessage)
              console.log(error)
            })
        }
      )
      document.getElementById('formAdd').reset()

      Swal.fire({
        title: 'Đăng ký thành công',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 2000,
      })
    } catch (error) {
      setError('Faile to create an account')
      Swal.fire({
        title: 'Đăng ký thất bại',
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 2000,
      })
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <div>
      <HomeLogInIn></HomeLogInIn>
      <div className='wrapperaddne'>  
        <div className='registration_formne'>
          <div className='title'>Add Member</div>

          <form onSubmit={handleSubmit} id='formAdd'>
            <div className='form_wrap'>
              <div className='input_wrap'>
                <label htmlFor='name'>Họ Tên</label>
                <input type='text' ref={hotenRef} required />
              </div>
              <div className='input_wrap'>
                <label htmlFor='mssv'>MSSV</label>
                <input type='text' ref={mssvRef} required />
              </div>
              <div className='input_wrap'>
                <label htmlFor='sdt'>Số điện thoại</label>
                <input type='text' ref={sdtRef} required />
              </div>
              <div className='input_wrap'>
                <label htmlFor='cardID'>Card ID</label>
                <input type='text' ref={cardIDRef} required />
              </div>

              <div className='input_wrap'>
                <label htmlFor='email'>Email Address</label>
                <input type='email' ref={emailRef} required />
              </div>

              <div className='input_wrap'>
                <label htmlFor='password'>Password</label>
                <input type='password' ref={passwordRef} required />
              </div>
              <div className='input_wrap'>
                <label htmlFor='password'>Confirm Password</label>
                <input type='password' ref={passwordConfirmRef} required />
              </div>
              <div className='input_wrap'>
                <button className='submit_btn' onClick={cardRequest}>
                  Request ID
                </button>
              </div>

              <div className='input_wrap'>
                <input
                  disabled={loading}
                  type='submit'
                  value='Submit'
                  className='submit_btn'
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddMember
