import React, { useEffect } from 'react' 
import App from './App' 
import { useHistory } from 'react-router-dom'

export const Root = () => { 
   const history = useHistory() 

   useEffect(() => {
      return history.listen((location) => { 
         // alert(location.pathname);
         console.log(`You changed the page to: ${location.pathname}`) 
      }) 
   },[history]) 

   return ( 
    <App /> 
 ) 
}