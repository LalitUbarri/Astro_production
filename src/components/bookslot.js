
import React, { useEffect, useState } from "react";
import Header from "../common/Header2";
import Footer from "../common/Footer";
import BottomHeader from "../common/BottomHeader";
import SideMenu from "../common/SideMenu";
import PageHeader from "../common/PageHeader";
import moment from 'moment';
import "../styles/about.css";
import { getCommonHeaders } from "../configuration/commonFunctions";
import apis from "../configuration/apis";
// import { useHandleChange } from '.././hooks/useHandleChange'
import Popup from "../components/popup"
import Loading from "./loader"
import InputBox from "../common/InputBox"
import Button from "../common/Button"

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { orange } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { FRONTEND_NAME } from "../configuration/constants";

import { useTranslation } from "react-i18next";
import Chat_Talk_Header from "../common/Chat&Talk_Header";

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: orange,
  },
});

const BookSlot = (props) => {
  // const timeOfBirth = ["12:00AM", "01:00AM", "02:00AM", "03:00AM", "04:00AM", "05:00AM", "06:00AM", "07:00AM", "08:00AM", "08:00AM", "10:00AM", "11:00AM", "12:00PM", "01:00PM", "02:00PM", "03:00PM", "04:00PM", "05:00PM", "06:00PM", "07:00PM", "08:00PM", "09:00PM", "10:00PM","11:00PM"];

  console.log(props.location.state);

  const [t] = useTranslation();
  const [isSuccess, setIsSuccess] = useState(false);

  const [pandit, setPandit] = useState(props.location.state.panditData);
  //const [date, setDate] = useState(Date.now());useHandleChange
  const [date, setDate] = useState(Date.now());
  const [slotSelected, setSlotSelected] = useState({});
  const [slotSelectedMap, setSlotSelectedMap] = useState(new Map());
  const [fetchedSlot, setFetchedSlot] = useState();
  const [loading, setLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [slotBooked, setslotBooked] = useState(false);
  const [error, setError] = useState();
  const [error1, setError1] = useState('');

  const [isEmpty, setIsEmpty] = useState(false);

  const [isValid, setIsValid] = useState(true);

  const initialData = {
    name: {
      value: localStorage["profileData"] ? JSON.parse(localStorage["profileData"]).find((item) => item.fieldColumnName == "first_name"
      ).fieldValue : '',
      isValid: true,
      pattern: /^[a-zA-Z]{2,30}$/ig,
      errorMsg: t("* Name only accepts alphabets with the length greater than 1."),
      requiredMsg: t("* Please enter your name."),
    },
    phone: {
      value: localStorage["msisdn"],
      isValid: true,
      pattern: /^[6-9]{1}[0-9]{8-10}$/ig,
      errorMsg: t("* Mobile number should be of length 10 & starts with 6-9."),
      requiredMsg: t("* Please enter your Mobile number."),
    },
  }
  const [formData, setFormData] = useState(initialData);

  const setSlotValueInMap = slot => {
    // alert("Clicked slots")
    if (slotSelectedMap.has(slot.id)) {
      console.log("Already selected, removing from map")
      let tempSlotSelectedMap = slotSelectedMap
      tempSlotSelectedMap.delete(slot.id)
      setSlotSelectedMap(new Map(tempSlotSelectedMap))
    }
    else {
      console.log("Adding inside map")
      let tempSlotSelectedMap = slotSelectedMap
      tempSlotSelectedMap.set(slot.id, slot)
      setSlotSelectedMap(new Map(tempSlotSelectedMap));
    }

    setSlotSelected(slot)
  }

  const onChangeHandler = event => {
    setError(false);
    setIsEmpty(false);
    setIsValid(true);
    const name = event.target.name;
    const value = event.target.value;
    const regexp = new RegExp(initialData[name].pattern)
    const isvalid = regexp.test(value);

    setFormData(prevData => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        isValid: isvalid,
        value: value
      }
    }));
  }

  const fetchBookingSlot = () => {
    var headers = getCommonHeaders();
    // headers.msisdn = this.state.userProfile.getItem("msisdn");
    //const query = "?panditNumber=2222222222&date=1641839400000";
    const selectedDate = moment(date).unix()
    const panditMsisdn = pandit.goodsId
    let query = "?panditNumber=" + panditMsisdn + "&date=" + selectedDate + "000" + "&productType=" + (props.location.state && props.location.state.slotType ? props.location.state.slotType : "premiumCall");

    apis
      .fetchBookSlot(headers, query)
      .then((response) => response.data)
      .then((data) => {
        if (data.code == "2000") {
          let dataToPush = []
          data.data.forEach(d => {
            var startTime = new Date(d.startTime);
            var endTime = new Date(d.endTime);

            d.startTime = startTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            d.endTime = endTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            d.startTimeUnix = startTime.valueOf();
            d.endDateUnix = endTime.valueOf();
            if (startTime.valueOf() > currentTime) dataToPush.push(d)
          })

          setFetchedSlot(dataToPush)

        } else {
          setFetchedSlot([])
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleJourneyForm = (event) => {
    event.preventDefault();
    setLoading(true);
    // alert('Hu')
    if (checkForEmpty()) {
      setIsEmpty(true);
      setIsValid(true);
      setTimeout(() => {
        setLoading(false)
      }, 100);
      return;
    }

    if (!checkForValid()) {
      setIsValid(false);
      setIsEmpty(false);
      setTimeout(() => {
        setLoading(false)
      }, 100);
      return;
    }

    submitForm()
  }

  const checkForValid = () => {
    let isValid = true;
    for (const key in formData) {
      if (!formData[key].isValid) {
        isValid = false;
        setFormData({
          ...formData,
          [key]: {
            ...formData[key],
            isValid: false
          }
        })
        break;
      } else {
        isValid = true;
        setFormData({
          ...formData,
          [key]: {
            ...formData[key],
            isValid: true
          }
        })
      }
    }
    return isValid;
  }

  const checkForEmpty = () => {
    let isEmpty = true;
    for (const key in formData) {
      if (formData[key].value === '') {
        isEmpty = true;
        setFormData({
          ...formData,
          [key]: {
            ...formData[key],
            isValid: false
          }
        })
        break;
      } else {
        isEmpty = false;
        setFormData({
          ...formData,
          [key]: {
            ...formData[key],
            isValid: true
          }
        })
      }
    }
    return isEmpty;
  }


  useEffect(() => {
    fetchBookingSlot();
  }, [date])

  const submitForm = () => {
    setLoading(true)

    const headers = getCommonHeaders();

    let slotIds = [];

    for (const slotId of slotSelectedMap.keys()) {
      slotIds.push(slotId)
    }

    const body = {
      "bookPremiumSlotDTO": {
        "endDate": slotSelected.endDateUnix,
        // "name": firstName, //.userDetails.firstName,
        "name": formData.name.value, //.userDetails.firstName,
        "notification": 0,
        //"phoneNumber":phoneNumber,formData
        "phoneNumber": localStorage['selectedCountryCode'] + formData.phone.value,
        "productId": pandit.goodsId,
        "productType": props.location.state.slotType,
        // "slotId":slotSelected.id,
        "slotId": slotIds,
        "startDate": slotSelected.startTimeUnix
      },
      "redeemPointDTO": {
        "address": {
          "deliveryMobileNo": "",
          "deliveryName": "NA"
        },
        "isQuantityCheck": "0",
        "isSelfPaytm": "3",
        "paytmNumber": "0",
        "redeemCategory": props.location.state.slotType,
        "redeemMode": pandit.goodsId, // can be ONLINE
        "redeemParentCategory": "whiteGoods",
        "redeemPoint": pandit.goodsPrice,
        "redeemUnit": "1",
        "redeemValue": pandit.goodsPrice,
        "redemptionAddress": "NA"
      }
    };

    apis
      .bookSlot(headers, body)
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        if (data.code == "2000") {
          setMsg(t("Slot successfully booked"))
          setIsError(false)
          setIsSuccess(true);
          setShowPopUp(true)
          setError1('')
          localStorage['slotBooked'] = true


        }
        else {
          setMsg(t("Error while booking slot"))
          setIsSuccess(false);
          setIsError(true)
          setShowPopUp(true)
          setError1('error')
          localStorage['slotBooked'] = false
        }
        setLoading(false)
      })
      .catch((error) => {
        setMsg(t("Error while booking slot"))
        setIsSuccess(false);
        setError1('error')
        setIsError(true)
        localStorage['slotBooked'] = false
        setShowPopUp(true)
        setLoading(false)
        console.log(error);
      });

  }

  const closePopUp = () => {
    setShowPopUp(false)

    props.history.push({
      pathname: FRONTEND_NAME + "/premium",
      state: { selectedPage: props.location.state.slotType }
    })

  }

  // const handleDateChange = (dob) => {
  //   console.log("selected date", dob);
  //   setDate(moment.format(dob)));
  // };


  const { name, phone } = formData
  const currentTime = new Date().getTime()
  console.log(currentTime)
  console.log("Dateeee ", date)
  return (
    <>
      <Chat_Talk_Header
        IsNavIconTrue={false}
        IsSearchTrue={false}
        IsFilterTrue={false}
        // editSearchTerm={this.editSearchTerm}
        // editSortTerm={this.editSortTerm}
        // IsMob_Side_Nave={this.IsMob_Side_Nave}
        propsData={props}
        CustomClass={true}
        IsTitleTrue={true}
        title={t('Book_Slots')}
      />
      {showPopUp && (
        <Popup
          msg={msg}
          isSuccess={isSuccess}
          closePopUp={closePopUp}
          Isicon={true}
          IsiconType={error1}
        />
      )}
      <div className="mob_480">
        <Header />
        <PageHeader
          name={{ firstname: t('book slot'), lastname: '' }}
          // editSearchTerm={editSearchTerm}
          // editSortTerm={editSortTerm}
          showSortOptions={true}
        />
      </div>

      {/* <BottomHeader /> */}
      {/* {showPopUp &&
        <Popup
          msg={msg}
          isSuccess={!isError}
          closePopUp={closePopUp}
        />
      } */}

      {loading && <Loading />}

      <div className="page-body" style={{ marginBottom: "50px", padding: '10px' }}>
        <div className="row">
          <div className="col-xs-12 col-md-3 mobsidemenu">
            <SideMenu />
          </div>
          <div className="col-xs-12 col-md-9"
            style={{
              background: "#FFFFFF 0% 0% no-repeat padding-box",
              border: "0.5px solid #41485350", opacity: "1"
            }}>
            {isEmpty && <div id="error" style={{ color: '#dc3545', fontSize: 21, margin: "5px 0px", fontWeight: 'bold', textAlign: "center" }}>
              {"Please fill all required field."}
            </div>}
            {!isValid && <div id="error" style={{ color: '#dc3545', fontSize: 21, margin: "5px 0px", fontWeight: 'bold', textAlign: "center" }}>
              {"Please fill all required field correctly."}
            </div>}
            <form style={{ width: "100%", }}>
              <input type="hidden" autoComplete="off" />
              <div className="row" style={{ color: "#222222" }}>
                <div className="col-md-12">
                  <div class="mt-3 mb-3">
                    <label class="form-label float-left">{t('First_NAME')}<span style={{ color: "#C70404" }}>*</span></label>
                    {/* <input type="text" value={firstName} 
                          required="true" 
                          class="form-control"
                          onChange={setFirstName} 
                      /> */}
                    <InputBox
                      fontSize="14px"
                      value={formData["name"].value}
                      name="name"
                      labelText={"First name"}
                      handleChange={onChangeHandler}
                      cssClass={name.isValid ? "form-control" : "form-control is-invalid"}
                    />
                    {!name.isValid ? name.value !== '' ?
                      <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem' }}>
                        {name.errorMsg}
                      </div> : <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem' }}>
                        {name.requiredMsg}
                      </div> : <div style={{ height: 20 }}></div>
                    }
                  </div>
                  <div class="mt-3 mb-3">
                    <label class="form-label float-left">{t('Phone_Number')}<span style={{ color: "#C70404" }}>*</span></label>
                    {/* <input type="phone" value={phoneNumber} 
                              onChange={setPhoneNumber} class="form-control" 
                          /> */}

                    <InputBox
                      fontSize="14px"
                      value={formData["phone"].value}
                      name="phone"
                      labelText={"Phone number"}
                      handleChange={onChangeHandler}
                      cssClass={phone.isValid ? "form-control" : "form-control is-invalid"}
                    />
                    {!phone.isValid ? phone.value !== '' ?
                      <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem' }}>
                        {phone.errorMsg}
                      </div> : <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem' }}>
                        {phone.requiredMsg}
                      </div> : <div style={{ height: 20 }}></div>
                    }
                  </div>
                  <div class="mt-1 mb-3">
                    <label class="form-label float-left">{t('Book_Slot')}<span style={{ color: "#C70404" }}>*</span></label>
                    {/* <input type="date" class="form-control" value={date} onChange={setDate}/> */}

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <ThemeProvider theme={defaultMaterialTheme}>
                        <Grid container justify="space-around">
                          <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            // label="Date of Birth"
                            name="date"
                            format="dd/MM/yyyy"
                            value={date ? date : null}
                            onChange={(dob) => {
                              //alert(dob)
                              //let a = moment(new Date(dob)).format("YYYY-MM-DD")
                              //let a = moment(dob).unix() +
                              console.log("Dateeee", dob)
                              setDate(dob)
                            }}
                            minDate={new Date()}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </Grid>
                      </ThemeProvider>
                    </MuiPickersUtilsProvider>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-12">
                      <label className="form-label float-left" style={{ color: "#222222" }}>{t('Choose_Time_Slots')}</label>
                    </div>
                  </div>
                  <div className="row h-scroll pl-3 pr-3">
                    {/* {fetchedSlot && fetchedSlot.filter(slot => slot.bookedBy === null && slot.startTimeUnix >= currentTime).map((slot) => ( */}
                    {fetchedSlot && fetchedSlot.map((slot) => {
                      // console.log(slot.startTimeUnix)
                      // console.log(currentTime)
                      return <div className="col-md-3 col-6 p-1" onClick={() => (slot.bookedBy === null && slot.startTimeUnix >= currentTime) && setSlotValueInMap(slot)}>
                        <div className={slotSelectedMap && slotSelectedMap.has(slot.id) ? "border pt-2 pb-2 is-selected" : slot.bookedBy !== null || slot.startTimeUnix < currentTime ? "border pt-2 pb-2 timeslot-disabled" : "border pt-2 pb-2 timeslot"}>
                          {slot.startTime} - {slot.endTime}
                        </div>
                      </div>
                    })}
                    {!fetchedSlot || fetchedSlot.length < 1 && (
                      <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem' }}>
                        {t('No_Slot_Found')}
                      </div>
                    )}
                  </div>
                  <div className="row mt-4 mb-4">
                    <Button
                      onSubmit={handleJourneyForm}
                      valid={!fetchedSlot || fetchedSlot.length < 1 || Object.keys(slotSelected).length === 0}
                      type="submit" wait={true} loading={loading}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer history={props} />
    </>
  )
}

export default BookSlot;