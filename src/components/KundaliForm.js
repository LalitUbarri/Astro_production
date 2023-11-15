import React, { useState, useEffect } from 'react'

// import Header from "../common/Header"
import Footer from "../common/Footer"
// import BottomHeader from "../common/BottomHeader"
import SideMenu from "../common/SideMenu"
import PageHeader from "../common/PageHeader"
import User from "../images/user.svg"
import moment from 'moment'

import "../styles/kundali.css"

import Grid from "@material-ui/core/Grid"
import DateFnsUtils from "@date-io/date-fns"
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers"

import { orange } from "@material-ui/core/colors"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"

// import Loading from "./loader"
import InputBox from "../common/InputBox"
import Button from "../common/Button"

import { useTranslation } from "react-i18next"
import { FRONTEND_NAME } from "../configuration/constants"

//API
import { getCommonHeaders } from "../configuration/commonFunctions"
import apis from "../configuration/apis"
import { KundaliBody } from "../configuration/kundaliBody"
import Header2 from '../common/Header2'

import Popup from "../components/popup";
import Chat_Talk_Header from '../common/Chat&Talk_Header'
import BottomTab from '../common/BottomTab'

const defaultMaterialTheme = createMuiTheme({
    palette: {
        primary: orange,
    },
})

const KundaliForm = (props) => {

    //Translation 
    const [t] = useTranslation()
    var fname = localStorage["profileData"]
        ? JSON.parse(localStorage["profileData"]).find(
            (item) => item.fieldColumnName == "first_name"
        ).fieldValue
        : "";

    var lname = localStorage["profileData"]
        ? JSON.parse(localStorage["profileData"]).find(
            (item) => item.fieldColumnName == "last_name"
        ).fieldValue
        : "";
    //Initial Form Data
    const initialData = {
        name: {
            value: localStorage["profileData"] ? fname + " " + lname : "",
            isValid: true,
            pattern: /^[a-zA-Z ,.]{2,30}$/ig,
            errorMsg: t("* Name only accepts alphabets with the length greater than 1."),
            requiredMsg: t("* Please enter your name."),
        },
        phone: {
            value: localStorage["msisdn"],
            isValid: true,
            pattern: /^[0-9]{9,13}$/ig,
            errorMsg: t("* Mobile number should be length between 9 & 13."),
            requiredMsg: t("* Please enter your Mobile number."),
        },
        gender: {
            value: 'male',
            isValid: true,
            pattern: /^[a-z]*/ig,
            errorMsg: t("* Mobile number should be of length 10 & starts with 6-9."),
            requiredMsg: t("* Please select your gender."),
        },
        birthDate: {
            value: '',
            isValid: true,
            pattern: '',
            errorMsg: t("* Please enter your Date of Birth."),
            requiredMsg: t("* Please enter your Date of Birth."),
        },
        birthTime: {
            value: '',
            isValid: true,
            pattern: '',
            errorMsg: t("* Please enter your Time of Birth."),
            requiredMsg: t("* Please enter your Time of Birth."),
        },
        placeOfBirth: {
            value: '',
            isValid: true,
            pattern: /^[a-z]*/ig,
            errorMsg: t("* Please enter correct placeOfBirth."),
            requiredMsg: t("* Please enter place of birth."),
        },
        longitude: {
            value: '',
            isValid: true,
            pattern: /^[0-9]*/ig,
            errorMsg: t("* Mobile number should be of length 10 & starts with 6-9."),
            requiredMsg: t("* Please enter longitude."),
        },
        latitude: {
            value: '',
            isValid: true,
            pattern: /^[0-9]*/ig,
            errorMsg: "* Mobile number should be of length 10 & starts with 6-9.",
            requiredMsg: t("* Please enter your latitude."),
        },
        bookmark: {
            value: false,
            isValid: true,
            pattern: /^[a-z]*/ig,
            errorMsg: "* Mobile number should be of length 10 & starts with 6-9.",
            requiredMsg: "* Please enter your bookmark.",
        },
    }

    //Navigation State
    const [selectedNav, setSelectedNav] = useState("New Kundali")

    //Data State
    const [loading, setLoading] = useState(false);

    //Form State
    const [formData, setFormData] = useState(initialData)
    const [error, setError] = useState()
    const [isEmpty, setIsEmpty] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [timeofbirth, setTimeofbirth] = useState()
    const [dob, setDob] = useState()
    const [gender, setGender] = useState('male')
    const [bookmark, setBookmark] = useState(false)
    const [placeOfBirth, setPlaceOfBirth] = useState('')
    const [fetchedCity, setFetchedCity] = useState([])
    const [showPopUp, setShowPopUp] = useState(false)
    const [msg, setMsg] = useState("");
    const [state, setState] = useState({
        mobSideNaveTrue: false,
        mobPage_headerTrue: false,
    })

    // const savedKundali = localStorage.getItem('kundaliData') ? JSON.parse(localStorage.getItem('kundaliData')) : []
    const [savedKundali, setSavedKundali] = useState([])

    const redirectToEditForm = (data) => {

        // alert(JSON.stringify(data))
        console.log(data.pob)
        setDob(moment(new Date(data.dob)).format('YYYY-MM-DDThh:mm:ssZ'))
        setTimeofbirth(moment(new Date(data.birthTime1)).format('YYYY-MM-DDThh:mm:ssZ'))
        setGender(data.gender)
        onChangeHandler({ target: { name: 'latitude', value: data.lat } })
        onChangeHandler({ target: { name: 'longitude', value: data.log } })
        onChangeHandler({ target: { name: 'phone', value: data.phoneNumber } })
        setPlaceOfBirth(data.pob)
        handlePlaceOfBirth({ target: { name: 'placeOfBirth', value: data.pob } })
        onChangeHandler({ target: { name: 'name', value: data.fullName } })

        setSelectedNav("New Kundali")


        // props.history.push({
        //     pathname: FRONTEND_NAME + "/kundalidetails",
        //     state: { kundaliFormData:  data},
        // })
    }

    const redirectToKundaliDetails = (data) => {
        //console.log(data)
        props.history.push({
            pathname: FRONTEND_NAME + "/kundalidetails",
            state: { kundaliFormData: data },
        })
    }

    const onChangeHandler = event => {
        setError(false)
        setIsEmpty(false)
        setIsValid(true)
        //alert(JSON.stringify(event.target))
        const name = event.target.name
        const value = event.target.value
        const regexp = new RegExp(initialData[name].pattern)
        const isvalid = (initialData[name].pattern === '') ? true : regexp.test(value)

        setFormData(prevData => ({
            ...prevData,
            [name]: {
                ...prevData[name],
                isValid: isvalid,
                value: value
            }
        }))
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
            if (formData[key].value === '' || formData[key].value === undefined) {
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

    const handleTimeChange = (timeofbirth) => {
        setTimeofbirth(timeofbirth)
    };

    const handlePlaceOfBirth = (e) => {
        setPlaceOfBirth(e.target.value)

        onChangeHandler({ target: { name: 'placeOfBirth', value: e.target.value } })
    }

    const onBlurfunction = () => {

        fetchKundaliData(placeOfBirth);
    }

    const fetchKundaliData = (POB) => {

        // propsData
        const headers = getCommonHeaders()

        let url = "geoDetails"

        const body = KundaliBody({
            place: POB,
            maxRows: 5,
        }, url, [], 3)

        apis
            .getKundaliDetails(body, headers)
            .then((response) => response.data)
            .then((data) => {
                // alert(JSON.stringify(data));
                if (!data.code) {

                    setFetchedCity(data.geonames)
                    console.log("geonames", data.geonames[0]);
                    // console.log("geonames1", data.geonames[0].latitude);
                    // console.log("geonames2", data.geonames[0].longitude);
                    if (data.geonames[0].place_name.toLowerCase() === POB.toLowerCase()) {
                        onChangeHandler({ target: { name: 'longitude', value: data.geonames[0].longitude } })
                        onChangeHandler({ target: { name: 'latitude', value: data.geonames[0].latitude } })
                    }
                    // data.geonames.filter(f => f.place_name.toLowerCase() === POB.toLowerCase()).map(f => {
                    //     console.log("longitude", f.longitude)
                    //     onChangeHandler({ target: { name: 'longitude', value: f.longitude } })
                    //     onChangeHandler({ target: { name: 'latitude', value: f.latitude } })
                    // })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        onChangeHandler({ target: { name: 'gender', value: gender } })
    }, [gender])

    useEffect(() => {
        onChangeHandler({ target: { name: 'birthDate', value: dob } })
    }, [dob])

    useEffect(() => {
        onChangeHandler({ target: { name: 'birthTime', value: timeofbirth } })
    }, [timeofbirth])

    useEffect(() => {
        onChangeHandler({ target: { name: 'bookmark', value: bookmark } })
    }, [bookmark])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const fetchKundaliDataFromServer = () => {
        var headers = getCommonHeaders();
        const query = localStorage['selectedCountryCode'] + localStorage['msisdn'];

        apis
            .getKundaliHoroscopeInfo(headers, query)
            .then((response) => response.data)
            .then((data) => {
                console.log(data)
                if (data.code === 2000) {
                    setSavedKundali(data.data)
                }
                else {
                    setSavedKundali([])
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const savingKundaliData = (event) => {
        event.preventDefault()

        if (checkForEmpty()) {
            setIsEmpty(true);
            setIsValid(true);
            setTimeout(() => {
                setLoading(false)
            }, 100);
            //alert(t('Some field empty'))
            setMsg('Please fill all required fields');
            setShowPopUp(true);
            return;
        }

        if (!checkForValid()) {
            setIsEmpty(false);
            setIsValid(false);
            setTimeout(() => {
                setLoading(false)
            }, 100);
            //alert(t(''))
            setMsg('Some field have invalid data');
            setShowPopUp(true);
            return;
        }

        var headers = getCommonHeaders();
        const query = localStorage['selectedCountryCode'] + localStorage['msisdn'];

        let requestBody = {
            name: formData['name'].value,
            phone: formData['phone'].value,
            gender: gender,
            birthDate: dob,
            birthTime: timeofbirth,
            placeOfBirth: formData['placeOfBirth'].value,
            longitude: formData['longitude'].value,
            latitude: formData['latitude'].value,
            tzone: 5.5
        }
        let bodyKundali = {
            input: [
                {
                    dob: moment(dob).format("yyyy-MM-DD"),
                    fullName: formData['name'].value,
                    msisdn: localStorage['selectedCountryCode'] + localStorage['msisdn'],
                    phoneNumber: formData['phone'].value,
                    pob: formData['placeOfBirth'].value,
                    lat: formData['longitude'].value,
                    log: formData['latitude'].value,
                    gender: gender,
                    birthTime: moment(timeofbirth)
                }
            ],
            serviceType: "kundali",
        }
        if (bookmark) {
            bodyKundali.isBookmark = true
        } else {
            bodyKundali.isBookmark = false
        }

        apis
            .saveKundaliHoroscopeInfo(headers, bodyKundali)
            .then((response) => response.data)
            .then((data) => {
                console.log(data)
                if (data.code === 2000) {
                    redirectToKundaliDetails(requestBody)
                }
                else {
                }
            })
            .catch((error) => {
                console.log(error);
                setMsg('Error while saving data');
                setShowPopUp(true);
            });



        // if (bookmark) {
        //     let kunadliLocalData = localStorage.getItem('kundaliData') ? JSON.parse(localStorage.getItem('kundaliData')) : []
        //     kunadliLocalData.push(requestBody)
        //     localStorage.setItem('kundaliData', JSON.stringify(kunadliLocalData))
        // }

        // redirectToKundaliDetails(requestBody)
    }

    useEffect(() => {
        fetchKundaliDataFromServer()
    }, [])

    const sumbitForm = (event) => {
        event.preventDefault()

        if (checkForEmpty()) {
            setIsEmpty(true);
            setIsValid(true);
            setTimeout(() => {
                setLoading(false)
            }, 100);
            setMsg('Some field empty');
            setShowPopUp(true);
            return;
        }

        let requestBody = {
            name: formData['name'].value,
            phone: formData['phone'].value,
            gender: gender,
            birthDate: dob,
            birthTime: timeofbirth,
            placeOfBirth: formData['placeOfBirth'].value,
            longitude: formData['longitude'].value,
            latitude: formData['latitude'].value,
            tzone: 5.5
        }

        if (bookmark) {
            let kunadliLocalData = localStorage.getItem('kundaliData') ? JSON.parse(localStorage.getItem('kundaliData')) : []
            kunadliLocalData.push(requestBody)
            localStorage.setItem('kundaliData', JSON.stringify(kunadliLocalData))
        }

        redirectToKundaliDetails(requestBody)
    }

    const IsMob_Side_Nave = (e) => {
        setState({
            ...state,
            mobSideNaveTrue: e

        })
    }

    const { name, phone, birthDate, birthTime, longitude, latitude } = formData
    var titleKey = 'Kundali'
    return (
        <>

            {showPopUp && (
                <Popup
                    heading={t('Alert')}
                    msg={msg}
                    button={"Ok"}
                    closePopUp={() => setShowPopUp(false)}
                />
            )}
            <Chat_Talk_Header
                IsNavIconTrue={false}
                IsSearchTrue={false}
                IsFilterTrue={false}
                // editSearchTerm={this.editSearchTerm}
                // editSortTerm={this.editSortTerm}
                // IsMob_Side_Nave={IsMob_Side_Nave}
                propsData={props}
                IsTitleTrue={true}
                CustomClass={true}
                title={titleKey}
            />
            <div className="desk_top">
                <BottomTab data={props} />
            </div>
            <Header2
                IsActive_header_Or_not="chat_and_talk_header-"
            />
                <div className="container">
                <PageHeader
                Mob_HeaderIsTrue={'not_show_mob_header1'}
                name={{ firstname: 'Kundali', lastname: '' }}
                showSortOptions={true}
            />
            <div className="page-body">
                <div className="row">
                    <div className={state.mobSideNaveTrue ? "col-md-3 mobsidemenu mob_Side_Nave" : 'col-md-3 mobsidemenu'}>
                        <SideMenu />
                    </div>
                    <div className="col-md-9">
                        <div className='d-flex justify-content-center'>
                            <div onClick={() => setSelectedNav("Open Kundali")} className={selectedNav === "Open Kundali" ? "kundali-nav kundali-nav-active" : "kundali-nav"} >
                                {t('Open Kundali')}
                            </div>
                            <div onClick={() => setSelectedNav("New Kundali")} className={selectedNav === "New Kundali" ? "kundali-nav kundali-nav-active" : "kundali-nav"}>
                                {t('New Kundali')}
                            </div>
                        </div>
                        {(selectedNav === 'New Kundali') ?
                            <div className="row mt-3 mob-kundali_from" style={{ marginLeft: '-10px', marginRight: '-10px' }}>
                                {/* {isEmpty && <div id="error" style={{ color: '#dc3545', fontSize: 21, margin: "5px 15px", fontWeight: 'bold', textAlign: "center" }}>
                                    {"Please fill all required field."}
                                </div>} */}
                                <form style={{ width: "100%" }}>

                                    <div className="col-md-12">
                                        <div className="row" style={{ color: "#222222", marginLeft: '-10px', marginRight: '-10px' }}>
                                            <div className="col-md-6 form_inner_container">
                                                <div className="mt-3 mb-3">
                                                    <label class="form-label float-left">{t('First_NAME')}<span style={{ color: "#C70404" }}>*</span></label>
                                                    <InputBox
                                                        fontSize="14px"
                                                        value={formData["name"].value}
                                                        name="name"
                                                        labelText={"First name"}
                                                        handleChange={onChangeHandler}
                                                    // cssClass={firstName.isValid ? "form-control" : "form-control is-invalid"}
                                                    />
                                                    {!name.isValid ? name.value !== '' ?
                                                        <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem', textAlign: 'start' }}>
                                                            {name.errorMsg}
                                                        </div> : <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem', textAlign: 'start' }}>
                                                            {name.requiredMsg}
                                                        </div> : <div className="mb-480" style={{ height: 20 }}></div>
                                                    }

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mt-3 mb-3">
                                                    <label class="form-label float-left">{t('Phone_Number')}<span style={{ color: "#C70404" }}>*</span></label>
                                                    <InputBox
                                                        fontSize="14px"
                                                        value={formData["phone"].value}
                                                        name="phone"
                                                        labelText={"Phone number"}
                                                        handleChange={onChangeHandler}
                                                    // cssClass={firstName.isValid ? "form-control" : "form-control is-invalid"}
                                                    />
                                                    {!phone.isValid ? phone.value !== '' ?
                                                        <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem', textAlign: 'start' }}>
                                                            {phone.errorMsg}
                                                        </div> : <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem', textAlign: 'start' }}>
                                                            {phone.requiredMsg}
                                                        </div> : <div className="mb-480" style={{ height: 20 }}></div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" style={{ color: "#222222" }}>
                                            <div className="col-md-12 form_inner_container">
                                                <div className="mt-3">
                                                    <label class="form-label float-left">{t('Gender')}<span style={{ color: "#C70404" }}>*</span></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" style={{ color: "#222222" }}>
                                            <div className="col-md-12 form_inner_container">
                                                <div className="mb-3 float-left">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male" onChange={() => setGender('male')} checked={gender === 'male'} />
                                                        <label class="form-check-label" for="inlineRadio1">{t('Male')}</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female" onChange={() => setGender('female')} checked={gender === 'female'} />
                                                        <label class="form-check-label" for="inlineRadio2">{t('Female')}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" style={{ color: "#222222" }}>
                                            <div className="col-md-6">
                                                <div className="mt-3 mb-3">
                                                    <label class="form-label float-left">{t('Birth Date')}<span style={{ color: "#C70404" }}>*</span></label>
                                                    {/* <InputBox
                                                        fontSize="14px"
                                                        type="date"
                                                        value={formData["birthDate"].value}
                                                        name="birthDate"
                                                        labelText={"Birth Date"}
                                                        handleChange={onChangeHandler}
                                                        // cssClass={firstName.isValid ? "form-control" : "form-control is-invalid"}
                                                    /> */}

                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <ThemeProvider theme={defaultMaterialTheme}>
                                                            <Grid container justify="space-around">
                                                                <KeyboardDatePicker
                                                                    margin="normal"
                                                                    id="date-picker-dialog"
                                                                    name="birthDate"
                                                                    format="dd/MM/yyyy"
                                                                    value={dob ? dob : null}
                                                                    onChange={(dob) => setDob(dob)}
                                                                    maxDate={new Date()}
                                                                    KeyboardButtonProps={{
                                                                        "aria-label": "change date",
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </ThemeProvider>
                                                    </MuiPickersUtilsProvider>
                                                    {!birthDate.isValid ? birthDate.value !== '' ?
                                                        <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem', textAlign: 'start' }}>
                                                            {birthDate.errorMsg}
                                                        </div> : <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem', textAlign: 'start' }}>
                                                            {birthDate.requiredMsg}
                                                        </div> : <div className="mb-480" style={{ height: 20 }}></div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-6 form_inner_container">
                                                <div className="mt-3 mb-3">
                                                    <label class="form-label float-left">{t('Birth Time')}<span style={{ color: "#C70404" }}>*</span></label>
                                                    {/* <InputBox
                                                        fontSize="14px"
                                                        value={formData["birthTime"].value}
                                                        name="birthTime"
                                                        labelText={"Birth Time"}
                                                        handleChange={onChangeHandler}
                                                        // cssClass={firstName.isValid ? "form-control" : "form-control is-invalid"}
                                                    /> */}
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <ThemeProvider theme={defaultMaterialTheme}>
                                                            <Grid container justify="space-around">
                                                                <KeyboardTimePicker
                                                                    margin="normal"
                                                                    id="time-picker"
                                                                    name="birthTime"
                                                                    value={timeofbirth ? timeofbirth : null}
                                                                    onChange={handleTimeChange}
                                                                    KeyboardButtonProps={{
                                                                        "aria-label": "change time",
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </ThemeProvider>
                                                    </MuiPickersUtilsProvider>
                                                    {!birthTime.isValid ? birthTime.value !== '' ?
                                                        <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem', textAlign: 'start' }}>
                                                            {birthTime.errorMsg}
                                                        </div> : <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem', textAlign: 'start' }}>
                                                            {birthTime.requiredMsg}
                                                        </div> : <div style={{ height: 20 }}></div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" style={{ color: "#222222" }}>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label class="form-label float-left">{t('Place of Birth')}<span style={{ color: "#C70404" }}>*</span></label>
                                                    {/* <InputBox
                                                        fontSize="14px"
                                                        value={formData["placeOfBirth"].value}
                                                        placeholder="ex. Mumbai"
                                                        name="placeOfBirth"
                                                        labelText={"placeOfBirth"}
                                                        handleChange={onChangeHandler}
                                                    /> */}
                                                    <input list="places"
                                                        className="form-control"
                                                        name="placeOfBirth"
                                                        id="placeOfBirth"
                                                        value={placeOfBirth}
                                                        fontSize="14px"
                                                        onChange={handlePlaceOfBirth}
                                                        onBlur={onBlurfunction}
                                                    />

                                                    <datalist id="places" >
                                                        {fetchedCity && fetchedCity.map(city => (
                                                            <option value={city.place_name}>{city.country_code}</option>
                                                        ))}
                                                    </datalist>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" style={{ color: "#222222" }}>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label class="form-label float-left">{t('Longitude')}</label>
                                                    <InputBox
                                                        fontSize="14px"
                                                        value={formData["longitude"].value}
                                                        placeholder="ex. -116.18"
                                                        name="longitude"
                                                        labelText={"Longitude"}
                                                        handleChange={onChangeHandler}
                                                    // cssClass={firstName.isValid ? "form-control" : "form-control is-invalid"}
                                                    />
                                                    {!longitude.isValid ? longitude.value !== '' ?
                                                        <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem', textAlign: 'start' }}>
                                                            {longitude.errorMsg}
                                                        </div> : <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem', textAlign: 'start' }}>
                                                            {longitude.requiredMsg}
                                                        </div> : <div className="mb-480" style={{ height: 20 }}></div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label class="form-label float-left">{t('Latitude')}</label>
                                                    <InputBox
                                                        fontSize="14px"
                                                        value={formData["latitude"].value}
                                                        placeholder="ex. 46.61"
                                                        name="latitude"
                                                        labelText={"Latitude"}
                                                        handleChange={onChangeHandler}
                                                    // cssClass={firstName.isValid ? "form-control" : "form-control is-invalid"}
                                                    />
                                                    {!latitude.isValid ? latitude.value !== '' ?
                                                        <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem', textAlign: 'start' }}>
                                                            {latitude.errorMsg}
                                                        </div> : <div style={{ color: '#dc3545', fontSize: '80%', marginTop: '0.25rem', textAlign: 'start' }}>
                                                            {latitude.requiredMsg}
                                                        </div> : <div style={{ height: 20 }}></div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" style={{ color: "#222222" }}>
                                            <div className="col-md-12 mt-3">
                                                <div class="form-check float-left">
                                                    <input
                                                        class="form-check-input"
                                                        type="checkbox"
                                                        name="bookmark"
                                                        value={formData['bookmark'].value}
                                                        id="flexCheckChecked"
                                                        checked={bookmark}
                                                        onChange={() => setBookmark(!bookmark)}
                                                    />
                                                    <label class="form-label">{t('Save as bookmark')}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-5 mb-4">
                                            <Button
                                                type="submit"
                                                className="btn"
                                                onSubmit={savingKundaliData}
                                                valid={false}
                                                buttonText={t('Generate Horoscope')}
                                                wait={true}
                                                loading={loading}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div> :
                            <>
                                <div className="row mt-3" style={{ marginLeft: '-10px', marginRight: '-10px' }}>
                                    {savedKundali && savedKundali.map(
                                        (data) => (
                                            <div className="col-md-12">
                                                <div class="card cardForHover mt-3" style={{ cursor: 'pointer' }} onClick={() => redirectToEditForm(data)} >
                                                    <div class="card-body">
                                                        <img src={User} class="card-img-top rounded-circle float-left mr-3" style={{ width: '50px' }} alt='user'/>
                                                        <div className="content float-left">
                                                            <p className="font-weight-bold" style={{ fontSize: '14px', textAlign: 'start', marginLeft: '10px' }}>{data.fullName}</p>
                                                            <p className="font-weight-normal" style={{ fontSize: '12px', marginBottom: '0px', marginLeft: '10px', textAlign: 'start' }}>{moment(new Date(data.dob)).format("DD MMM YYYY")}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                    {/* {moment(new Date(data.birthTime)).format('hh:mm A')} */}
                                    {
                                        (savedKundali && savedKundali.length === 0) &&
                                        <>
                                            <div className="col-md-3"></div>
                                            <div className="col-md-4 mt-3 mb-3">
                                                <span style={{ textAlign: 'center' }}>{t('No bookmarked data found!!')}</span>
                                            </div>
                                            <div className="col-md-5"></div>
                                        </>
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
                </div>
            
            
            <Footer history={props} />
        </>
    )
}

export default KundaliForm;