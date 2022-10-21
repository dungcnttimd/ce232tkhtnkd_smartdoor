import React, { useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { database } from '../../firebase'
import "./LogIn.css"
import Swal from 'sweetalert2'
const LogIn = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  var buttonState = true
  var exist = true
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, currentUser } = useAuth()
  const history = useHistory()
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)

      if (emailRef.current.value === 'admin@gmail.com') {
        await login(emailRef.current.value, passwordRef.current.value)
        // .then(
        //   (user) => {
        //     if (user) {
        //       database.ref('door').on('value', (snapshot) => {
        //         const data = snapshot.val()
        //         console.log(data)
        //         if (data == 'f') {
        //           buttonState = true
        //         } else {
        //           buttonState = false
        //         }
        //       })
        //     }
        //   }
        // )

        history.push('/HomeLogInAdmin')
        Swal.fire({
          title: 'Đăng nhập thành công',
          icon: 'success',
          confirmButtonText: 'Ok',
          timer: 2000,
        })
      } else {
        await login(emailRef.current.value, passwordRef.current.value).then(
          (res) => {
            if (res) {
              database.ref('door').on('value', (snapshot) => {
                const data = snapshot.val()
                console.log('data ne ' + data)
                console.log('res ne ' + res.user.email)
                var time = new Date(),
                  time =
                    time.getHours() +
                    ':' +
                    time.getMinutes() +
                    ':' +
                    time.getSeconds()
                var day = new Date(),
                  day =
                    day.getFullYear() +
                    '-' +
                    (day.getMonth() + 1) +
                    '-' +
                    day.getDate()

                if (data === 'o') {
                  // var newPostKey = database.ref().child('records').push().key
                  // updates['records/' + res.user.uid + '/' + newPostKey] = tgian

                  database.ref('records/' + res.user.uid).push({
                    email: res.user.email,
                    day: day,
                    time: time,
                  })
                }
              })
            }
          }
        )

        // await login(emailRef.current.value, passwordRef.current.value).then(
        //   (res) => {
        //     database.ref('records/' + res.user.uid).set({
        //       email: emailRef.current.value,
        //     })
        //   }
        // )
        console.log(emailRef.current.value + ' login user')

        history.push('/HomeLogIn')
        Swal.fire({
          title: 'Đăng nhập thành công',
          icon: 'success',
          confirmButtonText: 'Ok',
          timer: 2000,
        })
      }
    } catch (error) {
      //}
      Swal.fire({
        title: 'Đăng nhập thất bại',
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 2000,
      })
      setError('Failed to sign in')
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <div className='wrapper'>
      <div className='registration_form_login'>
        <div className='title' style={{color : "white" , textAlign: "center", fontSize : "40px"}}>Login Form</div>

        <form onSubmit={handleSubmit}>
          <div className='form_wrap'>
            <div className='input_wrap'>
              <label htmlFor='email'>Email Address</label>
              <input type='email' ref={emailRef} required />
            </div>

            <div className='input_wrap'>
              <label htmlFor='password'>Password</label>
              <input type='password'  ref={passwordRef} required />
            </div>
            <div className='input_wrap'>
              <input
                disabled={loading}
                type='submit'
                value='Sign In'
                className='submit_btn'
              />
            </div>
            <div className='w-100 text-center mt-2'>
              <Link style={{ color: '#E4AE5A' }} to='/forgotpassword'>Forgot Password?</Link>
            </div>
            <div className='w-100 text-center mt-2'style={{ color: 'black' }}>
              Not an account? 
              <Link style={{ color: '#11F2ED', marginLeft: "3px" }} to='/signup'>
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
   
    
  )
}

export default LogIn
