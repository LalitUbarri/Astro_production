import React, { useEffect, useState } from 'react'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import apis, { postApi } from "../configuration/apis";
import urls from "../configuration/apiUrls";
import { getCommonHeaders1 } from '../configuration/commonFunctions'
import axios from 'axios';
import slw from 'sweetalert';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import format from 'date-fns/format';


const defaultMaterialTheme = createMuiTheme({
    palette: {
        primary: orange,
    },
});
export default function GetkundaliForm() {
    const [state, setState] = useState({
        topics: [],
        languages: [],
        userMsisdn: '',
        fname: '',
        lname: '',
        gender: '',
        dob: "",
        placeofbirth: '',
        timeofbirth: '',
        timeVal: '',
        maritalstatus: '',
        occupation: '',
        State: '',
        country: '',
        answer: 'Hindi',
        pincode: '',
        countryCode: '91',
        email: '',
        error: false,
        buttonTrue: false

    })

    const {
        fname,
        lname,
        gender,
        dob,
        country,
        State,
        placeofbirth,
        timeofbirth,
        maritalstatus,
        occupation,
        answer,
        pincode,
        email,
        error,
        buttonTrue
    } = state;


    useEffect(() => {
        getTopicofconcerns(["topic", "language"]).then((keyValueArray) => {
            let topics = keyValueArray?.filter((item) => item.key == "topic");
            let languages = keyValueArray?.filter((item) => item.key == "language");
            setState({
                topics: topics,
                languages: languages,
            });
        });
    }, [])

    const getTopicofconcerns = (keyArray) => {
        if (!keyArray) return;
        var requestBody = {
            key: keyArray,
        };
        return apis.getKeysValue(requestBody).then((response) => {
            var data = response.data;
            if (data.code == "2000") {
                let keysValueResponse = data.data;
                return keysValueResponse;
            } else {
                return;
            }
        });
    };




    const handleChange = (event) => {
        let name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const handleDateChange = (dob) => {
        setState({
            ...state,
            dob: dob,
        });
    };

    const handleTimeChange = (e) => {
        console.log(e);
        setState({
            ...state,
            timeofbirth: e,
            timeVal: e
        });
    };

    const submitChatIntake = (e) => {
        e.preventDefault();
        setState({
            ...state,
            buttonTrue: true
        })
        var date = format(new Date(state.dob), 'yyyy-MM-dd')
        var time = format(new Date(state.timeofbirth), 'HH:mm a')
        console.log(date);
        if (gender !== '' &&
            gender !== undefined &&
            maritalstatus !== "" &&
            maritalstatus !== undefined
        ) {
            var url = urls.kundaliOffer;
            const header = getCommonHeaders1();

            const requestBody = {
                firstname: state.fname,
                lastname: state.lname,
                msisdn: state.userMsisdn,
                gender: state.gender,
                dob: date,
                tob: time,
                pob: state.placeofbirth,
                concern: state.topicofconcern,
                maritial: state.maritalstatus,
                occupation: state.occupation,
                kundalilang: answer === undefined ? 'Hindi' : answer,
                pincode: pincode,
                country: country,
                state: State,
                email: email
            }
            axios.post(url, requestBody, header)
                .then(response => response.data)
                .then(res => {
                    console.log(res.data[0].responseMessage);
                    slw(res.data[0].responseMessage);
                    resetForm();
                    setState({
                        ...state,
                        userMsisdn: '91',
                        fname: '',
                        lname: '',
                        gender: '',
                        dob: "",
                        placeofbirth: '',
                        timeofbirth: '',
                        maritalstatus: '',
                        occupation: '',
                        topicofconcern: '',
                        answer: 'Hindi',
                        comments: '',
                        countryCode: '',
                        email: '',
                        error: false
                    })

                }).catch(err => {
                    console.log(err);
                })
        } else {
            slw('Please fill all mandatory fields*');
            setState({
                ...state,
                error: true
            })
        }


    }

    const resetForm = () => {
        document.getElementById("getkundali").reset();
    }


    const fetchStateOnPincodeChange = (e) => {
        const headers = getCommonHeaders1();
        var url = urls.getLocationDataKundali;
        url = url.replace('<pincode>', e.target.value);
        postApi(url, headers)
            .then((response) => response.data)
            .then((data) => {
                // debugger
                if (data.code === 2000 && data.data.length > 0 && data.data[0].PostOffice && data.data[0].PostOffice.length > 0) {
                    console.log(data.data);
                    setState({
                        ...state,
                        country: data.data[0].PostOffice[0].Country,
                        State: data.data[0].PostOffice[0].State

                    })

                }
            });

    };

    console.log(state.buttonTrue);

    return (
        <>
        

            
                    <form onSubmit={submitChatIntake} id="getkundali" className="d-flex justify-content-between flex-wrap">
                        <div className="getkundali_card">
                            <div className="form-group">
                                <label for="exampleFormControlInput1">{'First Name'}*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstname"
                                    name="fname"
                                    value={fname}
                                    placeholder={'First Name'}
                                    onChange={(e) => setState({
                                        ...state,
                                        fname: e.target.value
                                    })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="getkundali_card">
                            <div className="form-group">
                                <label for="exampleFormControlInput1">{'Last Name'}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    // id="lastname"
                                    name="lname"
                                    value={lname}
                                    onChange={handleChange}
                                    placeholder={'Last Name'}
                                    required
                                />
                            </div>
                        </div>
                        <div className="getkundali_card">
                            <div className="form-group">
                                <label for="exampleFormControlInput1">
                                    {'Mobile Number'}*
                                </label>

                                <PhoneInput
                                    className={error ? 'phone_con error' : 'phone_con'}
                                    countryCodeEditable={true}
                                    country={'in'}
                                    copyNumbersOnly={true}
                                    disableDropdown={true}
                                    disableCountryCode={true}
                                    autocompleteSearch={true}
                                    onlyCountries={['in', 'us']}
                                    inputProps={{
                                        required: true,
                                        autoFocus: false,

                                    }}
                                    isValid={(value, country) => {
                                        if (value.match(/12345/)) {
                                            return 'Invalid value: ' + value + ', ' + country.name;
                                        } else if (value.match(/1234/)) {
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    }}

                                    onChange={phone => {
                                        if (phone.length > 10 || phone.length < 10) {
                                            setState({
                                                ...state,
                                                userMsisdn: phone,
                                                error: true
                                            })
                                        } else {
                                            setState({
                                                ...state,
                                                userMsisdn: phone,
                                                error: false
                                            })

                                        }
                                    }}
                                />
                                {error ? <spna className="text-danger mt-2 d-block fs-12"> Mobile number is mandatory*</spna> : null}

                            </div>
                        </div>
                        <div className="getkundali_card">
                            <div className="form-group">
                                <label for="exampleFormControlInput1">{'Email'}*</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="anycomments"
                                    name="email"
                                    placeholder="email"
                                    value={email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="getkundali_card">
                            <div className="form-group">
                                <label for="exampleFormControlInput1">
                                    {'Date of Birth*'}
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
                                                    placeholder="date of birth"
                                                    maxDate={new Date()}
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        "aria-label": "change date",
                                                    }}
                                                    required
                                                />
                                            </Grid>
                                        </ThemeProvider>
                                    </MuiPickersUtilsProvider>
                                </span>
                            </div>
                        </div>
                        <div className="getkundali_card">
                            <div className="form-group">
                                <label for="exampleFormControlInput1">
                                    {'Time of Birth'}*
                                </label>
                                {/* <input type="text" className="form-control" id="timeofbirth" name="timeofbirth" value={timeofbirth} placeholder="DD/MM/YY" /> */}
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <ThemeProvider theme={defaultMaterialTheme}>
                                        <Grid container justify="space-around">
                                            <KeyboardTimePicker
                                                margin="normal"
                                                autoComplete={false}
                                                id="time-picker"
                                                format="hh:mm a"
                                                placeholder="time of birth"
                                                value={timeofbirth ? timeofbirth : null}
                                                onChange={handleTimeChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'Select time',
                                                }}
                                                required
                                            />
                                        </Grid>
                                    </ThemeProvider>
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                        <div className="getkundali_card">
                            <div className="form-group">
                                <label for="exampleFormControlInput1">
                                    {'Place of Birth*'}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="placeofbirth"
                                    name="placeofbirth"
                                    value={placeofbirth}
                                    placeholder={'Place of Birth*'}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="getkundali_card">
                            <div className="form-group">
                                <label for="exampleFormControlInput1">{'Pin code'}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="anycomments"
                                    name="pincode"
                                    value={pincode}
                                    placeholder="Pin code"
                                    onChange={(e) => {
                                        setState({
                                            ...state,
                                            pincode: e.target.value
                                        })
                                    }}
                                    onBlur={fetchStateOnPincodeChange}
                                />
                            </div>
                        </div>

                        <div className="getkundali_card">
                            <div className="form-group">
                                <label for="exampleFormControlInput1">
                                    {' State *'}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="placeofbirth"
                                    name="State"
                                    value={State}
                                    placeholder={'state*'}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <div className="getkundali_card">
                            <div className="form-group">
                                <label for="exampleFormControlInput1">
                                    {' Country *'}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="placeofbirth"
                                    name="country"
                                    value={country}
                                    placeholder={'Country*'}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="getkundali_card">
                            <div className="form-group">
                                <label for="exampleFormControlSelect1">
                                    {'Marital status'}*
                                </label>
                                <select
                                    className="form-control"
                                    id="maritalstatus"
                                    name="maritalstatus"
                                    value={maritalstatus}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">{'Choose marital status'}</option>
                                    <option value="Single">{'Single'}</option>
                                    <option value="Married">{'Married'}</option>
                                    <option value="Divorced">{'Divorced'}</option>
                                    <option value="Separated">{'Separated'}</option>
                                    <option value="Widowed">{'Widowed'}</option>
                                </select>
                            </div>
                        </div>
                        <div className="getkundali_card">
                            <div className="form-group">
                                <label for="exampleFormControlSelect1">{'Gender*'}</label>
                                <select
                                    className="form-control"
                                    id="gender"
                                    name="gender"
                                    value={gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">{'Choose gender '}</option>
                                    <option value="Male">{'Male'}</option>
                                    <option value="Female">{'Female'}</option>
                                </select>
                            </div>
                        </div>

                        <div className="getkundali_card">
                            <div className="form-group">
                                <label for="exampleFormControlSelect1">
                                    {'I want answer in'}
                                </label>
                                <select
                                    className="form-control"
                                    id="answer"
                                    name="answer"
                                    value={answer}
                                    onChange={(e) => setState({
                                        ...state,
                                        answer: e.target.value
                                    })
                                    }
                                    required
                                >
                                    <option value={'Hindi'}>{'Hindi'}</option>
                                    <option value={'English'}>{'English'}</option>
                                    <option value={'Gujarati'}>{'Gujarati'}</option>
                                    <option value={'Marathi'}>{'Marathi'}</option>
                                    <option value={'Bengali'}>{'Bengali'}</option>
                                    <option value={'Kannada'}>{'Kannada'}</option>
                                    <option value={'Telugu'}>{'Telugu'}</option>
                                    <option value={'Tamil'}>{'Tamil'}</option>
                                    {/* {languages &&
                                        languages.length > 0 &&
                                        languages.map((item) => (
                                            <option value={item.value}>{item.value}</option>
                                        ))} */}
                                </select>
                            </div>
                        </div>
                        <div className="btn_container_submit">
                            <button
                                disabled={buttonTrue}
                                type="submit"
                                style={{
                                    width: "262px",
                                    height: "44px",
                                    backgroundColor: "#FF9C05",
                                    color: "#ffffff",
                                    borderRadius: "22px",
                                }}
                                className="btn mb-4"
                            >
                                {'Submit'}
                            </button>
                        </div>

                    </form>
        </>
    )
}