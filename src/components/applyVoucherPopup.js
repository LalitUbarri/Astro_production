import React,{ useState, useEffect } from "react";
import { getCommonHeaders } from "../configuration/commonFunctions";
import apis from "../configuration/apis";
import "../styles/popup.css";
// import alert from "../images/alert.svg";
import Popup from "./popup";
// import { FRONTEND_NAME } from "../configuration/constants";
// import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import $ from "jquery";
import { useTranslation } from "react-i18next";
const ApplyVoucherPopup = (props) => {

  const [voucherData, setVoucherData] = useState({});
  const [showPopUp, setshowPopUp] = useState(false);
  const [enableLoader, setenableLoader] = useState(false);
  const [msg, setmsg] = useState("This Promocode is not valid");
  const [heading, setheading] = useState("");
  const [errorMsg, setErrorMsg] = useState('');
  // const [userProfile, setUserProfile] = useState(
  //   localStorage["userProfile"] ? JSON.parse(localStorage["userProfile"]) : {}
  // );
  const [promocode, setPromocode] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);
  const [invalidmsg, setInvalidmsg] = useState("");
  const [t] = useTranslation();

  useEffect(() => {
    // debugger;
    // applyVoucher();
    if (promocode && props.voucherApplied) {
      console.log("aasdfasdfasdf-vysh")
      applyVoucher();
    }
  }, [props.amount.value])

  const applyVoucher = () => {
    // debugger;
    var voucher = document.getElementById("voucherCode").value;
    const textPatt = /^[0-9]+$/g;
    if (voucher == "" || voucher == null) {
      $("#exampleModalCenter").modal("hide");
      setErrorMsg('error')
      setInvalidmsg("Please enter valid Voucher code");
      setSuccessPopup(true);
    } else if (
      props.amount.value == null ||
      textPatt.test(props.amount.value) === false ||
      Number(props.amount.value) == 0
    ) {
      console.log("i am hererrrrrrrrrrrrrrr");
      $("html, body").animate({ scrollTop: 0 }, "fast");
      $("#exampleModalCenter").modal("hide");
      setInvalidmsg("The Entered Voucher code is not valid. Please enter a valid voucher code. Save More!");
      setheading('Oops!');
      setErrorMsg('error')
      setSuccessPopup(true);
    } else if (Number(props.amount.value) % 50 != 0) {
      console.log("i am hererrrrrrrrrrrrrrr");
      $("html, body").animate({ scrollTop: 0 }, "fast");
      $("#exampleModalCenter").modal("hide");
      setInvalidmsg("Please enter amount in multiple of 50");
      setSuccessPopup(true);
    } else {

      var headers = getCommonHeaders();

      console.log("amount.." + props.amount.value);
      var requestBody = {
        promocode: promocode,
        productName: "Add Money",
        productCost: props.amount.value,
      };
      apis
        .authenticatePromo(requestBody, headers)
        .then((response) => response.data)
        .then((data) => {
          console.log("resp data", data);
          if (data.code == "2000") {
            ////debugger;
            {
              console.log("fetchOfferList" + data.data);
            }
            props.setVoucherApplied(true);
            props.setVoucherDataVal(data.data);
            localStorage["voucherData"] = JSON.stringify(data.data);
            localStorage["voucherThere"] = "true";
            setVoucherData(data.data);
            setenableLoader(true);
            $("#exampleModalCenter").modal("hide");
            setInvalidmsg("Voucher Applied Successfully");
            setSuccessPopup(true);
          } else if (data.code == "3010") {
            /*else if(data.code == "2009")
      {
        localStorage.clear();
        sessionStorage.clear();
        setenableLoader(false);
        setshowPopUp(true);
        setmsg('Session logout');
       
      }*/
            //alert('This voucher is not valid');
            //props.history.push(FRONTEND_NAME + "/recharge");
            //document.getElementById("exampleModalCenter").style.display = 'none';
            $("#exampleModalCenter").modal("hide");
            setmsg(t("This Promocode is not valid"));
            setshowPopUp(true);
          }
          else if (data.code === 2002) {
            $("#exampleModalCenter").modal("hide");
            setshowPopUp(true);
            setmsg(data.msg);
            setenableLoader(false);
            //props.showPopUpFunc(data.msg);
          }
          else {
            $("#exampleModalCenter").modal("hide");
            setshowPopUp(true);
            console.log(data.msg);
            setenableLoader(false);
            //props.showPopUpFunc(data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
          setenableLoader(false);
        });
    }
  };
  const setPromo = (e) => {
    setPromocode(e.target.value);
  };
  const closePopUp = () => {
    setshowPopUp(false);
    //props.history.push(FRONTEND_NAME + "/recharge");
    //return <Redirect to="/home" />
  };
  const closeSuccessPopUp = () => {
    setSuccessPopup(false);
    //props.history.push(FRONTEND_NAME + "/recharge");
    //return <Redirect to="/home" />
  };
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
        Launch demo modal
    </button> */}
      {/* <!-- Modal --> */}
      {showPopUp ? (
        <Popup
          heading={heading}
          msg={msg}
          button="Ok"
          closePopUp={closePopUp}
        />
      ) : null}
      {successPopup ? (
        <Popup
          heading={heading}
          msg={invalidmsg}
          button="Ok"
          closePopUp={closeSuccessPopUp}
          Isicon={true}
          IsiconType={errorMsg}
        />
      ) : null}

      <div
        class="modal fade popup1"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        style={{ backgroundColor: "rgba(0,0,0,0.20)" }}
      >
        <div class="modal-dialog modal-dialog-centered voucher_code_container" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                {t('Voucher_Code')}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body v-apply">
              <input
                id="voucherCode"
                placeholder={t('Enter_Voucher_Code')}
                onChange={(e) => setPromocode(e.target.value)}
              />
              <span onClick={applyVoucher}>{t('Apply')}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(ApplyVoucherPopup);
