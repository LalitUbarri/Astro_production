import React, { useEffect, useRef } from 'react'

export default function VideoPlayer({user}) {

    const ref=useRef();

    useEffect(()=>{
        user.videoTrack.play(ref.current)
    },[]);

  return (
    <div>
        Uid:{user.uid}
        <div ref={ref}
        style={{width:'250px',height:'250px'}}
        >
        </div>
    </div>
  )
}
