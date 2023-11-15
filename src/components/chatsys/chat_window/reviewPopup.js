import React, { useState } from 'react';
import StarRatingComponent from "react-star-rating-component";
import apiUrls from "../../../configuration/apiUrls";
import apis from "../../../configuration/apis";
import { FRONTEND_NAME } from "../../../configuration/constants";
import Popup from "../../popupChat";
import $ from 'jquery'
import secureLocalStorage from "react-secure-storage";

const ReviewPopup = ({ title, props, userMsisdn, reviewName }) => {
    const { t } = props;
    const [rating, setrating] = useState("")
    const [review, setreview] = useState("")
    const [showPopUp, setshowPopUp] = useState(false);
    const [msg, setmsg] = useState("")
    const [isSuccess, setisSuccess] = useState(false)
    const [okBtn, setOkBtn] = useState(false);
    var ddd = localStorage["chatFrom"] !== undefined ? JSON.parse(localStorage["chatFrom"]) : '';
    const onStarClick = (nextValue, prevValue, name) => {
        // this.setState({ rating: nextValue });
        setrating(nextValue);
    };
    const showPopUpFun = (msg, isSuccess) => {
        setmsg(msg);
        setisSuccess(isSuccess);
        setshowPopUp(true);
    }
    const updateReview = (evt) => {

        setreview(evt.target.value);
    };

    const closePopUpFun = () => {
        // alert(Routemsg)
        setshowPopUp(false);
    };

    const onClickHandle = () => {
        props.history.push({
            pathname: FRONTEND_NAME + "/chatList",
            state: { typeOfService: "Chat" },
        });
        setTimeout(() => {
            window.location.reload();
        }, 500)
    }

    const CloseReviewPopup = () => {
        $('#Reviewpopup').modal('hide')
        props.history.push({
            pathname: FRONTEND_NAME + "/chatList",
            state: { typeOfService: "Chat" },
        });
        secureLocalStorage.removeItem('chatKey')
        secureLocalStorage.removeItem('data')
        secureLocalStorage.removeItem('chatFrom');
        secureLocalStorage.removeItem('route');
        secureLocalStorage.removeItem('startTime');
    }

    const reviewSubmit = () => {
        let url = apiUrls.submitChatReview;
        if (!rating) {
            showPopUpFun(t("Please enter the required fields"), false);
            return;
        }
        let body = {
            productId: userMsisdn,
            rating: rating,
            review: review,
            reviewerName: reviewName,
            chatTxnId: localStorage['chatId']
        };
        return apis.submitChatReview(url, body).then((response) => {
            var data = response.data;

            if (data.code == 2000) {
                setOkBtn(true)
                showPopUpFun(t("Your review has been submited successfully."), true);
                if (secureLocalStorage.getItem("chatFrom") !== null) {
                    if (ddd[0].orderDetail.subsidizedCampaignId !== undefined) {
                        props.history.push({
                            pathname: FRONTEND_NAME + "/recharge",
                            state: { typeOfService: "Chat" },
                        });
                    }
                }
                secureLocalStorage.removeItem('chatKey')
                secureLocalStorage.removeItem('data')
                secureLocalStorage.removeItem('chatFrom');
                secureLocalStorage.removeItem('route');
                secureLocalStorage.removeItem('startTime');
            } else {
                console.log("ERROR", data.msg);
            }
        });
    };
    return (
        <>
            {showPopUp && (
                <Popup
                    msg={msg}
                    isSuccess={isSuccess}
                    closePopUp={closePopUpFun}
                    onClickHandle={onClickHandle}
                    chatEnded={''}
                    alert_panditMsg={""}
                    Isokbutton={okBtn}
                />
            )}
            <div class="modal fade" id="Reviewpopup" data-bs-backdrop='static' data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content Reviewpopup">
                        <div class="modal-header text-left hr">
                            <h5 class="modal-title">{title}</h5>
                            <span type="button" class="bi bi-x-circle-fill" onClick={CloseReviewPopup} data-bs-dismiss="modal" aria-label="Close"> </span>
                        </div>
                        <div class="modal-body text-left">
                            <div className="feedback-div" id="reviwform">
                                <div className=''>
                                    <StarRatingComponent
                                        name="rate"
                                        value={rating}
                                        starCount="5"
                                        className="star-rating"
                                        starColor="#FF9C05"
                                        emptyStarColor="#828282"
                                        onStarClick={onStarClick}
                                    />
                                </div>

                                <div className=''>
                                    <textarea
                                        placeholder={t("Write your review here….")}
                                        maxLength="160"
                                        value={review}
                                        onChange={updateReview}
                                        className='form-control'
                                    ></textarea>
                                    <p className="f-length mt-2">
                                        {review.length > 0
                                            ? review.length
                                            : 0}
                                        /160
                                    </p>
                                </div>
                                <button className='btn header-login-btn text-white' onClick={reviewSubmit}>{t('Submit')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewPopup;