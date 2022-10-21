import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import HomeLogInIn from '../Home/HomeLogInIn'
import Swal from 'sweetalert2'
import './Dashboard.css'
const DashBoard = () => {
  const history = useHistory()
  const { logout, currentUser } = useAuth()

  const [error, setError] = useState('')
  async function logOut(e) {
    e.preventDefault()

    setError('')
    try {
      await logout()
      Swal.fire({
        title: 'Đăng xuất thành công',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 2000,
      })
      history.push('/')
    } catch {
      Swal.fire({
        title: 'Đăng xuất thất bại',
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 2000,
      })
      setError('Failed to log out')
    }
  }
  console.log(currentUser)
  return (
    <>
      <HomeLogInIn></HomeLogInIn>
      {/* {Object.keys(currentUser).forEach((e) => {
        console.log(e) */}
      {/* return ( */}
      <div className='wrapper1'>
        <div className='left'>
          <img
            src='https://bootdey.com/img/Content/avatar/avatar7.png'
            alt='user'
            width='60%'
          />
        </div>
        <div className='right'>
          <div className='info'>
            <h3 style={{ textAlign: 'center' }}>Information</h3>
            <div className='info_data'>
              <div className='data'>
                <h4>Name</h4>
                <span>{currentUser.name}</span>
              </div>
              <div className='data'>
                <h4>MSSV</h4>
                <span>{currentUser.mssv}</span>
              </div>
            </div>
          </div>

          <div className='projects_data'>
            <div className='data'>
              <h4>SDT</h4>
              <span>{currentUser.sdt}</span>
            </div>
            <div className='data'>
              <h4>Email</h4>
              <span>{currentUser.email}</span>
            </div>
          </div>
        </div>
      </div>
      {/* )
      })} */}
    </>
  )
}

export default DashBoard
