import React from "react";

import "../styles/popup.css";
import alert from "../images/alert.svg";
import waiting from '../images/newImages/waiting.png';
const Popup2 = (props) => {
  return (
    <>
      <div
        class="modal fade popup22 "
        id="exampleModalCenter"
        tabIndex="-1"
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
              <div class="modal_img text-center">
                <img src={waiting} width={'60px'} alt="/" />
              </div>
              <div >
                <p></p>
                <p class="text-center"><strong>Are you sure you wnat to leave this page?</strong></p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-cancel btn-same No_btn"
                  data-dismiss="modal"
                >
                  No
                </button>
                <button onClick={props.chatEndHandle} type="button" class="btn btn-recharge btn-same No_btn">
                  YES
                </button>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  );
};
export default Popup2;
