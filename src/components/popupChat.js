import React from "react";
import success from "../images/newImages/Right-Correct-check.png";
import error from "../images/newImages/wrong-icon.png";
import WaitIcon from "../images/newImages/waiting.png";
import { FRONTEND_NAME } from '../configuration/constants'
import { useHistory } from 'react-router-dom'
import { useTranslation } from "react-i18next";

export default function Popup(props) {
  const history = useHistory();

  const [t] = useTranslation();

  const commenFunction = () => {
    props.closePopUp();
    if (type === 'payment') {
      history.push(FRONTEND_NAME + '/wt')
      return
    }
    else if (type === 'report') {
      history.push(FRONTEND_NAME + '/report')
      return
    } else if (type === 'recharge') { history.push(FRONTEND_NAME + '/recharge') }

    //history.push(FRONTEND_NAME + '/home')
  }

  let isSuccess = props.isSuccess;
  let chatEnded = props.chatEnded;
  let msg = props.msg;
  const type = props.type ? props.type : 'common'


  return (
    <div
      class="modal exampleModalCenter11"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      {/* removed fade class from popup */}
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class={`modal-content mob_alart_container ${props.widthSize}`}>
          <div class="cust-box modal-header">
            <div className="icon_alert">
              <img
              alt="img"
                src={chatEnded ? success : (isSuccess ? success : props.alert_panditMsg === 'pandit not reply' ? WaitIcon : error)}
                style={{ width: "61px", height: "61px", }}
              />
              <p className="alert_msg mt-2"> {t(chatEnded ? "Chat ended" : (isSuccess ? props.successTitle : props.alert_panditMsg === 'pandit not reply' ? "Wait" : "Oops!!"))}</p>
            </div>

            {/* <h5
              class=" cust-header modal-title text-dark"
              id="exampleModalLabel"
              style={{ fontFamily: "SF-Semibold" }}
            >
              <img
                src={chatEnded ? success : (isSuccess ? success : error)}
                style={{ width: "51px", height: "51px", marginRight: "15px" }}
              />
              {t(chatEnded ? "Chat ended" : (isSuccess ? "Sucess" : "Failure"))}
            </h5> */}
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
          <div class={props.Isokbutton ? "cust-body modal-body text-gray" : "cust-body modal-body text-gray mb-4"}>{msg}</div>
          <div class="footer-box modal-footer">

            {props.Isokbutton ? <button
              type="button"
              class="btn btn-secondary btn-same"
              data-dismiss="modal"
              onClick={ props.onClickHandle ? props.onClickHandle : commenFunction}
            >
              {t('Ok')}
            </button> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
