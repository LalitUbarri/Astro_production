import React from 'react'
import Header2 from '../common/Header2';
import { useHistory, useLocation } from 'react-router-dom';
import { FRONTEND_NAME } from '../configuration/constants';
import WalletSuccess from '../images/newImg/wallet_success.png';
import PaymentSuccess from '../images/newImages/4631f6529.png'


export default function ThankYou_page() {
    const navigate = useHistory();
    const location = useLocation();

    const sign = location.state === undefined ? "INR" : location.state.state.currency === "INR" ? '₹' : '$'
    // console.log(location.state.state.currency);

    return (
        <>
            <Header2 />
            <div className="payment_success_container d-flex justify-content-center">
                <div className="payment_success_inner_container mt-5">
                    <div className="payment_success_image mt-5">
                        <img src={location.state === undefined ? PaymentSuccess : WalletSuccess} alt="Payment success" width="100%" />
                    </div>
                    <div className="payment_success_content mt-5">
                        {location.state === undefined ? <h5> Your Order has been placed !! Thank You</h5> : <h5> Thanks for recharging your wallet with {sign} {location.state.state.amount}</h5>}
                        <button className="btn backbtn" onClick={() => navigate.push(FRONTEND_NAME + '/home')}> Back to Home </button>
                    </div>
                </div>
            </div>
        </>
    )
}
