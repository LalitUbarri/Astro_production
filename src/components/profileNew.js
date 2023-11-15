import React from "react";
import Header from "../common/Header2";
// import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";
import apis from "../configuration/apis";
import SideMenu from "../common/SideMenu";
import $ from "jquery";
import User from "../images/user.svg";
import Footer from "../common/Footer";
import * as Constant from "../configuration/constants";
import { getApi, postApi } from "../configuration/apis";
import * as ErrorConstant from "../configuration/errorConstants";
import "../styles/form.css";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
// import { getKeyValues } from "../configuration/commonFunctions";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { orange } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { getCommonHeaders } from "../configuration/commonFunctions";
// import { APP_NAME, FRONTEND_NAME } from "../configuration/constants";
// import apiUrls from "../configuration/apiUrls";
import Popup from "../components/popup";
// import pro from "../images/pro.png";
import tick from "../images/proTick.svg";
// import { Switch } from "@material-ui/core";
// import BottomHeader from "../common/BottomHeader";
import { withTranslation } from 'react-i18next';
import Chat_Talk_Header from "../common/Chat&Talk_Header";
// import { compose } from 'redux'

const FIELD_NAMES = [
  "fname",
  "lname",
  "email",
  "topicofconcern",
  "dob",
  "state",
  "timeofbirth",
  "birth",
  "city",
  "comments",
  "maritalstatus",
  "occupation",
];

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: orange,
  },
});

class ProfileNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inEditableState: false,
      IsTrue: false,
      errMsg1: '',
      errMsg2: "",
      errMsg3: '',
      errMsg4: '',
      profileData: localStorage["profileData"]
        ? JSON.parse(localStorage["profileData"])
        : "",
      showPopUp: false,
      msg: "",
      errorMsg: '',
      allowUpload: false,
      isSuccess: false,
      selectedImage: false,
      profileImage: localStorage["profileData"]
        ? JSON.parse(localStorage["profileData"]).find(
          (item) => item.fieldColumnName == "profile_pic_url"
        ).fieldValue
        : "",
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
      pincode: localStorage["profileData"]
        ? JSON.parse(localStorage["profileData"]).find(
          (item) => item.fieldColumnName == "pin"
        ).fieldValue
        : "",
    };
    this.uploadFile = this.uploadFile.bind(this);
    this.fileUpload = React.createRef();
  }
  componentWillMount() {
    this.getUserProfileDetails();
  }
  componentDidMount() {
    if (this.state.inEditableState) $("#profile :input").prop("disabled", true);
    this.getUserProfileDetails();
  }


  setIsEditable = () => {
    this.setState({ inEditableState: true, allowUpload: true });
  };

  showFileUpload = () => {
    if (this.state.allowUpload) this.fileUpload.current.click();
  };

  uploadFile(event) {
    if (
      event &&
      event.target &&
      event.target.files &&
      event.target.files.length > 0
    ) {
      this.setState({
        profileImage: URL.createObjectURL(event.target.files[0]),
        selectedImage: event.target.files[0],
      });
    } else {
      this.showPopUp("Please select a valid image !", false);
    }
  }

  getUserProfileDetails = () => {
    console.log("inside getUserProfileDetails method");
    var url = Constant.ASTRO_URL + Constant.GET_USER_PROFILE_DETAILS;
    const headers = getCommonHeaders();
    headers.msisdn = localStorage["selectedCountryCode"] + localStorage["msisdn"];
    getApi(url, headers)
      .then((response) => response.data)
      .then((data) => {
        if (data && data.code == ErrorConstant.SUCCESS_CODE) {
          console.log("data ", data.data);
          try {
            this.setState({ enableLoader: true });
            let profileData = JSON.stringify(data.data.profileDataList);

            localStorage["profileData"] = profileData;

            let profilePicObj = profileData
              ? profileData.find(
                (item) => item.fieldColumnName === "profile_pic_url"
              )
              : "";
            let dob = profileData
              ? new Date(
                Number(
                  JSON.parse(localStorage["profileData"]).find(
                    (item) => item.fieldColumnName == "dob"
                  ).fieldValue
                )
              )
              : "";

            this.setState({
              profileImage: profilePicObj ? profilePicObj.fieldValue : "",
              timeOfBirth: dob,
              dateOfBirth: dob,
            });

            // if(shouldRedirect) {
            //   this.props.history.push(FRONTEND_NAME+"/home");
            // }
          } catch (error) {
            console.log("exception occured");
            this.toggleShowMsg("Something went wrong");
            this.setState({ enableLoader: false });
          }
        } else {
          console.log(
            "Error code from login API : ",
            data.code,
            "with msg : ",
            data.msg
          );
          this.setState({
            showPopUp: true,
            msg: data.msg,
            button: "Ok",
          });
          this.setState({ enableLoader: false });
          return;
        }
      })
      .catch((error) => {
        console.log();
        console.error("error", error);
        this.setState({ enableLoader: false });
      });
  };

  saveProfileProcess = () => {
    if (this.state.selectedImage) this.saveProfileImage();
    else this.saveProfile();
  };

  saveProfileImage = () => {
    // Build formData object.
    let formData = new FormData();

    formData.append("uploadCategory", "Profile");
    formData.append("displayTitle", "Profile");
    formData.append("uploadFile", this.state.selectedImage);
    var url = Constant.ASTRO_URL + Constant.UPLOAD_FILE;
    const headers = getCommonHeaders();
    headers.msisdn = localStorage["msisdn"];
    postApi(url, headers, formData)
      .then((response) => response.data)
      .then((data) => {
        if (data && data.code == ErrorConstant.SUCCESS_CODE) {
          console.log("data ", data.data);
          try {
            this.setState({
              profileImage: data.data.imageUrl,
            });
            this.saveProfile();
          } catch (error) {
            console.log("exception occured" + error);
            this.setState({ enableLoader: false });
          }
        } else {
        }
      });
  };

  saveProfile = () => {
    console.log("initial", this.state.profileImage);

    const { timeOfBirth, dateOfBirth } = this.state;

    let profileData = this.state.profileData;
    let email = profileData ? profileData.find((item) => item.fieldColumnName == "email_id")
      : "";
    let fname = profileData
      ? profileData.find((item) => item.fieldColumnName == "first_name")
      : "";
    let lname = profileData
      ? profileData.find((item) => item.fieldColumnName == "last_name")
      : "";
    let mobile = profileData
      ? profileData.find((item) => item.fieldColumnName == "msisdn")
      : "";
    let gender = profileData
      ? profileData.find((item) => item.fieldColumnName == "gender")
      : "";
    let dob = profileData
      ? profileData.find((item) => item.fieldColumnName == "dob")
      : "";
    let state = profileData
      ? profileData.find((item) => item.fieldColumnName == "state")
      : "";
    let birth = profileData
      ? profileData.find((item) => item.fieldColumnName == "store_name")
      : "";
    let city = profileData
      ? profileData.find((item) => item.fieldColumnName == "city")
      : "";
    let country = profileData
      ? profileData.find((item) => item.fieldColumnName == "country")
      : "";
    let maritalstatus = profileData
      ? profileData.find((item) => item.fieldColumnName == "marital_status")
      : "";
    let occupation = profileData
      ? profileData.find((item) => item.fieldColumnName == "occupation")
      : "";


    if (email.fieldValue.length === 0 ||
      fname.fieldValue.length === 0 ||
      state.fieldValue.length === 0 ||
      city.fieldValue.length === 0 ||
      lname.fieldValue.length === 0
    ) {
      this.setState({ ...this.state, errorMsg: 'error' })
      this.showPopUp(this.props.t("Something is missing. Please enter all the mandatory fields"), true);

      return;
    }


    //const regexp = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    const isvalid = email.fieldValue.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    if (!isvalid) {
      this.showPopUp(this.props.t("Please enter email correctly"), true);
      return;
    }

    let datetimeofbirth =
      dateOfBirth.toDateString() +
      " " +
      timeOfBirth.getHours() +
      ":" +
      timeOfBirth.getMinutes();
    datetimeofbirth = Date.parse(datetimeofbirth);

    console.log("datetimeofbirth", datetimeofbirth);

    var requestBody = {
      data: [
        {
          displayTitle: "Mobile No.",
          isMandatory: 1,
          isEditable: 1,
          controlType: "TEXT",
          fieldValue: mobile.fieldValue,
          fieldColumnName: "msisdn",
          dataValues: null,
          sequence: 1,
          mode: "API",
          minLength: 10,
          maxLength: 10,
        },
        {
          displayTitle: "Username",
          isMandatory: 1,
          isEditable: 1,
          controlType: "TEXT",
          fieldValue: mobile.fieldValue,
          fieldColumnName: "username",
          dataValues: null,
          sequence: 1,
          mode: "API",
          minLength: 10,
          maxLength: 10,
        },
        {
          controlType: "TEXT",
          dataValues: null,
          displayTitle: "EmailId",
          fieldColumnName: "email_id",
          fieldValue: email.fieldValue,
          isEditable: 1,
          isMandatory: 1,
          maxLength: 250,
          minLength: 0,
          mode: "API",
          prefix: null,
          sequence: 7
        },
        {
          displayTitle: "User Category",
          isMandatory: 1,
          isEditable: 1,
          controlType: "TEXT",
          fieldValue: "ROLE_CLIENT",
          fieldColumnName: "user_category",
          dataValues: null,
          sequence: 4,
          mode: "API",
          minLength: 5,
          maxLength: 20,
        },
        {
          displayTitle: "First Name",
          isMandatory: 1,
          isEditable: 1,
          controlType: "TEXT",
          fieldValue: fname.fieldValue,
          fieldColumnName: "first_name",
          dataValues: null,
          sequence: 5,
          mode: "API",
          minLength: 1,
          maxLength: 20,
          prefix: null,
        },
        {
          displayTitle: "Last Name",
          isMandatory: 0,
          isEditable: 1,
          controlType: "TEXT",
          fieldValue: lname.fieldValue,
          fieldColumnName: "last_name",
          dataValues: null,
          sequence: 6,
          mode: "API",
          minLength: 1,
          maxLength: 20,
          prefix: null,
        },
        {
          displayTitle: "Gender",
          isMandatory: 0,
          isEditable: 1,
          controlType: "TEXT",
          fieldValue: gender.fieldValue,
          fieldColumnName: "gender",
          dataValues: null,
          sequence: 7,
          mode: "API",
          minLength: 1,
          maxLength: 10,
          prefix: null,
        },
        {
          displayTitle: "DOB",
          isMandatory: 0,
          isEditable: 1,
          controlType: "TEXT",
          fieldValue: datetimeofbirth,
          fieldColumnName: "dob",
          dataValues: null,
          sequence: 7,
          mode: "API",
          minLength: 0,
          maxLength: 250,
          prefix: null,
        },
        {
          displayTitle: "City",
          isMandatory: 0,
          isEditable: 1,
          controlType: "TEXT",
          fieldValue: city.fieldValue,
          fieldColumnName: "city",
          dataValues: null,
          sequence: 7,
          mode: "API",
          minLength: 0,
          maxLength: 250,
          prefix: null,
        },
        {
          displayTitle: "State",
          isMandatory: 0,
          isEditable: 1,
          controlType: "TEXT",
          fieldValue: state.fieldValue,
          fieldColumnName: "state",
          dataValues: null,
          sequence: 7,
          mode: "API",
          minLength: 0,
          maxLength: 250,
          prefix: null,
        },
        {
          displayTitle: "Country",
          isMandatory: 0,
          isEditable: 1,
          controlType: "TEXT",
          fieldValue: country.fieldValue,
          fieldColumnName: "country",
          dataValues: null,
          sequence: 7,
          mode: "API",
          minLength: 0,
          maxLength: 250,
          prefix: null,
        },
        {
          displayTitle: "Marital Status",
          isMandatory: 0,
          isEditable: 1,
          controlType: "TEXT",
          fieldValue: maritalstatus.fieldValue,
          fieldColumnName: "marital_status",
          dataValues: null,
          sequence: 7,
          mode: "API",
          minLength: 0,
          maxLength: 250,
          prefix: null,
        },
        {
          displayTitle: "Occupation",
          isMandatory: 0,
          isEditable: 1,
          controlType: "TEXT",
          fieldValue: occupation.fieldValue,
          fieldColumnName: "occupation",
          dataValues: null,
          sequence: 7,
          mode: "API",
          minLength: 0,
          maxLength: 250,
          prefix: null,
        },
        {
          displayTitle: "Birth Place",
          isMandatory: 0,
          isEditable: 1,
          controlType: "TEXT",
          fieldValue: birth.fieldValue,
          fieldColumnName: "store_name",
          dataValues: null,
          sequence: 7,
          mode: "API",
          minLength: 0,
          maxLength: 250,
          prefix: null,
        },
        {
          displayTitle: "Upload Your Pic",
          isMandatory: "0",
          isEditable: "1",
          controlType: "TEXT",
          fieldValue: this.state.profileImage,
          fieldColumnName: "profile_pic_url",
          dataValues: null,
          sequence: 10,
          maxLength: 250,
          minLength: 0,
          prefix: "",
          mode: "SMS,WAP",
        },
        {
          displayTitle: "Pincode",
          isMandatory: 0,
          isEditable: 1,
          controlType: "TEXT",
          fieldValue: this.state.pincode,
          fieldColumnName: "pin",
          dataValues: null,
          sequence: 7,
          mode: "API",
          minLength: 0,
          maxLength: 250,
          prefix: null,
        },
      ],
    };

    var url = Constant.ASTRO_URL + Constant.GET_USER_PROFILE_DETAILS;
    const headers = getCommonHeaders();
    headers.msisdn = localStorage["msisdn"];
    postApi(url, headers, requestBody)
      .then((response) => response.data)
      .then((data) => {
        if (data && data.code == ErrorConstant.SUCCESS_CODE) {
          console.log("data", data.data);
          try {
            this.getUserProfileDetails();
            console.log("response saveProfile ", data);
            this.setState({ ...this.state, errorMsg: 'success' })
            this.showPopUp("Awesome! You have successfully updated your profile.", true);

            // localStorage.setItem("userProfile", JSON.stringify(data.data))
            // this.props.history.push(FRONTEND_NAME+"/home")
            this.setState({ inEditableState: false, allowUpload: false });
          } catch (error) {
            console.log("exception occured" + error);
            this.setState({ enableLoader: false });
          }
        } else {
          this.showPopUp(data.msg, false);
        }
      });
  };


  handleChange = (e) => {
    let newExp = e.target.value;

    let oldProfileData = this.state.profileData;
    let obj = oldProfileData
      ? oldProfileData.find((item) => item.fieldColumnName == e.target.name)
      : "";
    obj.fieldValue = newExp;
    console.log("oldProfileData", oldProfileData);
    this.setState({
      profileData: oldProfileData,
    });
  };

  handleDateChange = (dob) => {
    console.log("selected date", dob);
    this.setState({
      dateOfBirth: dob,
    });
    console.log(this.state);
  };
  handleTimeChange = (timeofbirth) => {
    console.log("selected time", timeofbirth);
    this.setState({
      timeOfBirth: timeofbirth,
    });
    console.log(this.state);
  };

  fetchStateOnPincodeChange = (pincode) => {
    //alert(pincode)
    console.log(pincode);
    const headers = getCommonHeaders();
    apis.getCountryData(headers, pincode)
      .then((response) => response.data)
      .then((data) => {
        if (data.code === 2000 && data.data.length > 0 && data.data[0].PostOffice && data.data[0].PostOffice.length > 0) {
          console.log(data.data);
          this.handleChange({
            target: {
              value: data.data[0].PostOffice[0].District,
              name: 'city'
            }
          });

          this.handleChange({
            target: {
              value: data.data[0].PostOffice[0].Country,
              name: 'country'
            }
          });

          this.handleChange({
            target: {
              value: data.data[0].PostOffice[0].State,
              name: 'state'
            }
          })
        }
      });

  };

  changePincode = (pincode) => {
    this.setState({
      pincode: pincode,
    });
  }

  debouncingWrapper(cbFunc, cbFunc2, timeout = 1000) {
    let timer;

    return function (e) {
      //console.log(e)
      let pincode = e.target.value;
      cbFunc2.call(this, pincode);
      clearTimeout(timer);

      timer = setTimeout(() => {
        cbFunc.call(this, pincode);
      }, timeout)
    }
  }

  showPopUp(msg, isSuccess) {
    this.setState({
      showPopUp: true,
      msg: msg,
      isSuccess: isSuccess,
    });
  }

  closePopUp = () => {
    this.setState({
      showPopUp: false,
    });
  };

  render() {
    const { t } = this.props;

    const {
      profileData,
      inEditableState,
      showPopUp,
      dateOfBirth,
      timeOfBirth,
    } = this.state;

    let fname = profileData
      ? profileData.find((item) => item.fieldColumnName == "first_name")
      : "";
    let lname = profileData
      ? profileData.find((item) => item.fieldColumnName == "last_name")
      : "";
    let email = profileData ? profileData.find((item) => item.fieldColumnName == "email_id")
      : "";
    let mobile = profileData
      ? profileData.find((item) => item.fieldColumnName == "msisdn")
      : "";
    let gender = profileData
      ? profileData.find((item) => item.fieldColumnName == "gender")
      : "";
    let dob = profileData
      ? profileData.find((item) => item.fieldColumnName == "dob")
      : "";
    let state = profileData
      ? profileData.find((item) => item.fieldColumnName == "state")
      : "";
    let birth = profileData
      ? profileData.find((item) => item.fieldColumnName == "store_name")
      : "";
    let city = profileData
      ? profileData.find((item) => item.fieldColumnName == "city")
      : "";
    let country = profileData
      ? profileData.find((item) => item.fieldColumnName == "country")
      : "";
    let maritalstatus = profileData
      ? profileData.find((item) => item.fieldColumnName == "marital_status")
      : "";
    let occupation = profileData
      ? profileData.find((item) => item.fieldColumnName == "occupation")
      : "";

    // let pincode = profileData
    //   ? profileData.find((item) => item.fieldColumnName == "pincode")
    //   : "";

    return (
      <div>
        {showPopUp && (
          <Popup
            heading={this.state.heading}
            msg={this.state.msg}
            button={this.state.button}
            closePopUp={this.closePopUp}
            Isicon={true}
            IsiconType={this.state.errorMsg}
          />
        )}

        <Chat_Talk_Header
          IsNavIconTrue={false}
          IsSearchTrue={false}
          IsFilterTrue={false}
          // editSearchTerm={this.editSearchTerm}
          // editSortTerm={this.editSortTerm}
          // IsMob_Side_Nave={this.IsMob_Side_Nave}
          propsData={this.props}
          CustomClass={true}
          IsTitleTrue={true}
          title={t('Profile')}
        />

        <Header
          IsActive_header_Or_not="chat_and_talk_header-"
          userName={fname.fieldValue} />
        {/* <BottomHeader /> */}
        <div className="container">
          {/* <HeaderMenu /> */}
          <PageHeader Mob_HeaderIsTrue={'not_show_mob_header1'} name={{ firstname: t('Profile'), lastname: "" }} />
          <div className="row">
            <div className="col-md-3 col-12 mobsidemenu">
              <SideMenu />
            </div>
            <div className="col-md-9 col-12 mt-5 mobChatlist mob-mt-100">
              <div className="form-body">
                <div id="profilePic">
                  <img
                  alt="profile"
                    src={this.state.profileImage ? this.state.profileImage : User}
                    onClick={this.showFileUpload}
                    className="pro-img"
                  ></img>
                  <img src={tick} className="tick-pro-img" alt="img"></img>
                  <input
                    accept="image/*"
                    id="fileInput"
                    type="file"
                    onChange={this.uploadFile}
                    ref={this.fileUpload}
                    style={{ display: "none" }}
                  />
                </div>
                <p className="pro-name">
                  {fname.fieldValue} {lname.fieldValue}
                </p>
                {/* <p className="pro-lang">English, Hindi, French</p> */}
                {inEditableState ? this.setIsEditable : this.disableAllFields}
                <form id="profile" style={{ marginTop: "15px" }}>
                  <fieldset disabled={!inEditableState}>
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label for="exampleFormControlInput1">
                            {t('First_Name*')}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            name="first_name"
                            value={fname.fieldValue}
                            placeholder={t('First_Name')}
                            onChange={(e) => this.handleChange(e)}
                            required
                          />
                          {this.state.errMsg1 !== '' ? <span style={{ color: 'red', fontSize: '12px' }}>{this.state.errMsg1}</span> : null}
                        </div>
                        <div className="form-group">
                          <label for="exampleFormControlInput1">{t('Last_Name')}*</label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="last_name"
                            value={lname.fieldValue}
                            placeholder={t('Last_Name')}
                            onChange={(e) => this.handleChange(e)}
                          ></input>
                          {this.state.errMsg2 !== '' ? <span style={{ color: 'red', fontSize: '12px' }}>{this.state.errMsg2}</span> : null}
                        </div>
                        <div className="form-group">
                          <label for="exampleFormControlInput1">{t('Email_Id')}*</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email_id"
                            value={email.fieldValue}
                            placeholder={t('Email_Id')}
                            onChange={(e) => this.handleChange(e)}
                          ></input>
                          {this.state.errMsg3 !== '' ? <span style={{ color: 'red', fontSize: '12px' }}>{this.state.errMsg3}</span> : null}
                        </div>
                        <div className="form-group">
                          {/* <input type="text" className="form-control" id="dateofborth" name="dob" value={dob} placeholder="DD/MM/YY" /> */}
                          <label for="exampleFormControlInput1">{t('Mobile_Number')}</label>
                          <span>
                            <input
                              type="text"
                              className="form-control"
                              id="mobile"
                              name="msisdn"
                              value={mobile.fieldValue !== undefined ? mobile.fieldValue.slice(2, 12) : ''}
                              disabled
                              placeholder={t('Mobile_Number')}
                              onChange={(e) => this.handleChange(e)}
                            />
                            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <ThemeProvider theme={defaultMaterialTheme}>
                            <Grid container justify="space-around">
                              <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                // label="Date of Birth"
                                format="MM/dd/yyyy"
                                value={dob}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                              />
                            </Grid>
                          </ThemeProvider>
                        </MuiPickersUtilsProvider> */}
                          </span>
                        </div>
                        {/* <div className="form-group">
                      <label for="exampleFormControlSelect1">
                        Upload Profile Photo
                      </label>
                    </div> */}
                        <div className="form-group">
                          <label for="exampleFormControlSelect1">{t('Gender')}</label>
                          <select
                            className="form-control"
                            id="gender"
                            name="gender"
                            value={gender.fieldValue}
                            onChange={(e) => this.handleChange(e)}
                          >
                            <option value="Male">{t('Male')}</option>
                            <option value="Female">{t('Female')}</option>
                          </select>
                        </div>
                        <div className="form-group">
                          {/* <input type="text" className="form-control" id="dateofborth" name="dob" value={dob} placeholder="DD/MM/YY" /> */}
                          <label for="exampleFormControlInput1">
                            {t('Date_of_Birth*')}
                          </label>
                          <span className="DateofBirth">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <ThemeProvider theme={defaultMaterialTheme}>
                                <Grid container justify="space-around">
                                  <KeyboardDatePicker
                                    InputProps={{ readOnly: !inEditableState }}
                                    margin="normal"
                                    disabled={!inEditableState}
                                    id="date-picker-dialog"
                                    // label="Date of Birth"
                                    name="dateOfBirth"
                                    format="MM/dd/yyyy"
                                    value={dateOfBirth}
                                    onChange={this.handleDateChange}
                                    maxDate={new Date()}
                                    KeyboardButtonProps={{
                                      "aria-label": "change date",
                                    }}
                                  />
                                </Grid>
                              </ThemeProvider>
                            </MuiPickersUtilsProvider>
                          </span>
                        </div>
                        <div className="form-group">
                          <label for="exampleFormControlSelect1">{t('State')}*</label>
                          <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            value={state.fieldValue}
                            onChange={(e) => this.handleChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div
                          className="form-group"
                          style={{ border: "0.5px solid #9a9a9a50 !important" }}
                        >
                          <label for="exampleFormControlInput1">
                            {t('Time_of_Birth')}*
                          </label>
                          <span className="TimeOfBirth">
                            {/* <input type="text" className="form-control" id="timeofbirth" name="timeofbirth" value={timeofbirth} placeholder="DD/MM/YY" /> */}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <ThemeProvider theme={defaultMaterialTheme}>
                                <Grid container justify="space-around">
                                  <KeyboardTimePicker
                                    InputProps={{ readOnly: !inEditableState }}
                                    margin="normal"
                                    disabled={!inEditableState}
                                    id="time-picker"
                                    name="timeOfBirth"
                                    value={timeOfBirth}
                                    onChange={this.handleTimeChange}
                                    KeyboardButtonProps={{
                                      "aria-label": "change time",
                                    }}
                                  />
                                </Grid>
                              </ThemeProvider>
                            </MuiPickersUtilsProvider>
                          </span>
                        </div>

                        <div className="form-group">
                          <label for="exampleFormControlSelect1">
                            {t('Pincode')}
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="pincode"
                            name="pincode"
                            value={this.state.pincode}
                            onChange={this.debouncingWrapper(this.fetchStateOnPincodeChange, this.changePincode)}
                            placeholder={t('Pincode')}
                          />
                        </div>

                        <div className="form-group">
                          <label for="exampleFormControlSelect1">
                            {t('Place_of_Birth')}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="birth"
                            name="store_name"
                            value={birth.fieldValue}
                            onChange={this.handleChange}
                            placeholder={t('Place_of_Birth')}
                          />
                        </div>
                        <div className="form-group">
                          <label for="exampleFormControlInput1">{t('City*')}</label>
                          <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={city.fieldValue}
                            placeholder={t('City')}
                            onChange={this.handleChange}
                          />
                          {this.state.errMsg4 !== '' ? <span style={{ color: 'red', fontSize: '12px' }}>{this.state.errMsg4}</span> : null}
                          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <ThemeProvider theme={defaultMaterialTheme}>
                          <Grid container justify="space-around">
                            <KeyboardTimePicker
                              margin="normal"
                              id="time-picker"
                              label="Time picker"
                              value="timeofbirth"
                              //onChange={this.handleTimeChange}
                              KeyboardButtonProps={{
                                "aria-label": "change time",
                              }}
                            />
                          </Grid>
                        </ThemeProvider>
                      </MuiPickersUtilsProvider> */}
                        </div>
                        <div className="form-group">
                          <label for="exampleFormControlInput1">{t('Country')}</label>
                          <input
                            type="text"
                            className="form-control"
                            id="country"
                            name="country"
                            value={country.fieldValue}
                            onChange={this.handleChange}
                            placeholder={t('Country')}
                          />
                        </div>
                        <div className="form-group">
                          <label for="exampleFormControlInput1">
                            {t('Marital_Status*')}
                          </label>
                          <select
                            className="form-control"
                            id="maritalstatus"
                            name="marital_status"
                            value={maritalstatus.fieldValue}
                            onChange={this.handleChange}
                          >
                            <option value="Single">{t('Single')}</option>
                            <option value="Married">{t('Married')}</option>
                            <option value="Divorced">{t('Divorced')}</option>
                            <option value="Separated">{t('Separated')}</option>
                            <option value="Widowed">{t('Widowed')}</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label for="exampleFormControlInput1">{t('Occupation')}</label>
                          <input
                            type="text"
                            className="form-control"
                            id="occupation"
                            name="occupation"
                            value={occupation.fieldValue}
                            onChange={this.handleChange}
                            placeholder={t('Occupation')}
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <div className="row">
                    <div className="col" style={{ textAlign: "center" }}>
                      {inEditableState ? (
                        <button
                          type="button"
                          className="btn mb-5"
                          onClick={this.saveProfileProcess}
                          style={{
                            background: 'var(--gradient_color)',
                            color: "var(--white)",
                            borderRadius: "22px",
                            height: "44px",
                            width: "fit-content",
                            padding: "0px 40px",
                            marginTop: "20px",
                          }}
                        >
                          {t('Save')}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn mb-5"
                          onClick={this.setIsEditable}
                          style={{
                            background: 'var(--gradient_color)',
                            color: "var(--white)",
                            borderRadius: "22px",
                            height: "44px",
                            width: "fit-content",
                            padding: "0px 40px",
                            marginTop: "20px",
                          }}
                        >
                          {t('Edit_Profile')}
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
          <div style={{ position: "absolute", left: "0px", right: "0px" }}>
            <Footer history={this.props} />
          </div>
        </div>
      </div>
    );
  }
}


export default withTranslation()(ProfileNew);
