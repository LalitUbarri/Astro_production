import React, { useState, useEffect } from 'react'

// import Header from "../common/Header"
import Footer from "../common/Footer"
import BottomHeader from "../common/BottomHeader"
import SideMenu from "../common/SideMenu"
import PageHeader from "../common/PageHeader"
import User from "../images/user.svg"
import moment from 'moment'
import Popup from "../components/popup";
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

import Loading from "./loader"
import InputBox from "../common/InputBox"
import Button from "../common/Button"

import { useTranslation } from "react-i18next"
import { FRONTEND_NAME } from "../configuration/constants"

//API
import { getCommonHeaders } from "../configuration/commonFunctions"
import apis from "../configuration/apis"
import { KundaliBody } from "../configuration/kundaliBody"
import Header2 from '../common/Header2'
import { isValid } from 'date-fns'
import Chat_Talk_Header from '../common/Chat&Talk_Header'
import BottomTab from '../common/BottomTab'


const defaultMaterialTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#FF9C05'
        },
    },
})

const MatchingForm = (props) => {
    const [state, setState] = useState({
        mobSideNaveTrue: false,
        mobPage_headerTrue: false,
        showPopUp: false,
        msg: "",
        button: "OK",
        heading: "Astrology",
    })

    //Translation 
    const [t] = useTranslation()

    let cityTimeout
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
        boyName: {
            value: localStorage['profileData'] ? fname + " " + lname : "",
            isValid: true,
            pattern: /^[a-zA-Z ]{2,30}$/ig,
            errorMsg: t("* Name only accepts alphabets with the length greater than 1."),
            requiredMsg: t("* Please enter your name."),
        },
        boyPhone: {
            value: localStorage["msisdn"],
            isValid: true,
            pattern: /^[0-9]{10,13}$/ig,
            errorMsg: t("* Mobile number should be of length 10 & starts with 6-9."),
            requiredMsg: t("* Please enter your Mobile number."),
        },
        boyBirthDate: {
            value: '',
            isValid: true,
            pattern: '',
            errorMsg: t("* Please enter your Date of Birth."),
            requiredMsg: "* Please enter your Date of Birth.",
        },
        boyBirthTime: {
            value: '',
            isValid: true,
            pattern: '',
            errorMsg: t("* Please enter your Time of Birth."),
            requiredMsg: "* Please enter your Time of Birth.",
        },
        boyPlaceOfBirth: {
            value: '',
            isValid: true,
            pattern: /^[a-z]*/ig,
            errorMsg: "* Please enter correct Place of Birth.",
            requiredMsg: "* Please enter Place of Birth.",
        },
        boyLongitude: {
            value: '',
            isValid: true,
            pattern: /^[0-9]*/ig,
            errorMsg: "* Please enter correct longitude",
            requiredMsg: "* Please enter longitude.",
        },
        boyLatitude: {
            value: '',
            isValid: true,
            pattern: /^[0-9]*/ig,
            errorMsg: "* * Please enter your latitude.",
            requiredMsg: "* Please enter your latitude.",
        },
        girlName: {
            value: "",
            isValid: true,
            pattern: /^[a-zA-Z ]{2,30}$/ig,
            errorMsg: "* Name only accepts alphabets with the length greater than 1.",
            requiredMsg: "* Please enter your name.",
        },
        girlPhone: {
            value: '',
            isValid: true,
            pattern: /^[0-9]{10,13}$/ig,
            errorMsg: "* Mobile number should be of length 10 & starts with 6-9.",
            requiredMsg: "* Please enter your Mobile number.",
        },
        girlBirthDate: {
            value: '',
            isValid: true,
            pattern: '',
            errorMsg: "* Please enter your Date of Birth.",
            requiredMsg: "* Please enter your Date of Birth.",
        },
        girlBirthTime: {
            value: '',
            isValid: true,
            pattern: '',
            errorMsg: "* Please enter your Time of Birth.",
            requiredMsg: "* Please enter your Time of Birth.",
        },
        girlPlaceOfBirth: {
            value: '',
            isValid: true,
            pattern: /^[a-z]*/ig,
            errorMsg: "* Please enter correct placeOfBirth.",
            requiredMsg: "* Please enter placeOfBirth.",
        },
        girlLongitude: {
            value: '',
            isValid: true,
            pattern: /^[0-9]*/ig,
            errorMsg: "* Mobile number should be of length 10 & starts with 6-9.",
            requiredMsg: "* Please enter longitude.",
        },
        girlLatitude: {
            value: '',
            isValid: true,
            pattern: /^[0-9]*/ig,
            errorMsg: "* Mobile number should be of length 10 & starts with 6-9.",
            requiredMsg: "* Please enter your latitude.",
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
    const [selectedNav, setSelectedNav] = useState("New Matching")

    //Data State
    const [loading, setLoading] = useState(false);

    //Form State
    const [formData, setFormData] = useState(initialData)
    const [fetchedCity, setFetchedCity] = useState(['Varanasi', 'Allahabad'])
    const [boyPlaceOfBirth, setBoyPlaceOfBirth] = useState('')
    const [girlPlaceOfBirth, setGirlPlaceOfBirth] = useState('')

    const [boyTimeofbirth, setBoyTimeofbirth] = useState()
    const [boyDob, setBoyDob] = useState()
    const [girlTimeofbirth, setGirlTimeofbirth] = useState()
    const [girlDob, setGirlDob] = useState()

    const [bookmark, setBookmark] = useState(false)
    const [savedKundali, setSavedKundali] = useState([])


    const changeHandler = (event) => {

        const name = event.target.name
        const value = event.target.value
        const regex = new RegExp(initialData[name].pattern)
        const isvalid = (initialData[name].pattern === '') ? true : regex.test(value)

        setFormData(prevData => ({
            ...prevData,
            [name]: {
                ...prevData[name],
                isValid: isvalid,
                value: value
            }
        }))

    }

    const fetchCity = (e) => {
        if (e.target.name === 'girlPlaceOfBirth') {
            setGirlPlaceOfBirth(e.target.value)
        }
        else {
            setBoyPlaceOfBirth(e.target.value)
        }
        // console.log(e.target.name)
        const city = e.target.value
        clearTimeout(cityTimeout)

        if (!city) return setFetchedCity([])

        cityTimeout = setTimeout(() => {

            const headers = getCommonHeaders()

            let url = "geoDetails"

            const body = KundaliBody({
                place: city,
                maxRows: 7,
            }, url, [], 3)

            apis
                .getKundaliDetails(body, headers)
                .then((response) => response.data)
                .then((data) => {
                    if (!data.code) {
                        // console.log(data.geonames)
                        setFetchedCity(data.geonames)
                        changeHandler({ target: { name: e.target.name, value: e.target.value } })
                        if (e.target.name === 'girlPlaceOfBirth') {
                            data.geonames.filter(f => f.place_name.toLowerCase() === city.toLowerCase()).map(f => {
                                changeHandler({ target: { name: 'girlLatitude', value: f.latitude } })
                                changeHandler({ target: { name: 'girlLongitude', value: f.longitude } })
                            })
                        }
                        else {
                            data.geonames.filter(f => f.place_name.toLowerCase() === city.toLowerCase()).map(f => {
                                changeHandler({ target: { name: 'boyLatitude', value: f.latitude } })
                                changeHandler({ target: { name: 'boyLongitude', value: f.longitude } })
                            })
                        }
                    }
                })
                .catch((error) => {
                    //console.log(error)
                })
        }, 1000)
    }

    const checkForValid = () => {
        let isValid = true;
        console.log(formData)
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

                // console.log(key, formData[key])
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
        //   console.log("formData", formData)
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

                //   console.log(key, formData[key])
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


    const redirectToKundaliDetails = (data) => {
        props.history.push({
            pathname: FRONTEND_NAME + "/matchingdetails",
            state: { kundaliFormData: data },
        })
    }

    const fetchKundaliDataFromServer = () => {
        var headers = getCommonHeaders();
        const query = localStorage['selectedCountryCode'] + localStorage['msisdn'];

        apis
            .getHoroscopeInfo(headers, query)
            .then((response) => response.data)
            .then((data) => {
                // console.log(data)
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

    const redirectToEditForm = (data) => {

        // alert(JSON.stringify(data))
        // console.log(data.pob)

        setBoyDob(moment(new Date(data.dob)).format('YYYY-MM-DDThh:mm:ssZ'))
        setGirlDob(moment(new Date(data.dob1)).format('YYYY-MM-DDThh:mm:ssZ'))
        setBoyTimeofbirth(moment(new Date(data.birthTime1)).format('YYYY-MM-DDThh:mm:ssZ'))
        setGirlTimeofbirth(moment(new Date(data.birthTime2)).format('YYYY-MM-DDThh:mm:ssZ'))
        setBoyPlaceOfBirth(data.pob)
        setGirlPlaceOfBirth(data.pob1)

        const initialHoroscopeData = {
            boyName: {
                value: data.fullName,
                isValid: true,
                pattern: /^[a-zA-Z ]{2,30}$/ig,
                errorMsg: "* Name only accepts alphabets with the length greater than 1.",
                requiredMsg: "* Please enter your name.",
            },
            boyPhone: {
                value: data.phoneNumber,
                isValid: true,
                pattern: /^[6-9]{1}[0-9]{9}$/ig,
                errorMsg: "* Mobile number should be of length 10 & starts with 6-9.",
                requiredMsg: "* Please enter your Mobile number.",
            },
            boyBirthDate: {
                value: moment(new Date(data.dob)).format('YYYY-MM-DDThh:mm:ssZ'),
                isValid: true,
                pattern: '',
                errorMsg: "* Please enter your Date of Birth.",
                requiredMsg: "* Please enter your Date of Birth.",
            },
            boyBirthTime: {
                value: moment(new Date(data.birthTime1)).format('YYYY-MM-DDThh:mm:ssZ'),
                isValid: true,
                pattern: '',
                errorMsg: "* Please enter your Time of Birth.",
                requiredMsg: "* Please enter your Time of Birth.",
            },
            boyPlaceOfBirth: {
                value: data.pob,
                isValid: true,
                pattern: /^[a-z]*/ig,
                errorMsg: "* Please enter correct Place of Birth.",
                requiredMsg: "* Please enter Place of Birth.",
            },
            boyLongitude: {
                value: data.log,
                isValid: true,
                pattern: /^[0-9]*/ig,
                errorMsg: "* Please enter correct longitude",
                requiredMsg: "* Please enter longitude.",
            },
            boyLatitude: {
                value: data.lat,
                isValid: true,
                pattern: /^[0-9]*/ig,
                errorMsg: "* * Please enter your latitude.",
                requiredMsg: "* Please enter your latitude.",
            },
            girlName: {
                value: data.fullName1,
                isValid: true,
                pattern: /^[a-zA-Z ]{2,30}$/ig,
                errorMsg: "* Name only accepts alphabets with the length greater than 1.",
                requiredMsg: "* Please enter your name.",
            },
            girlPhone: {
                value: data.phoneNumber1,
                isValid: true,
                pattern: /^[6-9]{1}[0-9]{9}$/ig,
                errorMsg: "* Mobile number should be of length 10 & starts with 6-9.",
                requiredMsg: "* Please enter your Mobile number.",
            },
            girlBirthDate: {
                value: moment(new Date(data.dob1)).format('YYYY-MM-DDThh:mm:ssZ'),
                isValid: true,
                pattern: '',
                errorMsg: "* Please enter your Date of Birth.",
                requiredMsg: "* Please enter your Date of Birth.",
            },
            girlBirthTime: {
                value: moment(new Date(data.birthTime2)).format('YYYY-MM-DDThh:mm:ssZ'),
                isValid: true,
                pattern: '',
                errorMsg: "* Please enter your Time of Birth.",
                requiredMsg: "* Please enter your Time of Birth.",
            },
            girlPlaceOfBirth: {
                value: data.pob1,
                isValid: true,
                pattern: /^[a-z]*/ig,
                errorMsg: "* Please enter correct placeOfBirth.",
                requiredMsg: "* Please enter placeOfBirth.",
            },
            girlLongitude: {
                value: data.log1,
                isValid: true,
                pattern: /^[0-9]*/ig,
                errorMsg: "* Mobile number should be of length 10 & starts with 6-9.",
                requiredMsg: "* Please enter longitude.",
            },
            girlLatitude: {
                value: data.lat1,
                isValid: true,
                pattern: /^[0-9]*/ig,
                errorMsg: "* Mobile number should be of length 10 & starts with 6-9.",
                requiredMsg: "* Please enter your latitude.",
            },
            bookmark: {
                value: false,
                isValid: true,
                pattern: /^[a-z]*/ig,
                errorMsg: "* Mobile number should be of length 10 & starts with 6-9.",
                requiredMsg: "* Please enter your bookmark.",
            },
        }

        setFormData(initialHoroscopeData)

        // onChangeHandler({target: {name: 'latitude', value: data.lat}})
        // onChangeHandler({target: {name: 'longitude', value: data.log}})
        // onChangeHandler({target: {name: 'phone', value: data.phoneNumber}})
        // setPlaceOfBirth(data.pob)
        // handlePlaceOfBirth({target: {name: 'placeOfBirth', value: data.pob}})
        // onChangeHandler({target: {name: 'name', value: data.fullName}})

        setSelectedNav("New Matching")
    }

    const savingMatchingData = (event) => {
        event.preventDefault()

        if (checkForEmpty()) {
            setTimeout(() => {
                setLoading(false)
            }, 100);
            setState({
                ...state,
                showPopUp: true,
                msg: t('Some field empty')
            })
            // alert(t('Some field empty'))
            return;
        }

        if (!checkForValid()) {
            setTimeout(() => {
                setLoading(false)
            }, 100);
            setState({
                ...state,
                showPopUp: true,
                msg: t('Some field have invalid data')
            })
            // alert()
            return;
        }

        let requestBody = {
            maleName: formData['boyName'].value,
            malephone: formData['boyPhone'].value,
            malebirthDate: boyDob,
            malebirthTime: boyTimeofbirth,
            maleplaceOfBirth: formData['boyPlaceOfBirth'].value,
            malelongitude: formData['boyLongitude'].value,
            malelatitude: formData['boyLatitude'].value,
            maletzone: 5.5,
            femaleName: formData['girlName'].value,
            femalephone: formData['girlPhone'].value,
            femalebirthDate: girlDob,
            femalebirthTime: girlTimeofbirth,
            femaleplaceOfBirth: formData['girlPlaceOfBirth'].value,
            femalelongitude: formData['girlLongitude'].value,
            femalelatitude: formData['girlLatitude'].value,
            femaletzone: 5.5,

        }

        //redirectToKundaliDetails(requestBody)

        var headers = getCommonHeaders();
        const query = localStorage['msisdn'];

        // let requestBody = {
        //     name: formData['name'].value,
        //     phone: formData['phone'].value,
        //     gender: gender,
        //     birthDate: dob, 
        //     birthTime: timeofbirth,
        //     placeOfBirth: formData['placeOfBirth'].value,
        //     longitude: formData['longitude'].value,
        //     latitude: formData['latitude'].value,
        //     tzone: 5.5
        // }

        // console.log(moment(boyDob).format("yyyy-MM-DD"))
        // console.log(moment(boyDob).format("yyyy-mm-dd"))
        // console.log(moment(boyDob).format("yyyy-MM-DD"))

        if (bookmark) {
            let bodyKundali = {
                input: [
                    {
                        dob: moment(boyDob).format("yyyy-MM-DD"),
                        fullName: formData['boyName'].value,
                        //fullName1: formData['girlName'].value,
                        msisdn: localStorage['selectedCountryCode'] + localStorage['msisdn'],
                        phoneNumber: formData['boyPhone'].value,
                        //phoneNumber1: formData['girlPhone'].value,
                        pob: formData['boyPlaceOfBirth'].value,
                        //pob1: formData['girlPlaceOfBirth'].value,   
                        lat: formData['boyLatitude'].value,
                        log: formData['boyLongitude'].value,
                        birthTime: moment(boyTimeofbirth)
                        // lat1: formData['girlLatitude'].value,
                        // log2: formData['girlLongitude'].value,
                    },
                    {
                        dob: moment(girlDob).format("yyyy-MM-DD"),
                        fullName: formData['girlName'].value,
                        phoneNumber: formData['girlPhone'].value,
                        msisdn: localStorage['selectedCountryCode'] + localStorage['msisdn'],
                        pob: formData['girlPlaceOfBirth'].value,
                        lat: formData['girlLatitude'].value,
                        log: formData['girlLongitude'].value,
                        birthTime: moment(girlTimeofbirth)
                    }
                ],
                serviceType: "horoscope",
                "isBookmark": "true"
            }
            // alert(JSON.stringify(bodyKundali));
            apis
                .saveKundaliHoroscopeInfo(headers, bodyKundali)
                .then((response) => response.data)
                .then((data) => {
                    // alert(JSON.stringify(headers));
                    // alert(JSON.stringify(data))
                    if (data.code === 2000) {
                        redirectToKundaliDetails(requestBody)
                    }
                    else {
                        setState({
                            ...state,
                            showPopUp: true,
                            msg: t('Error while saving data')
                        })
                    }
                })
                .catch((error) => {
                    // console.log(error);
                    setState({
                        ...state,
                        showPopUp: true,
                        msg: t('Error while saving data')
                    })
                    // alert(t('Error while saving data'))
                });
        }
        else {
            redirectToKundaliDetails(requestBody)
        }
    }

    useEffect(() => {
        fetchKundaliDataFromServer()
    }, [])

    const IsMob_Side_Nave = (e) => {
        setState({
            ...state,
            mobSideNaveTrue: e

        })
    }

    const closePopUp = () => {
        setState({
            showPopUp: false,
        });
    };

    return (
        <>
            <Chat_Talk_Header
                IsNavIconTrue={false}
                IsSearchTrue={false}
                IsFilterTrue={false}
                // editSearchTerm={this.editSearchTerm}
                // editSortTerm={this.editSortTerm}
                IsMob_Side_Nave={IsMob_Side_Nave}
                propsData={props}
                IsTitleTrue={true}
                title={"Match Kundali"}
            />
            {state.showPopUp ? (
                <Popup
                    heading={state.heading}
                    msg={state.msg}
                    button={state.button}
                    closePopUp={closePopUp}
                />
            ) : null}

            <div className="desk_top">
                <BottomTab data={props} />
            </div>
            <Header2
                IsActive_header_Or_not="chat_and_talk_header-"
            />
            <div className='container'>
            {/* <BottomHeader /> */}
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
                            <div onClick={() => setSelectedNav("Open Matching")} className={selectedNav === "Open Matching" ? "kundali-nav kundali-nav-active" : "kundali-nav"} >
                                {t('Open Matching')}
                            </div>
                            <div onClick={() => setSelectedNav("New Matching")} className={selectedNav === "New Matching" ? "kundali-nav kundali-nav-active" : "kundali-nav"}>
                                {t('New Matching')}
                            </div>
                        </div>

                        {
                            selectedNav === 'New Matching' ?
                                <div className='row matching'>
                                    <div className='col-md-6 col-sm-12 matching-box'>
                                        <div className='matching-box-heading'>{t('Boy’s Details')}</div>
                                        <div className='matching-row-field'>
                                            <label class="form-label">{t('First_NAME')}<span style={{ color: "#C70404" }}>*</span></label>
                                            <InputBox
                                                fontSize="14px"
                                                value={formData["boyName"].value}
                                                name="boyName"
                                                labelText={"First name"}
                                                handleChange={changeHandler}
                                            // cssClass={firstName.isValid ? "form-control" : "form-control is-invalid"}
                                            />
                                        </div>
                                        <div className='matching-row-field'>
                                            <label class="form-label">{t('Phone number')}<span style={{ color: "#C70404" }}>*</span></label>
                                            <InputBox
                                                fontSize="14px"
                                                value={formData["boyPhone"].value}
                                                name="boyPhone"
                                                labelText={"Phone number"}
                                                handleChange={changeHandler}
                                            // cssClass={firstName.isValid ? "form-control" : "form-control is-invalid"}
                                            />
                                        </div>
                                        <div className='matching-row-field'>
                                            <label class="form-label">{t('Place of birth')}<span style={{ color: "#C70404" }}>*</span></label>
                                            <input list="places"
                                                className="form-control"
                                                name="boyPlaceOfBirth"
                                                id="placeOfBirth"
                                                value={boyPlaceOfBirth}
                                                fontSize="14px"
                                                onChange={fetchCity}
                                            />

                                            <datalist id="places" >
                                                {fetchedCity && fetchedCity.map(city => (
                                                    <option value={city.place_name}>{city.country_code}</option>
                                                ))}
                                            </datalist>
                                        </div>
                                        <div className='matching-row-field'>
                                            <label class="form-label">{t('Longitude')}<span style={{ color: "#C70404" }}>*</span></label>
                                            <InputBox
                                                fontSize="14px"
                                                value={formData["boyLongitude"].value}
                                                name="boyLongitude"
                                                labelText={"Longitude"}
                                                handleChange={changeHandler}
                                            // cssClass={firstName.isValid ? "form-control" : "form-control is-invalid"}
                                            />
                                        </div>
                                        <div className='matching-row-field'>
                                            <label class="form-label">{t('Latitude')}<span style={{ color: "#C70404" }}>*</span></label>
                                            <InputBox
                                                fontSize="14px"
                                                value={formData["boyLatitude"].value}
                                                name="boyLatitude"
                                                labelText={"Latitude"}
                                                handleChange={changeHandler}
                                            // cssClass={firstName.isValid ? "form-control" : "form-control is-invalid"}
                                            />
                                        </div>
                                        <div className='matching-row-field'>
                                            <label class="form-label">{t('Date of Birth')}<span style={{ color: "#C70404" }}>*</span></label>

                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <ThemeProvider theme={defaultMaterialTheme}>
                                                    <Grid container justify="space-around">
                                                        <KeyboardDatePicker
                                                            margin="normal"
                                                            id="date-picker-dialog"
                                                            name="boyBirthDate"
                                                            format="dd/MM/yyyy"
                                                            value={boyDob ? boyDob : null}
                                                            onChange={(dob) => {
                                                                setBoyDob(dob)
                                                                changeHandler({ target: { name: 'boyBirthDate', value: dob } })
                                                            }
                                                            }
                                                            maxDate={new Date()}
                                                            KeyboardButtonProps={{
                                                                "aria-label": "change date",
                                                            }}
                                                        />
                                                    </Grid>
                                                </ThemeProvider>
                                            </MuiPickersUtilsProvider>
                                        </div>
                                        <div className='matching-row-field'>
                                            <label class="form-label">{t('Time of birth')}<span style={{ color: "#C70404" }}>*</span></label>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <ThemeProvider theme={defaultMaterialTheme}>
                                                    <Grid container justify="space-around">
                                                        <KeyboardTimePicker
                                                            margin="normal"
                                                            id="time-picker"
                                                            name="boyBirthTime"
                                                            value={boyTimeofbirth ? boyTimeofbirth : null}
                                                            onChange={
                                                                (tob) => {
                                                                    setBoyTimeofbirth(tob)
                                                                    changeHandler({ target: { name: 'boyBirthTime', value: tob } })
                                                                }
                                                            }
                                                            //onChange={handleTimeChange}
                                                            KeyboardButtonProps={{
                                                                "aria-label": "change time",
                                                            }}
                                                        />
                                                    </Grid>
                                                </ThemeProvider>
                                            </MuiPickersUtilsProvider>
                                        </div>
                                    </div>

                                    <div className='col-md-6 col-sm-12 matching-box'>
                                        <div className='matching-box-heading'>{t('Girl’s Details')}</div>
                                        <div className='matching-row-field'>
                                            <label class="form-label">{t('First_NAME')}<span style={{ color: "#C70404" }}>*</span></label>
                                            <InputBox
                                                fontSize="14px"
                                                value={formData["girlName"].value}
                                                name="girlName"
                                                labelText={"First name"}
                                                handleChange={changeHandler}
                                            // cssClass={firstName.isValid ? "form-control" : "form-control is-invalid"}
                                            />
                                        </div>
                                        <div className='matching-row-field'>
                                            <label class="form-label">{t('Phone number')}<span style={{ color: "#C70404" }}>*</span></label>
                                            <InputBox
                                                fontSize="14px"
                                                value={formData["girlPhone"].value}
                                                name="girlPhone"
                                                labelText={"Phone number"}
                                                handleChange={changeHandler}
                                            // cssClass={firstName.isValid ? "form-control" : "form-control is-invalid"}
                                            />
                                        </div>
                                        <div className='matching-row-field'>
                                            <label class="form-label">{t('Place of birth')}<span style={{ color: "#C70404" }}>*</span></label>
                                            <input list="places"
                                                className="form-control"
                                                name="girlPlaceOfBirth"
                                                id="placeOfBirth"
                                                value={girlPlaceOfBirth}
                                                fontSize="14px"
                                                onChange={fetchCity}
                                            />

                                            <datalist id="places" >
                                                {fetchedCity && fetchedCity.map(city => (
                                                    <option value={city.place_name}>{city.country_code}</option>
                                                ))}
                                            </datalist>
                                        </div>
                                        <div className='matching-row-field'>
                                            <label class="form-label">{t('Longitude')}<span style={{ color: "#C70404" }}>*</span></label>
                                            <InputBox
                                                fontSize="14px"
                                                value={formData["girlLongitude"].value}
                                                name="girlLongitude"
                                                labelText={"Longitude"}
                                                handleChange={changeHandler}
                                            // cssClass={firstName.isValid ? "form-control" : "form-control is-invalid"}
                                            />
                                        </div>
                                        <div className='matching-row-field'>
                                            <label class="form-label">{t('Latitude')}<span style={{ color: "#C70404" }}>*</span></label>
                                            <InputBox
                                                fontSize="14px"
                                                value={formData["girlLatitude"].value}
                                                name="girlLatitude"
                                                labelText={"Latitude"}
                                                handleChange={changeHandler}
                                            // cssClass={firstName.isValid ? "form-control" : "form-control is-invalid"}
                                            />
                                        </div>
                                        <div className='matching-row-field'>
                                            <label class="form-label">{t('Date of Birth')}<span style={{ color: "#C70404" }}>*</span></label>

                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <ThemeProvider theme={defaultMaterialTheme}>
                                                    <Grid container justify="space-around">
                                                        <KeyboardDatePicker
                                                            margin="normal"
                                                            id="date-picker-dialog"
                                                            name="girlBirthDate"
                                                            format="dd/MM/yyyy"
                                                            value={girlDob ? girlDob : null}
                                                            onChange={(dob) => {
                                                                setGirlDob(dob)
                                                                changeHandler({ target: { name: 'girlBirthDate', value: dob } })
                                                            }
                                                            }
                                                            maxDate={new Date()}
                                                            KeyboardButtonProps={{
                                                                "aria-label": "change date",
                                                            }}
                                                        />
                                                    </Grid>
                                                </ThemeProvider>
                                            </MuiPickersUtilsProvider>
                                        </div>
                                        <div className='matching-row-field'>
                                            <label class="form-label">{t('Time of birth')}<span style={{ color: "#C70404" }}>*</span></label>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <ThemeProvider theme={defaultMaterialTheme}>
                                                    <Grid container justify="space-around">
                                                        <KeyboardTimePicker
                                                            margin="normal"
                                                            id="time-picker"
                                                            name="girlBirthTime"
                                                            value={girlTimeofbirth ? girlTimeofbirth : null}
                                                            //onChange={handleTimeChange}
                                                            onChange={(tob) => {
                                                                setGirlTimeofbirth(tob)
                                                                changeHandler({ target: { name: 'girlBirthTime', value: tob } })
                                                            }
                                                            }
                                                            KeyboardButtonProps={{
                                                                "aria-label": "change time",
                                                            }}
                                                        />
                                                    </Grid>
                                                </ThemeProvider>
                                            </MuiPickersUtilsProvider>
                                        </div>
                                    </div>

                                    <div className="row matching-align-center" style={{ color: "#222222" }}>
                                        <div class="form-check">
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
                                    <div className="row matching-align-center  ">
                                        <Button
                                            type="submit"
                                            className="btn"
                                            onSubmit={savingMatchingData}
                                            valid={false}
                                            buttonText={t('Match Horoscope')}
                                            wait={true}
                                            loading={loading}
                                        />
                                    </div>
                                </div> :

                                <>
                                    <div className="row mt-3" style={{ marginLeft: '-10px', marginRight: '-10px' }}>
                                        {savedKundali && savedKundali.map(
                                            (data) => (
                                                <div className='conclusion-box' style={{ cursor: 'pointer' }} onClick={() => redirectToEditForm(data)} >
                                                    <div className='conclusion-content-space'>
                                                        <div className='male'>
                                                            <div className='circle-form first'>
                                                                {data.fullName.substr(0, 2).toUpperCase()}
                                                            </div>
                                                            <div>{data.fullName}</div>
                                                        </div>
                                                        <div className='female'>
                                                            <div className='circle-form second'>
                                                                {data.fullName1.substr(0, 2).toUpperCase()}
                                                            </div>
                                                            <div>{data.fullName1}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                        {
                                            (savedKundali && savedKundali.length === 0) &&
                                            <>
                                                <div className="col-md-3"></div>
                                                <div className="col-md-4 mt-3 mb-3">
                                                    <span style={{ textAlign: 'center' }}>{t('No bookmarked data found') + "!!"}</span>
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

export default MatchingForm;