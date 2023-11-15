import React from "react";

import "../styles/popup.css";
import alert from "../images/alert.svg";
import success from "../images/sucess-icon.svg";
import { FRONTEND_NAME } from "../configuration/constants";

import { useTranslation } from "react-i18next";
import {useHistory} from 'react-router-dom'


const Popup1 = (props) => {    
  const history = useHistory()
  let isSuccess = props.msg.isSuccess;

  const [t]= useTranslation();
  
  // const commenFunction = () => {
  //   props.closePopUp();
  // }

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Launch demo modal
            </button> */}
      {/* <!-- Modal --> */}
      <div
        class="modal fade popup1"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                <img src={isSuccess ? success : alert} alt="img" />
                {t("Alert!")}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => 
                  isSuccess && 
                  history.push({ pathname: FRONTEND_NAME + "/astroMall" })
                }
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">{t(props.msg.msg)}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Popup1;
