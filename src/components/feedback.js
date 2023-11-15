import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import { getCommonHeaders1 } from "../configuration/commonFunctions";
import { postApi } from "../configuration/apis";
import Popup from "../components/popupChat";
import Header from '../common/prodlandingHeader';
import StarRatingComponent from "react-star-rating-component";
import apiUrls from '../configuration/apiUrls';
import { useParams } from 'react-router-dom';

export default function Feedback(props) {
    const param = useParams();
    const [inputData, setInputData] = useState({
        name: '',
        rating: '',
        feedback: '',
        button: 'ok',
    });
    const { name, rating, feedback, } = inputData;

    const [Msg, setMsg] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    console.log(param);
    const [t] = useTranslation();

    const onChange = (e) => {
        const { name, value } = e.target;

        if (name === 'number') {
            if (value.length === 11) {
                return false;
            } else {
                setInputData({
                    ...inputData,
                    [name]: value
                })
            }
        } else {
            setInputData({
                ...inputData,
                [name]: value
            })
        }


    };

    const onStarClick = (nextValue, prevValue, name) => {
        // this.setState({ rating: nextValue });
        setInputData({ ...inputData, rating: nextValue });

    };
    const closePopUp = () => {
        setShowPopup(false)
    };

    const showPopUp1 = (msg, modalTrue, isSuccess, error) => {
        setShowPopup(modalTrue);
        setMsg(msg)
        setSuccess(isSuccess)
        setError(error);

    }

    const submitSupportForm = (e) => {
        e.preventDefault();
        const { name, feedback, rating } = inputData;
        var url = apiUrls.updateUserFeedback
        let header = getCommonHeaders1();
        const body = {
            feedbackmsg: feedback,
            rating: rating,
            username: name,
            txid: param.txid
        }
        if (rating !== '') {
            console.log(body);
            postApi(url, header, body)
                .then(respons => respons.data)
                .then(res => {
                    console.log(res);
                    setInputData({
                        rating: '',
                        name: '',
                        feedback: ''
                    })
                    showPopUp1('Thank you for your time and feedback. We truly value your input and look forward to serving you again in the future.', true, true)
                })
                .catch(err => {
                    showPopUp1(err, true,)
                })
        } else {
            // setError('error')
            showPopUp1("Rating can't be empty.", true, false, 'error');
        }

    }


    return (
        <>
            <Header url={'/feedback/' + param.txid} />
            {showPopup && (
                <Popup
                    heading={''}
                    msg={Msg}
                    button={inputData.button}
                    isSuccess={success}
                    closePopUp={closePopUp}
                    Isicon={true}
                    IsiconType={error}
                // alert_panditMsg={IspanditBusy ? "pandit busy" : ''}
                />
            )}
            <div className="feedback_container d-flex align-items-center justify-content-center mt-5">
                <div className="feedback_form">
                    <div className="feed_header">
                        <p> <strong> Your feedback </strong></p>
                        <p className="text-justify">Thank you for choosing astroking for your astrology needs. We hope that our services have been able to provide you with valuable insights and guidance. We would appreciate your feedback on the service you received so that we can continue improving and providing our clients the best possible service.</p>
                        <p> <strong>how satisfied you're with our services</strong></p>
                    </div>
                    <form onSubmit={submitSupportForm}>
                        <div className="form-group d-flex align-items-center">
                            <label for="Name" className="col-form-label" style={{ color: '#999' }}>Rating* : </label> &nbsp;&nbsp;&nbsp;&nbsp;
                            <StarRatingComponent
                                name="rate"
                                value={rating}
                                starCount="5"
                                className="star-rating"
                                starColor="#FF9C05"
                                emptyStarColor="#828282"
                                onStarClick={onStarClick.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            {/* <label for="Name" className="col-form-label">Name*</label> */}
                            <input type="text" className="form-control" id="Name" placeholder={t('Name*')} name="name" value={name} onChange={onChange} required />
                        </div>
                        {/* <div className="form-group row"> */}
                        {/* <label for="Mobile" className="col-form-label">Mobile Number*</label> */}
                        {/* <input type="number" className="form-control"
                                id="Mobile" name="number"
                                value={number} minLength="10"
                                maxLength="10" required="true"
                                size="10" onChange={onChange}
                                placeholder={t('Mobile_Number') + "*"}
                                pattern="/^-?\d+\.?\d*$/"
                            /> */}



                        {/* </div> */}
                        {/* <div className="form-group row">
                            {/* <label for="Email" className="col-form-label">Email ID</label> 
                            <input type="email" className="form-control" id="Email" placeholder={t('Email_Id') + "*"} name="email" value={email} onChange={onChange} required />
                        </div> */}
                        <div className="form-group">
                            {/* <label for="Concern" className="col-form-label">Concern*</label> */}
                            {/* <input type="text" /> */}
                            <textarea className="form-control" id="Concern" placeholder={t('feedback') + "*"} style={{ height: '100px' }} name="feedback" value={feedback} onChange={onChange} required />
                        </div>
                        <div className="form-group mt-5">
                            {/* <label for="Concern" className="col col-form-label"></label> */}
                            <button type="submit" className="btnSubmit">{t('Submit')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
