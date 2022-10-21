import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import './LogIn.css'
const ForgotPassword = () => {
  const emailRef = useRef()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)

      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox to know futher infomation')
    } catch {
      setError('Failed to reset password')
    }
    setLoading(false)
  }
  return (
    <>
      {/* <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Reset Password</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label> Email</Form.Label>
              <Form.Control type='text' ref={emailRef} required />
            </Form.Group>

            <Button disabled={loading} className='w-100 mt-2' type='submit'>
              Send
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-80 text-center mt-2'>
        Not an account? <Link to='/signup'>Sign Up</Link>
      </div>
      <div className='w-80 text-center mt-2'>
        Back to <Link to='/login'>LogIn</Link>
      </div> */}

      <div className='wrapper'>
        <div className='registration_form'>
          <div className='title'>Reset Password</div>

          <form onSubmit={handleSubmit}>
            <div className='form_wrap'>
              {message && <Alert variant='primary'>{message}</Alert>}
              <div className='input_wrap'>
                <label htmlFor='email'>Email Address</label>
                <input type='email' ref={emailRef} required />
              </div>

              <div className='input_wrap'>
                <input
                  disabled={loading}
                  type='submit'
                  value='Send'
                  className='submit_btn'
                />
              </div>
              <div className='w-80 text-center mt-2'>
                Not an account?{' '}
                <Link style={{ color: 'orange' }} to='/signup'>
                  Sign Up
                </Link>
              </div>
              <div className='w-80 text-center mt-2'>
                Back to{' '}
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

export default ForgotPassword
