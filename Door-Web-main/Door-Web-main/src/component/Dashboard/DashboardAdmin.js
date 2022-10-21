import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'

import HomeLogInAdmin from '../Home/HomeLogInAdmin'

import Swal from 'sweetalert2'
import './DashboardAdmin.css'
const DashBoardAdmin = () => {
  const history = useHistory()
  const { logout, currentUser, users } = useAuth()
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
  // console.log(currentUser + 'dbad')
  // console.log(currentUser.value + 'dbad1')
  return (
    <div>
      <HomeLogInAdmin />
      <table className='content-table'>
        <thead>
          <tr>
            <th class='text-center'>Name</th>
            <th class='text-center'>MSSV</th>
            <th class='text-center'>SDT</th>
            <th class='text-center'>Email</th>
            <th class='text-center'>Password</th>
          </tr>
        </thead>
        <tbody>
          {currentUser? currentUser.map((e) => {
          //  console.log(e)
            return (
              <tr>
                <td>{e.name}</td>
                <td>{e.mssv}</td>
                <td>{e.sdt}</td>
                <td>{e.email}</td>
                <td>{e.password}</td>
              </tr>
            )
          })
        : null
        }
        </tbody>
      </table>
    </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default DashBoardAdmin
