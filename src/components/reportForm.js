import React from "react";
import Header2 from "../common/Header2";
import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";
import apis from "../configuration/apis";
import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";
import "../styles/form.css";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { getKeyValues } from "../configuration/commonFunctions";
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
import Popup from "./popupChat";
import BottomHeader from "../common/BottomHeader";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import Chat_Talk_Header from "../common/Chat&Talk_Header";

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: orange,
  },
});

class ReportForm extends React.Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        mobSideNaveTrue: false,
        mobPage_headerTrue: false,
        userMsisdn: localStorage["selectedCountryCode"] + localStorage["msisdn"],
        panditMsisdn: this.props.location.state
          ? this.props.location.state.panditMsisdn
          : "",
        fname: localStorage["userProfile"] && JSON.parse(localStorage["userProfile"]).userDetails ? JSON.parse(localStorage["userProfile"]).userDetails.firstName : "",
        lname: localStorage["userProfile"] && JSON.parse(localStorage["userProfile"]).userDetails ? JSON.parse(localStorage["userProfile"]).userDetails.lastName : "",
        gender: "Male",
        dob: localStorage["userProfile"] && JSON.parse(localStorage["userProfile"]).userDetails ? new Date(JSON.parse(localStorage["userProfile"]).userDetails.dob) : null,
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
        occupation: localStorage["profileData"] ? JSON.parse(localStorage["profileData"]).find(
          (item) => item.fieldColumnName == "occupation"
        ).fieldValue
          : "",
        topicofconcern: "Education",
        placeofbirth: localStorage["profileData"]
          ? JSON.parse(localStorage["profileData"]).find(
            (item) => item.fieldColumnName == "store_name"
          ).fieldValue
          : "",
        topics: [],
        languages: [],
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
      };
    }
  }
  componentDidMount() {
    this.getTopicofconcerns(["topic", "language"]).then((keyValueArray) => {
      let topics = keyValueArray?.filter((item) => item.key == "topic");
      let languages = keyValueArray?.filter((item) => item.key == "language");
      console.log("key value data", topics);
      this.setState({
        topics: topics,
        topicofconcern: topics ? topics[0].value : "",
        languages: languages,
        answer: languages ? languages[0].value : ""
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
      console.log(data);

      if (data.code == "2000") {
        let keysValueResponse = data.data;
        console.log("response getKeysValue ", keysValueResponse);

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
    if (this.state.isSuccess) {
      this.props.history.push(FRONTEND_NAME + '/report');
    }

    //if (this.state.goToReportlist) this.props.history.goBack();ik
  };

  showPopUp(msg, isSuccess, goToReportlist) {
    this.setState({
      showPopUp: true,
      msg: this.props.t(msg),
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
      placeofbirth,
      dob,
      timeofbirth,
      maritalstatus,
      occupation,
      topicofconcern,
      answer,
      comments,
      orderDetail,
    } = this.state;
    console.log("Order detail", orderDetail);
    // debugger;
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
      redeemMode: this.state.panditMsisdn,
      redeemParentCategory: "whiteGoods",
      redeemPoint: orderDetail.goodsPrice
        ? orderDetail.goodsPrice
        : orderDetail.redeemPoint,
      redeemUnit: "1",
      redeemValue: orderDetail.goodsPrice
        ? orderDetail.goodsPrice
        : orderDetail.redeemValue,
      redemptionAddress:
        fname +
        lname +
        "|" +
        userMsisdn +
        "|" +
        dob +
        "|" +
        placeofbirth +
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
        console.log("response requestReport", data);
        if (data.code == "2000") {
          this.showPopUp(
            this.props.t('Your_report_request_has_been_submitted_successfully.'),
            true,
            true
          );
        } else {
          console.log(data.msg);
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
      placeofbirth,
      timeofbirth,
      maritalstatus,
      occupation,
      topicofconcern,
      answer,
      comments,
    } = this.state;
    // debugger;
    if (
      !fname ||
      !userMsisdn ||
      !gender ||
      !dob ||
      !placeofbirth ||
      !timeofbirth ||
      !maritalstatus ||
      !topicofconcern
    ) {
      this.showPopUp(this.props.t("Something is missing. Please enter all the mandatory fields"), false, false);
      return;
    }
    console.log("submitChatIntake", this.state);

    let datetimeofbirth =
      dob.toDateString() +
      " " +
      timeofbirth.getHours() +
      ":" +
      timeofbirth.getMinutes();
    datetimeofbirth = Date.parse(datetimeofbirth);

    console.log("datetimeofbirth", datetimeofbirth);

    var headers = getCommonHeaders();
    let requestBody = {
      data: [
        {
          controlType: "TEXT",
          displayTitle: "First Name",
          fieldColumnName: "first_name",
          fieldValue: fname,
          isEditable: 1,
          isMandatory: 1,
          maxLength: 50,
          minLength: 0,
          mode: "API",
          sequence: 7,
        },
        {
          controlType: "TEXT",
          displayTitle: "Last Name",
          fieldColumnName: "last_name",
          fieldValue: lname,
          isEditable: 1,
          isMandatory: 0,
          maxLength: 50,
          minLength: 0,
          mode: "API",
          sequence: 7,
        },
        {
          controlType: "TEXT",
          displayTitle: "Mobile No.",
          fieldColumnName: "msisdn",
          fieldValue: userMsisdn,
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
          "controlType": "TEXT",
          "displayTitle": "Birth Place",
          "fieldColumnName": "store_name",
          "fieldValue": placeofbirth,
          "isEditable": 1,
          "isMandatory": 1,
          "maxLength": 250,
          "minLength": 0,
          "mode": "API",
          "sequence": 7
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
                */
        {
          controlType: "TEXT",
          displayTitle: "Marital Status",
          fieldColumnName: "marital_status",
          fieldValue: maritalstatus,
          isEditable: 1,
          isMandatory: 1,
          maxLength: 20,
          minLength: 0,
          mode: "API",
          sequence: 7,
        },

        {
          controlType: "TEXT",
          displayTitle: "Occupation",
          fieldColumnName: "occupation",
          fieldValue: occupation,
          isEditable: 1,
          isMandatory: 0,
          maxLength: 250,
          minLength: 0,
          mode: "API",
          sequence: 7,
        },
        {
          controlType: "TEXT",
          displayTitle: "Short Description",
          fieldColumnName: "short_description",
          fieldValue: topicofconcern,
          isEditable: 1,
          isMandatory: 1,
          maxLength: 250,
          minLength: 0,
          mode: "API",
          sequence: 7,
        },
        {
          controlType: "TEXT",
          displayTitle: "Languages",
          fieldColumnName: "profile_language",
          fieldValue: answer,
          isEditable: 1,
          isMandatory: 1,
          maxLength: 50,
          minLength: 0,
          mode: "API",
          sequence: 7,
        },
        {
          controlType: "TEXT",
          displayTitle: "Description",
          fieldColumnName: "description",
          fieldValue: comments,
          isEditable: 1,
          isMandatory: 0,
          maxLength: 500,
          minLength: 0,
          mode: "API",
          sequence: 7,
        },
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
          fieldValue: userMsisdn,
          isEditable: 1,
          isMandatory: 1,
          maxLength: 10,
          minLength: 10,
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
        console.log("resp data", data);
        if (data.code == "2000") {
          console.log("postChatForm" + data);

          //  this.preStartChat();
          let typeOfService = this.state.typeOfService;
          if (typeOfService == "Chat") {
            this.props.history.push({
              pathname: FRONTEND_NAME + "/chat",
              state: { panditMsisdn: this.state.panditMsisdn },
            });
          } else if (typeOfService == "Report") {
            this.requestReport();
          }
        } else {
          console.log(data.msg);
          this.showPopUp(this.props.t(data.msg), false);
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
        console.log("preStart data", data);
        if (data.code == "2000") {
          this.showPopUp(
            this.props.t("Your request has been submitted succesfully. Please wait for astrologer to accept your request."),
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
    console.log("selected date", dob);
    this.setState({
      dob: dob,
    });
  };
  handleTimeChange = (timeofbirth) => {
    console.log("selected time", timeofbirth);
    this.setState({
      timeofbirth: timeofbirth,
    });
  };

  IsMob_Side_Nave = (e) => {
    this.setState({
      ...this.state,
      mobSideNaveTrue: e
    })
  }

  render() {
    const { t } = this.props;
    const {
      userMsisdn,
      fname,
      lname,
      gender,
      placeofbirth,
      dob,
      timeofbirth,
      maritalstatus,
      occupation,
      topics,
      topicofconcern,
      languages,
      answer,
      comments,
      showPopUp,
      msg,
      isSuccess,
      goToChatlist,
      typeOfService,
    } = this.state;
    let servicetype = typeOfService.toUpperCase();
    var titleKey = `${t('Report_Intake_Form')}`
    return (
      <div>
        <Chat_Talk_Header
          IsNavIconTrue={false}
          IsSearchTrue={false}
          IsFilterTrue={false}
          // editSearchTerm={this.editSearchTerm}
          // editSortTerm={this.editSortTerm}
          IsMob_Side_Nave={this.IsMob_Side_Nave}
          propsData={this.props}
          IsTitleTrue={true}
          title={titleKey}
        />
        <Header2
          IsActive_header_Or_not="chat_and_talk_header-"
        />

        {/* <BottomHeader /> */}
        <div className="container">
          {showPopUp && (
            <Popup
              msg={msg}
              isSuccess={isSuccess}
              closePopUp={this.closePopUp}
              goToChatlist={goToChatlist}
              type={"report"}
              successTitle={'Thank you!'}
              Isokbutton={false}
              widthSize=""
            />
          )}


          {/* <HeaderMenu /> */}
          <PageHeader
            name={{ firstname: servicetype + " WITH ASTROLOGER", lastname: "" }}
          />
          <div className="row page-body">
            <div className={this.state.mobSideNaveTrue ? "col-md-3 mobsidemenu mob_Side_Nave" : 'col-md-3 mobsidemenu'}>
              <SideMenu />
            </div>
            <div className="col form-body">
              <form className="form_container">
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
                                maxDate={new Date()}
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
                      <label for="exampleFormControlSelect1">
                        {t('Marital_status')}*
                      </label>
                      <select
                        className="form-control"
                        id="maritalstatus"
                        name="maritalstatus"
                        value={maritalstatus}
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
                      <label for="exampleFormControlSelect1">
                        {t('Topic_of_Concern*')}
                      </label>
                      <select
                        className="form-control"
                        id="topicofconcern"
                        name="topicofconcern"
                        value={topicofconcern}
                        onChange={this.handleChange}
                      >
                        {topics &&
                          topics.length > 0 &&
                          topics.map((item) => (
                            <option value={item.value}>{item.value}</option>
                          ))}
                      </select>
                    </div>
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
                                    */}

                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label for="exampleFormControlInput1">{t('Last_Name')}</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        name="lname"
                        value={lname}
                        onChange={this.handleChange}
                        placeholder={t('Last_Name')}
                      />
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
                      <label for="exampleFormControlInput1">
                        {t('Place_of_Birth*')}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="placeofbirth"
                        name="placeofbirth"
                        value={placeofbirth}
                        placeholder={t('Place_of_Birth*')}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label for="exampleFormControlInput1">
                        {t('Time_of_Birth')}*
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
                              KeyboardButtonProps={{
                                "aria-label": "change time",
                              }}
                            />
                          </Grid>
                        </ThemeProvider>
                      </MuiPickersUtilsProvider>
                    </div>
                    <div className="form-group">
                      <label for="exampleFormControlSelect1">{t('Occupation')}</label>
                      <input
                        type="text"
                        className="form-control"
                        id="occupation"
                        name="occupation"
                        value={occupation}
                        onChange={this.handleChange}
                      />
                    </div>

                    {/* <div className="form-group">
                      <label for="exampleFormControlInput1">{t('Any_Comments')}</label>
                      <input
                        type="text"
                        className="form-control"
                        id="anycomments"
                        name="comments"
                        value={comments}
                        onChange={this.handleChange}
                      />
                    </div> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label for="exampleFormControlSelect1">
                        {t('I_want_answer_in')}
                      </label>
                      <select
                        className="form-control"
                        id="answer"
                        name="answer"
                        value={answer}
                        onChange={this.handleChange}
                      >
                        {languages &&
                          languages.length > 0 &&
                          languages.map((item) => (
                            <option value={item.value}>{item.value}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col text-center"
                    style={{ paddingTop: "25px" }}
                  >
                    <button
                      type="submit"
                      style={{
                        width: "262px",
                        height: "44px",
                        backgroundColor: "#FF9C05",
                        color: "#ffffff",
                        borderRadius: "22px",
                      }}
                      className="btn mb-4"
                      onClick={this.submitChatIntake}
                    >
                      {t('Request Report')}
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

export default withTranslation()(ReportForm);
