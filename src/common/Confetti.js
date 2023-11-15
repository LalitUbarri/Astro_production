import React from 'react'
// import useWindowSize from 'react-use/'
import Confetti from 'react-confetti'
import '../styles/SpinTheWheel.css'

export default () => {
//   const { width, height } = useWindowSize()
const width = window.innerWidth;
const height = window.innerHeight;
// alert(width)

  return (
    <Confetti
    className='cong'
      width={width}
      height={height}
    />
  )
}