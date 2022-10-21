import React, { useRef } from 'react'
import './Home.css'
import { database } from '../../firebase'

const Home = () => {
  const doorRef = useRef()
  function myFunction() {
    var x = document.getElementById('myTopnav')
    if (x.className === 'topnav') {
      x.className += ' responsive'
    } else {
      x.className = 'topnav'
    }
  }
  // var navLinks = document.getElementById('navLinks')
  // function showMenu() {
  //   navLinks.style.right = '0'
  // }
  // function hideMenu() {
  //   navLinks.style.right = '-200px'
  // }

  return (
    // <>
    //   <div className='topnav' id='myTopnav'>
    //     <img src='https://ce.uit.edu.vn/images/Logo_CE_burned.png' alt='' />
    //     <span>Câu lạc bộ học thuật CEEC</span>

    //     {/* <a href='/' className='active'>
    //       Home
    //     </a> */}

    //     <a href='/login'>Log In</a>
    //     <a href='/signup'>Sign Up</a>
    //     <a className='icon' onClick={myFunction}>
    //       <i className='fa fa-bars' aria-hidden='true'></i>
    //     </a>
    //   </div>
    //   <div className='text-box'>{/* <h1>Made by Man Dat</h1> */}</div>
    //   <div className='activity'>
    //     <h3 style={{ fontSize: '50px', fontWeight: 'bold', color: 'orange' }}>
    //       Our Activities
    //     </h3>
    //     <div className='row'>
    //       <div className='ac-col'>
    //         <img
    //           src='https://ce.uit.edu.vn/images/info/PhotoNews/r0.jpg'
    //           alt=''
    //         />
    //         <div className='layer'>
    //           <h3>Embedded</h3>
    //         </div>
    //       </div>
    //       <div className='ac-col'>
    //         <img
    //           src='https://ce.uit.edu.vn/images/info/PhotoNews/r2.png'
    //           alt=''
    //         />
    //         <div className='layer'>
    //           <h3>Image Processing</h3>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div class='footer-section'>
    //     <div class='single-cta'>
    //       <i class='fas fa-map-marker-alt'></i>
    //       <div class='cta-text'>
    //         <h4>Find us</h4>
    //         <span>Trường ĐH CNTT</span>
    //       </div>
    //     </div>

    //     <div class='single-cta'>
    //       <i class='fas fa-phone'></i>
    //       <div class='cta-text'>
    //         <h4>Call us</h4>
    //         <span>9876543210 0</span>
    //       </div>
    //     </div>

    //     <div className='single-cta'>
    //       <i class='far fa-envelope-open'></i>
    //       <div class='cta-text'>
    //         <h4>Mail us</h4>
    //         <span>mail@info.com</span>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <div>
<section id="home">
		
			<div class="overlay">
			
				<nav role="navigation">
					<ul class="vertical-list">
						<li><a href="#home">Home</a></li>
						<li><a href="#about">About me</a></li>
						<li><a href="/login">Log In</a></li>
						<li><a href="/signup" >Register</a></li>
					</ul>
				</nav>
				

			
				<div class="container">
					<h1><span class="logo">DAT</span><small>Automatic Lock</small></h1>
						{/* <ul class="social-links vertical-list">
						<li><a href="https://twitter.com/labDevelopments" class="noir twitter" target="_blank">Twitter</a></li>
						<li><a href="https://www.planecode.co.uk" class="noir linkedin" target="_blank">Facebook</a></li>
						<li><a href="https://www.planecode.co.uk" class="noir linkedin" target="_blank">Instagram</a></li>
					</ul> */}
				</div>
			
			</div>
		
		</section>
	

    </div>
   
  )
}

export default Home
