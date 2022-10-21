import React, { useState, useRef } from 'react'

import { useAuth } from '../../context/AuthContext'
import { useHistory, Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import './HomeLogIn.css'
import { database } from '../../firebase'
const HomeLogInAdmin = () => {
  const history = useHistory()
  const { logout, currentUser } = useAuth()

  const [error, setError] = useState('')

  function cardRequest() {
    database.ref('cardRequest').set('o')
  }

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
  function switchDashboard(e) {
    e.preventDefault()
    history.push('/dashboard')
  }
  function switchDashboardAdmin(e) {
    e.preventDefault()
    history.push('/dashboardAdmin')
  }
  function switchAddMember(e) {
    e.preventDefault()
    history.push('/addMember')
  }
  function switchControl(e) {
    e.preventDefault()
    history.push('/control')
  }
  function switchStream(e) {
    e.preventDefault()
    history.push('/stream')
  }
  function myFunction() {
    var x = document.getElementById('myTopnav')
    if (x.className === 'topnav') {
      x.className += ' responsive'
    } else {
      x.className = 'topnav'
    }
  }

  // function signIn() {
  //   // console.log(email)
  //   // console.log(pass)

  //   database.ref('door').on('value', (snapshot) => {
  //     const data = snapshot.val()
  //     console.log(data)
  //     if (data == 'f') {
  //       console.log('f')
  //       buttonState = true
  //     } else {
  //       console.log('o')
  //       buttonState = false
  //     }
  //   })
  // }

  return (
    <>
      {/* <Navbar
        fixed='top'
        collapseOnSelect
        expand='lg'
        bg='success'
        variant='dark'
      >
        <Container>
          <Navbar.Brand style={{ paddingRight: '16px', marginLeft: '-80px' }}>
            REACT
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse
            id='responsive-navbar-nav'
            className='justify-content-end'
          >
            <Nav>
              <Nav.Link
                // href='/dashboard'
                className='logged-in'
                style={{ display: 'block' }}
                onClick={switchDashboard}
              >
                Profile
              </Nav.Link>
              <Nav.Link
                className='logged-in'
                style={{ display: 'none' }}
                onClick={switchDashboardAdmin}
              >
                Dashboard
              </Nav.Link> */}

      {/* {currentUser.map((e) => {
        console.log(e.email + 'email khi map ne')
        if (e.email === 'user@gmail.com')
          return (
            <>
              <Nav.Link
                className='logged-in'
                style={{ display: 'block' }}
                onClick={switchDashboardAdmin}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                // href='/dashboard'
                className='logged-in'
                style={{ display: 'none' }}
                onClick={switchDashboard}
              >
                Profile
              </Nav.Link>
            </>
          )
      })} */}

      {/* {currentUser.email !== 'admin@gmail.com' && (
        <div>
          <div
            // href='/dashboard'
            className='logged-in'
            style={{ display: 'none' }}
            onClick={switchDashboard}
          >
            Profile
          </div>
          <div
            className='logged-in'
            style={{ display: 'block' }}
            onClick={switchDashboardAdmin}
          >
            Dashboard
          </div>

          <div
            className='logged-in'
            style={{ display: 'block' }}
            onClick={switchControl}
          >
            Control
          </div>
          <div
            className='logged-in'
            style={{ display: 'block' }}
            onClick={logOut}
          >
            Log Out
          </div>
        </div>
      )}

      {currentUser.email === 'admin@gmail.com' && (
        <div>
          <div
            className='logged-in'
            style={{ display: 'block' }}
            onClick={switchDashboardAdmin}
          >
            Dashboard
          </div>

          <div
            className='logged-in'
            style={{ display: 'block' }}
            onClick={switchControl}
          >
            Control
          </div>
          <div
            className='logged-in'
            style={{ display: 'block' }}
            onClick={logOut}
          >
            Log Out
          </div>
        </div>
      )} */}

      {/* <div className='topnav' id='myTopnav'>
        <a href='#home' className='active'>
          Home
        </a>
        <a onClick={switchDashboard}>Profile</a>

        <a onClick={switchAddMember}>Add Member</a>
        <a onClick={switchControl}>Control</a>
        <a onClick={switchStream}>Streaming</a>
        <a onClick={logOut}>Log Out</a>
      </div> */}
      <div>
<section id="home">
		
			<div class="overlay">
			
				<nav role="navigation">
					<ul class="vertical-list">
						{/* <li><a href="#home">Home</a></li>
						<li><a href="#about">About me</a></li>
						<li><a href="/login">Log In</a></li>
						<li><a href="/signup" >Register</a></li> */}
            {/* <a href='#home' className='active'>
          Home Admin
        </a> */}
        <li><a onClick={switchDashboardAdmin}>Home Admin</a></li>
        <li><a onClick={switchDashboardAdmin}>Users</a></li>
        <li><a onClick={switchAddMember}>Add</a></li>
        <li><a onClick={logOut}>Log Out</a></li>
					</ul>
				</nav>
				

			
				<div class="container">
					{/* <h1><span class="logo">DAT</span><small>Automatic Lock</small></h1> */}
						{/* <ul class="social-links vertical-list">
						<li><a href="https://twitter.com/labDevelopments" class="noir twitter" target="_blank">Twitter</a></li>
						<li><a href="https://www.planecode.co.uk" class="noir linkedin" target="_blank">Facebook</a></li>
						<li><a href="https://www.planecode.co.uk" class="noir linkedin" target="_blank">Instagram</a></li>
					</ul> */}
				</div>
			
			</div>
		
		</section>
	

    </div>
    </>
  )
}

export default HomeLogInAdmin
