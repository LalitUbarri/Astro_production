import React, { useEffect, useState } from 'react'
import Prodductlandingheader from '../common/prodlandingHeader'
import Footer from '../common/Footer';
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
import { FRONTEND_NAME } from '../configuration/constants'
// import * as constent from '../configuration/constants'
// import slw from 'sweetalert';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import format from 'date-fns/format';
import { useLocation } from 'react-router-dom';


const defaultMaterialTheme = createMuiTheme({
    palette: {
        primary: orange,
    },
});
export default function Productlanding(props) {
    const location = useLocation();
    const [state, setState] = useState({
        topics: [],
        languages: [],
        userMsisdn: location.state.msisdn,
        fname: '',
        lname: '',
        gender: '',
        dob: "",
        placeofbirth: '',
        timeofbirth: '',
        maritalstatus: '',
        occupation: '',
        State: '',
        country: '',
        answer: 'Hindi',
        pincode: '',
        countryCode: '91',
        email: '',
        error: false,

    })

    const {
        userMsisdn,
        fname,
        lname,
        gender,
        languages,
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
        error
    } = state;


    useEffect(() => {
        getTopicofconcerns(["topic", "language"]).then((keyValueArray) => {
            let topics = keyValueArray?.filter((item) => item.key == "topic");
            let languages = keyValueArray?.filter((item) => item.key == "language");
            // console.log("key value data", topics);
            setState({
                ...state,
                topics: topics,
                // topicofconcern: topics ? topics[0].value : "",
                languages: languages,
                // answer: languages ? languages[0].value : ""
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
            // console.log(data);
            if (data.code == "2000") {
                let keysValueResponse = data.data;
                // console.log("response getKeysValue ", keysValueResponse);
                return keysValueResponse;
            } else {
                // console.log("ERROR", data.msg);
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

    const handleTimeChange = (timeofbirth) => {
        setState({
            ...state,
            timeofbirth: timeofbirth,
        });
    };

    const submitChatIntake = (e) => {
        e.preventDefault();
        var date = format(new Date(state.dob), 'yyyy-MM-dd')
        var time = format(new Date(state.timeofbirth), 'HH:mm a')
        setState({
            ...state,
            error: false
        })
        var url = urls.NewuserOfferInfo;
        const header = getCommonHeaders1();

        const requestBody = {
            firstname: fname,
            lastname: lname,
            msisdn: location.state.msisdn,
            gender: gender,
            dob: date,
            tob: time,
            pob: placeofbirth,
            maritial: maritalstatus,
            occupation: occupation,
            kundalilang: answer,
            email: email,
            country: country,
            pincode: pincode,
            state: State,
            productId: location.state.product[0].goods_id
        }

        postApi(url, header, requestBody)
            .then(response => response.data)
            .then(res => {
                // console.log(res.data);
                props.history.push(FRONTEND_NAME + '/paymentinfo', { state: res.data, product: location.state.product });
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
        // } else {
        //     alert('Please fill all mandatory fields*')
        // setState({
        //     ...state,
        //     error: true
        //     // })
        // }


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

    console.log(location.state.product[0].goods_id);
    return (
        <>
            <Prodductlandingheader />
            <div className="getlink_container-fluid">
                <div className="getlink_container mt-5">
                    <div className="col form-body">
                        <form onSubmit={submitChatIntake} id="getkundali">
                            <div className="row">
                                <div className="col">
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
                                    <div className="form-group">
                                        <label for="exampleFormControlInput1">
                                            {'Mobile Number'}*
                                        </label>

                                        <PhoneInput
                                            className={error ? 'phone_con error' : 'phone_con'}
                                            countryCodeEditable={true}
                                            country={'in'}
                                            copyNumbersOnly={true}
                                            autocompleteSearch={true}
                                            onlyCountries={['in', 'us']}
                                            disabled
                                            inputProps={{
                                                required: true,
                                                autoFocus: false,
                                                value: userMsisdn,
                                                describe: true
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
                                                if (phone.length > 12 || phone.length < 12) {
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
                                        {/* <div className="d-flex">
                                            <select>
                                                <option value="91"> +91 </option>
                                            </select>
                                            <input
                                                type="number"
                                                name={'msisdn'}
                                                value={userMsisdn}
                                                className="form-control"
                                                id="phonenumber"
                                                placeholder={'Mobile Number'}
                                                maxLength={10}
                                                size="10"
                                                onChange={(event) => {
                                                    if (event.target.name === 'msisdn') {
                                                        if (event.target.value.length === 10) {
                                                            setState({
                                                                ...state,
                                                                userMsisdn: event.target.value
                                                            })
                                                        } else return;
                                                    }
                                                }}
                                                required
                                            />

                                        </div> */}


                                    </div>
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
                                    {/* <div className="form-group">
                                        <label for="exampleFormControlSelect1">{'Occupation'}</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="occupation"
                                            name="occupation"
                                            value={occupation}
                                            placeholder="occupation"
                                            onChange={handleChange}
                                        />
                                    </div> */}
                                    {/* <div className="form-group">
                                        <label for="exampleFormControlSelect1">
                                            {'Topic of Concern*'}
                                        </label>
                                        <select
                                            className="form-control"
                                            id="topicofconcern"
                                            name="topicofconcern"
                                            value={topicofconcern}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value=''>{'Choose topic of concern'}</option>
                                            {topics &&
                                                topics.length > 0 &&
                                                topics.map((item) => (

                                                    <option value={item.value}>{item.value}</option>
                                                ))}
                                        </select>
                                    </div> */}

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
                                            {languages &&
                                                languages.length > 0 &&
                                                languages.map((item) => (
                                                    <option value={item.value}>{item.value}</option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
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
                            </div>
                            {/* <div className="row">
                                <div className="col">
                                    
                                </div>
                            </div> */}
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
                                    >
                                        {'Submit'}
                                    </button>

                                    {/* <p onClick={resetForm}>reset form </p> */}
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
