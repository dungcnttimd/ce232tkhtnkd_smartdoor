import React, { useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { db, database } from '../../firebase'
import Swal from 'sweetalert2'
import './SignUp.css'

const SignUp = () => {
  const hotenRef = useRef()
  const mssvRef = useRef()
  const sdtRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const cardIDRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup, currentUser } = useAuth()
  const history = useHistory()

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
            cardID: cardIDRef.current.value,
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
      //setupUI(currentUser)
      Swal.fire({
        title: 'Đăng ký thành công',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 2000,
      })

      history.push('/login')
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
    <>
      {/* <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Họ Tên</Form.Label>
              <Form.Control type='text' ref={hotenRef} required />
            </Form.Group>
            <Form.Group id='email'>
              <Form.Label>MSSV</Form.Label>
              <Form.Control type='text' ref={mssvRef} required />
            </Form.Group>
            <Form.Group id='email'>
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control type='text' ref={sdtRef} required />
            </Form.Group>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>

            <Form.Group id='passwordl'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Form.Group id='passwordConfirm'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-2' type='submit'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        ALready have an account?{' '}
        <Link style={{ color: 'orange' }} to='/login'>
          Log In
        </Link>
      </div> */}

      <div className='wrapper'>
        <div className='registration_form_register'>
          <div className='title'style={{color : "white" , textAlign: "center", fontSize : "40px"}}>Registration Form</div>

          <form onSubmit={handleSubmit}>
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
                <input
                  disabled={loading}
                  type='submit'
                  value='Sign Up'
                  className='submit_btn'
                />
              </div>
              <div className='w-100 text-center mt-2'>
                ALready have an account?{' '}
                <Link style={{ color: 'orange' }} to='/login'>
                  Log In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
