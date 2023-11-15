import React from "react";
import "../styles/popup.css";
import goldVoucher from '../images/New-images/voucher-card-gold.png'
import Voucher from '../images/New-images/voucher-card1.png'

const Popup = (props) => {
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      {/* <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Launch demo modal
      </button> */}
      {/* <!-- Modal --> */}
      <div
        class="modal fade modal_voucher_container1"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header1">
              <button
                type="button"
                class="close "
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {props.vouchers.map(item => {
                if(props.id === item.id){
                  return <div className={ props.id % 2 === 0 ? "wd-100 mt-2 e_voucher_card modal_voucher_container" :"wd-100 e_voucher_card mt-2"} key={item.id} >
                  <div className="e-voucher-body d-flex align-items-center">
                    {/* <img src={Voucher} alt="voucher img" width={'100%'} /> */}
                    <div className="e-voucher_details">
                      <h1 className="text-white mt-3 text-center"> ₹{item.price} </h1>
                      {/* <p className="text-white"> {item.disc.substring(0, 50)}</p> */}
                    </div>
                    <div className="e-voucher_emty"></div>
                  </div>
                </div>
                }
              }
              )}
            <div className="mt-3 text-left">
            {props.vouchers.map(item => {
                if(props.id === item.id){
                  return <p className=""> {item.disc}</p>
                }})}

              <h5> Offers:- </h5>

              <p> Duis eu dolore aute duis anim tempor tempor laboris minim qui anim aliquip ullamco ea. Amet fugiat pariatur deserunt minim est excepteur labore ex Lorem eu cillum.</p>

              <h5> How to Redeem?:- </h5>
              <p> Duis eu dolore aute duis anim tempor tempor laboris minim qui anim aliquip ullamco ea. Amet fugiat pariatur deserunt minim est excepteur labore ex Lorem eu cillum.</p>

              <h5> Terms & Conditions:- </h5>
              <p> Duis eu dolore aute duis anim tempor tempor laboris minim qui anim aliquip ullamco ea. Amet fugiat pariatur deserunt minim est excepteur labore ex Lorem eu cillum.</p>

              <div className="text-center mb-3 mt-2">
                <button className="header-login-btn text-white"> Pay now </button>
              </div>
            </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Popup;
