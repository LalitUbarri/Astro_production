import React, { useEffect, useState } from "react";
import "../styles/popup.css";
import $ from 'jquery';
import * as Constant from "../configuration/constants";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'

const axios = React.lazy(() => import('axios'));
const Popup = React.lazy(() => import('../components/popup'));



const MandatoryField = (props) => {
  const { t } = props;
  const [UserDetails, setUserDetails] = useState({
    profileData: localStorage["profileData"]
      ? JSON.parse(localStorage["profileData"])
      : "",
    fullname: '',
    email: '',
    location: '',
    isSuccess: false,
    showPopUp: false,
    msg: "",
    allowUpload: false,
    inEditableState: false,
    timeOfBirth: localStorage["profileData"]
      ? new Date(
        Number(
          JSON.parse(localStorage["profileData"]).find(
            (item) => item.fieldColumnName == "dob"
          ).fieldValue
        )
      )
      : new Date(),
    dateOfBirth: localStorage["profileData"]
      ? new Date(
        Number(
          JSON.parse(localStorage["profileData"]).find(
            (item) => item.fieldColumnName == "dob"
          ).fieldValue
        )
      )
      : new Date(),
  })


  const showPopUp = (msg, isSuccess) => {
    setUserDetails({
      showPopUp: true,
      msg: msg,
      isSuccess: isSuccess,
    });
  }

  const closePopUp = () => {
    $('#exampleMandatory').modal('hide')
    window.location.reload();
    setUserDetails({
      showPopUp: false,
    });
  };
  const saveProfile = (e) => {
    e.preventDefault();
    var url = Constant.ASTRO_URL + "/FlexPlatform/updateUserInfoStatus";

    var requestBody = {
      firstName: UserDetails.fullname,
      city: UserDetails.location,
      emailId: UserDetails.email
    };
    console.log(requestBody);
    console.log(requestBody);
    axios.post(url, requestBody).then(res => {
      console.log(res);
      if (res.data.status === 'SUCCESS') {

        showPopUp('Profile saved succesfully', true);
      }
    }).catch(err => {
      console.log(err);
    })
  };


  const handleChange = (e) => {
    let { name, value } = e.target;

    setUserDetails({
      ...UserDetails,
      [name]: value
    })
    // console.log(name +"" + value);
  };


  useEffect(() => {
    $('#exampleMandatory').modal({ backdrop: 'static', keyboard: false })
    console.log(props);
  }, [])


  return (
    <>
      {UserDetails.showPopUp && (
        <Popup
          heading={UserDetails.heading}
          msg={UserDetails.msg}
          button={UserDetails.button}
          closePopUp={closePopUp}
          Isicon={true}
        />
      )}
      <div
        className="modal fade Spinpopup userProfileData_container"
        id="exampleMandatory"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content mob_modal_content">
            <div className="modal-header">
              <h4> {t('fill_in_the_mandatory_fields')} </h4>
              {props.IsCloseBtn ? <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button> : null}
            </div>
            <div className="modal-body">

              <form onSubmit={saveProfile}>
                <div className="form-group">
                  <label for="fullName">{t('Full_Name')}</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullname"
                    // value={lname.fieldValue}
                    placeholder={t('Full_Name')}
                    onChange={handleChange}
                    required ></input>
                  {/* {this.state.errMsg2 !== '' ? <span style={{color:'red', fontSize:'12px'}}>{this.state.errMsg2}</span>:null} */}
                </div>
                <div className="form-group">
                  <label for="email">{t('Email')}</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    // value={email.fieldValue}
                    placeholder={t('Email')}
                    onChange={handleChange}
                    required ></input>

                </div>
                <div className="form-group">
                  <label for="city">{t('City*')}</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="location"
                    // value={lname.fieldValue}
                    placeholder={t('City*')}
                    onChange={handleChange}
                    required ></input>
                </div>
                <div className="form-group text-center">
                  <button type="submit" className="btn submitbtn"> {t('Submit')} </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const withCombine = compose(
  withTranslation()
)

export default withCombine(MandatoryField);
