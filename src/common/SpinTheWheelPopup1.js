import React, { useEffect, useState } from "react";
import "../styles/popup.css";
import $ from 'jquery';
import SpinTheWheel from "./SpinTheWheel";
import Confetti from "./Confetti";

const SpinTheWheelPopup1 = (props) => {
    
    useEffect(() => {
        $('#exampleModalCenter1').modal('show')
    },[])


  return (
    <>
      <div
          class="modal fade Spinpopup"
          id="exampleModalCenter1"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                 <Confetti />
                 {props.resultData}
              </div>
            </div>
          </div>
        </div> 
    </>
  );
};
export default SpinTheWheelPopup1;
