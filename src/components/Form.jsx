import React from "react";
import Header from "../common/Header2";
// import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";
import apis from "../configuration/apis";
import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";
import "../styles/form.css";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import secureLocalStorage from 'react-secure-storage'
// import { getKeyValues } from "../configuration/commonFunctions";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { orange } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { getCommonHeaders } from "../configuration/commonFunctions";
import { APP_NAME, FRONTEND_NAME } from "../configuration/constants";
import apiUrls from "../configuration/apiUrls";
import Popup from "../components/popupChat";
// import BottomHeader from "../common/BottomHeader";
import { withTranslation } from 'react-i18next';
// import { compose } from 'redux'
import Chat_Talk_Header from "../common/Chat&Talk_Header";

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: orange,
  },
});

class Form extends React.Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        mobSideNaveTrue:'',
        userMsisdn: localStorage["selectedCountryCode"] + localStorage["msisdn"],
        panditMsisdn: this.props.location.state
          ? this.props.location.state.panditMsisdn
          : "",
        fname: '',
        lname: localStorage["profileData"]
        ? JSON.parse(localStorage["profileData"]).find(
          (item) => item.fieldColumnName == "last_name"
        ).fieldValue
        : "",
        gender: "Male",
        dob: localStorage["userProfile"] && JSON.parse(localStorage["userProfile"]).userDetails ? new Date(JSON.parse(localStorage["userProfile"]).userDetails.dob): null,
        timeofbirth: localStorage["profileData"]
        ? new Date(
            Number(
              JSON.parse(localStorage["profileData"]).find(
                (item) => item.fieldColumnName == "dob"
              ).fieldValue
            )
          )
        : null,
        maritalstatus: "Single",
        occupation: "",
        topicofconcern: "Education",
        placeofbirth: localStorage["profileData"]
        ? JSON.parse(localStorage["profileData"]).find(
                (item) => item.fieldColumnName == "store_name"
              ).fieldValue
           : "",
        topics: [],
        answer: "ENGLISH",
        comments: "",
        showPopUp: false,
        msg: "",
        isSuccess: false,
        goToChatlist: false,
        typeOfService: this.props.location.state
          ? this.props.location.state.typeOfService
          : "Chat",
        orderDetail: this.props.location.state
          ? this.props.location.state.orderDetail
          : "",
        isPremium: this.props.location.state
            ? this.props.location.state.isPremium
            : false,
        pincode: '',
        
      };
    }
  }
  componentDidMount() {
    this.getTopicofconcerns(["topic"]).then((keyValueArray) => {
      let topics = keyValueArray?.filter((item) => item.key == "topic");
      // console.log("key value data", topics);
      this.setState({
        topics: topics,
        topicofconcern: topics?.[0]?.value,
      });
    });
  }
  getTopicofconcerns = (keyArray) => {
    if (!keyArray) return;
    var requestBody = {
      key: keyArray,
    };

    return apis.getKeysValue(requestBody).then((response) => {
      var data = response.data;
      // console.log(data);

      if (data.code == "2000") {
        let keysValueResponse = data.data;
        // console.log("response getKeysValue ", keysValueResponse);

        return keysValueResponse;
      } else {
        console.log("ERROR", data.msg);
        return;
      }
    });
  };
  closePopUp = () => {
    this.setState({
      showPopUp: false,
    });
    if (this.state.goToReportlist) this.props.history.goBack();
  };

  showPopUp(msg, isSuccess, goToReportlist) {
    this.setState({
      showPopUp: true,
      msg: msg,
      isSuccess: isSuccess,
      goToReportlist: goToReportlist,
    });
  }

  requestReport = () => {
    const {
      userMsisdn,
      panditMsisdn,
      fname,
      lname,
      gender,
      dob,
      timeofbirth,
      maritalstatus,
      occupation,
      topicofconcern,
      answer,
      comments,
      orderDetail,
    } = this.state;
    // console.log("Order detail", orderDetail);
    var requestBody = {
      address: {
        deliveryMobileNo: userMsisdn,
        deliveryName: fname + lname,
      },
      appLanguage: "en",
      isQuantityCheck: "2",
      isSelfPaytm: "0",
      paytmNumber: "0",
      redeemCategory: "Report",
      redeemMode: panditMsisdn,
      redeemParentCategory: "whiteGoods",
      redeemPoint: orderDetail.goodsPrice,
      redeemUnit: "1",
      redeemValue: orderDetail.goodsPrice,
      redemptionAddress:
        fname +
        lname +
        "|" +
        dob +
        "|" +
        "" +
        "|" +
        maritalstatus +
        "|" +
        occupation +
        "|" +
        topicofconcern,
      // "ABC DEF|8585959086|28-April-2021 12:00 AM|GHI|Single|STW|Love and relationship"
    };

    return apis
      .requestReport(requestBody)
      .then((response) => response.data)
      .then((data) => {
        // console.log("response requestReport", data);
        if (data.code == "2000") {
          this.showPopUp(
            this.props.t("Your request for report has been submitted."),
            true,
            true
          );
        } else {
          // console.log(data.msg);
          this.showPopUp(this.props.t(data.msg), false, true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
submitChatIntake = (event) => {
    event.preventDefault();
    const {
      userMsisdn,
      fname,
      lname,
      gender,
      dob,
      timeofbirth,
      placeofbirth,
      maritalstatus,
      occupation,
      topicofconcern,
      answer,
      comments,
    } = this.state;

    if (
      !fname ||
      !userMsisdn ||
      !gender ||
      !dob ||
      !timeofbirth ||
      !placeofbirth
    ) {
      this.showPopUp(this.props.t("Please enter all the mandatory fields."), false);
      return;
    }
    // console.log("submitChatIntake", this.state);
    secureLocalStorage.removeItem('chatFrom');
    secureLocalStorage.removeItem('route');
    localStorage.removeItem('msg_recevied');
    
    let datetimeofbirth =
      dob.toDateString() +
      " " +
      timeofbirth.getHours() +
      ":" +
      timeofbirth.getMinutes();
    datetimeofbirth = Date.parse(datetimeofbirth);

    // console.log("datetimeofbirth", datetimeofbirth);

    var headers = getCommonHeaders();
    let requestBody = {
      data: [
        {
          controlType: "TEXT",
          displayTitle: "First Name",
          fieldColumnName: "first_name",
          fieldValue: fname === '' ? localStorage["profileData"]
          ? JSON.parse(localStorage["profileData"]).find(
            (item) => item.fieldColumnName == "first_name"
          ).fieldValue
          : "":fname,
          isEditable: 1,
          isMandatory: 1,
          maxLength: 50,
          minLength: 0,
          mode: "API",
          sequence: 7,
        },
        {
          controlType: "TEXT",
          displayTitle: "Mobile No.",
          fieldColumnName: "msisdn",
          fieldValue: userMsisdn === '' ? localStorage["selectedCountryCode"] + localStorage["msisdn"]:userMsisdn,
          isEditable: 1,
          isMandatory: 1,
          maxLength: 10,
          minLength: 10,
          mode: "API",
          sequence: 1,
        },
        {
          controlType: "TEXT",
          displayTitle: "Gender",
          fieldColumnName: "gender",
          fieldValue: gender,
          isEditable: 1,
          isMandatory: 1,
          maxLength: 20,
          minLength: 0,
          mode: "API",
          sequence: 7,
        },
        {
          controlType: "TEXT",
          displayTitle: "DOB",
          fieldColumnName: "dob",
          fieldValue: datetimeofbirth,
          isEditable: 1,
          isMandatory: 1,
          maxLength: 20,
          minLength: 0,
          mode: "API",
          sequence: 7,
        },
        {
          controlType: "TEXT",
          displayTitle: "Birth Place",
          fieldColumnName: "store_name",
          fieldValue: placeofbirth,
          isEditable: 1,
          isMandatory: 1,
          maxLength: 250,
          minLength: 0,
          mode: "API",
          sequence: 7,
        },
        /*
                {
                  "controlType": "TEXT",
                  "displayTitle": "Birth Place",
                  "fieldColumnName": "store_name",
                  "fieldValue": "Place of birth",
                  "isEditable": 1,
                  "isMandatory": 1,
                  "maxLength": 250,
                  "minLength": 0,
                  "mode": "API",
                  "sequence": 7
                },
                
                {
                  "controlType": "TEXT",
                  "displayTitle": "State",
                  "fieldColumnName": "state",
                  "fieldValue": "State",
                  "isEditable": 1,
                  "isMandatory": 0,
                  "maxLength": 50,
                  "minLength": 0,
                  "mode": "API",
                  "sequence": 7
                },
                {
                  "controlType": "TEXT",
                  "displayTitle": "City",
                  "fieldColumnName": "city",
                  "fieldValue": "City",
                  "isEditable": 1,
                  "isMandatory": 0,
                  "maxLength": 50,
                  "minLength": 0,
                  "mode": "API",
                  "sequence": 7
                },
                {
                  "controlType": "TEXT",
                  "displayTitle": "Country",
                  "fieldColumnName": "country",
                  "fieldValue": "Country",
                  "isEditable": 1,
                  "isMandatory": 0,
                  "maxLength": 50,
                  "minLength": 0,
                  "mode": "API",
                  "sequence": 7
                },
                {
                  "controlType": "TEXT",
                  "displayTitle": "Marital Status",
                  "fieldColumnName": "marital_status",
                  "fieldValue": "Married",
                  "isEditable": 1,
                  "isMandatory": 1,
                  "maxLength": 20,
                  "minLength": 0,
                  "mode": "API",
                  "sequence": 7
                },
                */

        /*
                {
                  "controlType": "TEXT",
                  "displayTitle": "Partner Name",
                  "fieldColumnName": "level1_name",
                  "fieldValue": "Partner First name Partner Last Name",
                  "isEditable": 1,
                  "isMandatory": 0,
                  "maxLength": 100,
                  "minLength": 0,
                  "mode": "API",
                  "sequence": 7
                },
                {
                  "controlType": "TEXT",
                  "displayTitle": "Partner Details",
                  "fieldColumnName": "level1_id",
                  "fieldValue": "1617669000000|Partner birth place|partner city|partner state|partner country",
                  "isEditable": 1,
                  "isMandatory": 0,
                  "maxLength": 150,
                  "minLength": 0,
                  "mode": "API",
                  "sequence": 7
                },
                
                */
        {
          controlType: "TEXT",
          displayTitle: "User Category",
          fieldColumnName: "user_category",
          fieldValue: "ROLE_CLIENT",
          isEditable: 1,
          isMandatory: 1,
          maxLength: 20,
          minLength: 5,
          mode: "API",
          sequence: 4,
        },
        {
          controlType: "TEXT",
          displayTitle: "Username",
          fieldColumnName: "username",
          fieldValue: userMsisdn === ''?localStorage["selectedCountryCode"] + localStorage["msisdn"]:userMsisdn,
          isEditable: 1,
          isMandatory: 1,
          maxLength: 10,
          minLength: 10,
          mode: "API",
          sequence: 1,
        },
        {
          controlType: "TEXT",
          displayTitle: "Pincode",
          fieldColumnName: "pin",
          fieldValue: this.state.pincode,
          isEditable: 1,
          isMandatory: 0,
          maxLength: 10,
          minLength: 6,
          mode: "API",
          sequence: 1,
        },
      ],
      requestType: "temporary",
    };

    apis
      .postChatForm(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        // console.log("resp data", data);
        if (data.code == "2000") {
          // console.log(JSON.stringify(data));

          //  this.preStartChat();
          let typeOfService = this.state.typeOfService;
          // debugger
          if (typeOfService == "Chat") {
            secureLocalStorage.setItem("chatFrom",JSON.stringify([this.state]))
            // localStorage["chatFrom"] = this.state;
            this.props.history.push({
              pathname: FRONTEND_NAME + "/chat",
              state: { panditMsisdn: this.state.panditMsisdn,
              orderDetail: this.state.orderDetail,
              isPremium: this.state.isPremium,
              data:this.state
            },
            });
          } else if (typeOfService == "Report") {
            this.requestReport();
          }
        } else {
          this.showPopUp(this.props.t(data.msg), false);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  preStartChat = () => {
    let url = apiUrls.preStart;
    url = url.replace("<appName>", APP_NAME.replace(/['"]+/g, ""));
    url = url.replace("<userMsisdn>", Number(this.state.userMsisdn));
    url = url.replace("<panditMsisdn>", Number(this.state.panditMsisdn));

    var headers = getCommonHeaders();
    console.log("url main", url);
    apis
      .preStart(url, { headers })
      .then((response) => response.data)
      .then((data) => {
        // console.log("preStart data", data);
        if (data.code == "2000") {
          this.showPopUp(
           this.props.t('You_request_has_been_submitted_successfully._Please_wait_for_astrologer_to_accept_your_request.": "You request has been submitted successfully. Please wait for astrologer to accept your request.'),
            true,
            true
          ); //third parameter for go to chat List after Click ok.
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    let name = event.target.name;
    //   event.target.value = event.target.value.replace(/[^0-9]/g, '');
    this.setState({
      [name]: event.target.value,
    });
  };

  handleDateChange = (dob) => {
    // console.log("selected date", dob);
    this.setState({
      dob: dob,
    });
  };

  handleTimeChange = (timeofbirth) => {
    // console.log("selected time", timeofbirth);
    this.setState({
      timeofbirth: timeofbirth,
    });
  };

  fetchStateOnPincodeChange = (pincode) => {
    //alert(pincode)
    console.log(pincode)
    const headers = getCommonHeaders();
    apis.getCountryData(headers, pincode)
      .then((response) => response.data)
      .then((data) => {
        if(data.code === 2000 && data.data.length > 0 && data.data[0].PostOffice && data.data[0].PostOffice.length > 0) {
          this.handleChange({
            target: {
              value: data.data[0].PostOffice[0].District,
              name: 'placeofbirth'
            }
          });
        }
    });

  };

  changePincode = (pincode) => {
    this.setState({
      pincode: pincode,
    });
  }

  debouncingWrapper(cbFunc,cbFunc2, timeout = 1000) {
    let timer;

    return function (e) {
      //console.log(e)
      let pincode = e.target.value;
      cbFunc2(this, pincode);

      clearTimeout(timer);

      timer = setTimeout(() => {
        cbFunc.call(this, pincode);
      }, timeout)
    }
  }


  IsMob_Side_Nave = (e) => {
    this.setState({
      ...this.state,
      mobSideNaveTrue: e
    })
  }

  render() {
    const {t}= this.props;
    // console.log(this.props.location.state);
    const {
      userMsisdn,
      fname,
      lname,
      gender,
      dob,
      timeofbirth,
      placeofbirth,
      maritalstatus,
      occupation,
      topics,
      topicofconcern,
      answer,
      comments,
      showPopUp,
      msg,
      isSuccess,
      goToChatlist,
      typeOfService,
    } = this.state;
    let servicetype = typeOfService.toUpperCase();
    return (
      <div>
        <Chat_Talk_Header
        IsNavIconTrue={false}
        IsSearchTrue={false}
        IsFilterTrue={false}
        // IsMob_Side_Nave={this.IsMob_Side_Nave}
        propsData={this.props}
        />
        <Header  IsActive_header_Or_not="chat_and_talk_header-" />
        {/* <BottomHeader /> */}
          {/* <HeaderMenu /> */}
        <div className="container">
          {showPopUp && (
            <Popup
              msg={msg}
              isSuccess={isSuccess}
              closePopUp={this.closePopUp}
              goToChatlist={goToChatlist}
              type={"form"}
            />
          )}

          
          <PageHeader
          Mob_HeaderIsTrue={'not_show_mob_header1'}
            name={{ firstname: servicetype + " WITH ASTROLOGER", lastname: "" }}
          />
          <div className="row page-body">
          <div className={this.state.mobSideNaveTrue ? "col-md-3 mobsidemenu mob_Side_Nave" : 'col-md-3 mobsidemenu'}>
                  <SideMenu />
                </div>
            {/* <SideMenu /> */}
            <div className="col form-body chat_form_mob">
              <form>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label for="exampleFormControlInput1">{t('First_Name')}</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        name="fname"
                        value={fname}
                        placeholder={t('First_Name')}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label for="exampleFormControlInput1">
                        {t('Mobile_Number')}*
                      </label>
                      <span
                        type="text"
                        className="form-control"
                        id="phonenumber"
                        placeholder={t('Mobile_Number')}
                      >
                        {userMsisdn}
                      </span>
                    </div>

                    <div className="form-group">
                      <label for="exampleFormControlSelect1">{t('Gender*')}</label>
                      <select
                        className="form-control"
                        id="gender"
                        name="gender"
                        value={gender}
                        onChange={this.handleChange}
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
                      <span>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <ThemeProvider theme={defaultMaterialTheme}>
                            <Grid container justify="space-around">
                              <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                // label="Date of Birth"
                                format="MM/dd/yyyy"
                                value={dob ? dob : null}
                                onChange={this.handleDateChange}
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
                      <label for="exampleFormControlInput1">
                        {t('Time_of_Birth*')}
                      </label>
                      {/* <input type="text" className="form-control" id="timeofbirth" name="timeofbirth" value={timeofbirth} placeholder="DD/MM/YY" /> */}
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <ThemeProvider theme={defaultMaterialTheme}>
                          <Grid container justify="space-around">
                            <KeyboardTimePicker
                              margin="normal"
                              id="time-picker"
                              value={timeofbirth ? timeofbirth : null}
                              onChange={this.handleTimeChange}
                              style={{border: '1px solid #ced4da'}}
                              KeyboardButtonProps={{
                                "aria-label": "change time",
                              }}
                            />
                          </Grid>
                        </ThemeProvider>
                      </MuiPickersUtilsProvider>
                    </div>
                    {/* <div className="form-group">
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
                    </div> */}
                    <div className="form-group">
                      <label for="exampleFormControlInput1">
                        {t('Place_of_Birth*')}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="placeofbirth"
                        name="placeofbirth"
                        value={placeofbirth}
                        placeholder= {t('Place_of_Birth*')}
                        onChange={this.handleChange}
                        required
                      />
                    </div>

                    {/*
                                        <div className="form-group">
                                            <label for="exampleFormControlSelect1">Marital Status*</label>
                                            <select className="form-control" id="maritalstatus" name="maritalstatus" value={maritalstatus} onChange={this.handleChange}>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                                <option value="Divorced">Divorced</option>
                                                <option value="Separated">Separated</option>
                                                <option value="Single">Widowed</option>

                                            </select>
                                        </div>
                                       
                                        <div className="form-group">
                                            <label for="exampleFormControlSelect1">Topic of Concern</label>
                                            <select className="form-control" id="topicofconcern" name="topicofconcern" value={topicofconcern} onChange={this.handleChange}>
                                               {topics && topics.length > 0 && topics.map(item => (
                                                <option value={item.value}>{item.value}</option>
                                               ))}
                                            </select>
                                        </div>
                                         */}
                    {/*
                                    <div className="form-group">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                                            <label class="form-check-label" for="exampleRadios1">
                                                Default radio
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleFormControlSelect1">Gender*</label>
                                            <select className="form-control" id="gender">
                                                <option value="Single">Single</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleFormControlInput1">Time of Birth*</label>
                                            <input type="text" className="form-control" id="timeofborth" placeholder="DD/MM/YY" />
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleFormControlSelect1">Occupation*</label>
                                            <select className="form-control" id="occupation">
                                                <option value="Single">Single</option>
                                            </select>
                                        </div>
    
                                        <div className="form-group">
                                            <label for="exampleFormControlInput1">Any Comments</label>
                                            <input type="text" className="form-control" id="anycomments" placeholder="DD/MM/YY" />
                                        </div>
                                    </div>
                                    

                                        <div className="form-group">
                                            <label for="exampleFormControlSelect1">I want answer in</label>
                                            <select className="form-control" id="answer" name="answer" value={answer} onChange={this.handleChange}>
                                                <option value="ENGLISH">ENGLISH</option>
                                            </select>
                                        </div>
                                    */}
                  </div>
                  <div className=""></div>
                  {/*
                                        <div className="form-group">
                                            <label for="exampleFormControlInput1">Last Name</label>
                                            <input type="text" className="form-control" id="lastname" name="lname" value={lname} onChange={this.handleChange} placeholder="Last Name" />
                                        </div>
                                        */}



                  {/*
                                        <div className="form-group">
                                            <label for="exampleFormControlSelect1">Occupation</label>
                                            <input type="text" className="form-control" id="occupation" name="occupation" value={occupation} onChange={this.handleChange} />

                                        </div>

                                        <div className="form-group">
                                            <label for="exampleFormControlInput1">Any Comments</label>
                                            <input type="text" className="form-control" id="anycomments" name="comments" value={comments} onChange={this.handleChange} />
                                        </div>
                                        */}

                </div>
                <div className="row">
                  <div className="col text-center">
                    <button
                      type="submit"
                      className="btn"
                      onClick={this.submitChatIntake}
                      style={{
                        width: "262px",
                        height: "44px",
                        backgroundColor: "#FF9C05",
                        color: "#ffffff",
                        borderRadius: "22px",
                      }}
                    >
                      {t('Take a Session')}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
        </div>
        <Footer history={this.props} />
      </div>
    );
  }
}


export default withTranslation()(Form);
