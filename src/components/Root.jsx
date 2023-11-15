import React, { useEffect } from 'react' 

import { useHistory } from 'react-router-dom'

export const Root = () => { 
   const history = useHistory() 

   useEffect(() => {
      return history.listen((location) => { 
         console.log(`You changed the page to: ${location.pathname}`) 
      }) 
   },[history]) 

   
}