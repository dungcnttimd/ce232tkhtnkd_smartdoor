import React, { useEffect } from 'react'
import HomeLogInIn from '../Home/HomeLogInIn'
import { Video } from 'react-video-stream'
import { useState,useCallback } from 'react'
import axios from 'axios';
import { Replay } from 'vimond-replay';
import ReactPlayer from 'react-player';
import { Stream } from "react-streams"
import {useStream} from 'react-fetch-streams';
import "../AddMember/AddMember.css"

const url = 'http://localhost:3001/user/stream'
const fetchParams = {mode: 'cors'}
 const Streaming = () => {
  // const [data, setData] = useState({});
  //   const onNext = useCallback(async res => {
  //       const data = await res.json();
  //       setData(data);
  //   }, [setData]);
  //   useStream('http://localhost:3001/user/stream', {onNext,fetchParams});

  //   return (
  //       <React.Fragment>
  //        {data}
  //       </React.Fragment>
  //   );
    // useEffect(() => {
    //     // POST request using fetch inside useEffect React hook
    //     const requestOptions = {
    //         method: 'GET',
    //     };
    //     fetch('http://localhost:3001/user/stream', requestOptions)
    //         .then(response => response.json())
    // }, []);
    // return (
       
    //     <div>
    //          <HomeLogIn></HomeLogIn>
    //       <Video
    //         className='video-class'
    //         controls={true}
    //         autoPlay={true}
    //          remoteUrl={url}
    //         muted="muted"
    //       />
    //     </div>
    //   )

   return(
      <div className='streaming'>
        <HomeLogInIn></HomeLogInIn>
        <div className='streamm'>
          {/* <h1 style={{textAlign : "center", color : "black", fontSize:"80px"}}>Home</h1> */}
         <ReactPlayer width='1600px' height = '900px' controls muted url  = 'http://localhost:3000/live/STREAM_NAME.flv'
       onReady={()=> console.log("onReady Callback")}
       onStart={()=> console.log("onStart Callback")}
       onPause={()=> console.log("onPause Callback")}
       onEnded={()=> console.log("onEnded Callback")}
       onError={()=> console.log("onError Callback")}
       >
       </ReactPlayer>
       </div>
      </div>
   )


   }
export default Streaming
