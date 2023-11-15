import React from 'react'
import Payment_faild from '../images/newImg/Computer troubleshooting-pana.svg'
import Header2 from '../common/Header2';
import { useHistory } from 'react-router-dom';
import { FRONTEND_NAME } from '../configuration/constants';


export default function Payment_faild1() {
    const navigate = useHistory();
    // const location = useLocation();

    return (
        <>
            <Header2 />
            <div className="payment_success_container d-flex justify-content-center">
                <div className="payment_success_inner_container mt-5">
                    <div className="payment_success_image mt-5">
                        <img src={Payment_faild} alt="Payment success" width="100%"  />
                    </div>
                    <div className="payment_success_content mt-5">
                        <h5 className="text-danger">Payment failed, Please try after sometime!</h5>
                        <button className="btn backbtn" onClick={() => navigate.push(FRONTEND_NAME + '/home')}> Back to Home </button>
                    </div>
                </div>
            </div>
        </>
    )
}
