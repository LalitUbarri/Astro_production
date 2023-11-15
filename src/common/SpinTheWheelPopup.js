import React, { useEffect, useState } from "react";
import "../styles/popup.css";
import $ from 'jquery';
import SpinTheWheel1 from "./SpinTheWheel1";
import SpinTheWheel from "./SpinTheWheel";

const SpinTheWheelPopup = (props) => {
    const [ShowSpin, setShowspin] = useState(false);
    const [IsReset, setIsReset] = useState(undefined);
    // const [places, setplaces] = useState(['Pizzas', 'Sandw', 'Salads', 'Soup', 'Japanese', 'Pastas','Pizzas', 'Sandw', 'Salads', 'Soup', 'Japanese', 'Pastas'])

    useEffect(() => {
        setTimeout(()=>{
            setShowspin(true)
            $('#exampleModalCenter').modal('show')
        },1000)
    },[])

    const ResetHundle = () =>{
      setIsReset(0)
    }
  return (
    <>

{ ShowSpin ? <div class="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content SpinWheelBg" onClick={ResetHundle}>
    <div class="modal-header">
      {/* <h5 class="modal-title" id="exampleModalCenter">Modal title</h5> */}
      <button onClick={ResetHundle} type="button" class="close"
          data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
      <SpinTheWheel rotate = {IsReset} easeOut={IsReset} />
    </div>
  </div>
</div>
</div>:null}
    </>
  );
};
export default SpinTheWheelPopup;
