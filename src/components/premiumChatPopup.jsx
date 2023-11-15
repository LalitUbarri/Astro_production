import React from "react";

import "../styles/popup.css";
// import alert from "../images/alert.svg";
// import success from "../images/sucess-icon.svg";
import success from "../images/sucess-icon.svg";
import error from "../images/error.png";

import { useTranslation } from "react-i18next";


const PremiumChatPopup = (props) => {
  
  const [t] = useTranslation();

  let isSuccess = props.isSuccess;

  console.log(props)
  //let isSuccess = props.isSuccess;
  let msg = props.msg;
   
    return (
      <div
        class="modal"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        {/* removed fade class from popup */}
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="cust-box modal-header">
              <h5
                class=" cust-header modal-title text-dark"
                id="exampleModalLabel"
                style={{ fontFamily: "SF-Semibold" }}
              >
                <img
                alt="alert"
                  src={isSuccess? success : error}
                  style={{ width: "21px", height: "21px", marginRight: "15px" }}
                />
                {isSuccess? t("Sucess") : t("Failure")}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={props.closePopUp}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="cust-body modal-body text-dark">{msg}</div>
            <div class="footer-box modal-footer">
              <button
                type="button"
                class="btn btn-secondary btn-same"
                data-dismiss="modal"
                onClick={props.closePopUp}
              >
                {t("Ok")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default PremiumChatPopup;
