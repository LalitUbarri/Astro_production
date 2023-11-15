import React from "react";
// import { withRouter } from "react-router-dom";
import '../../styles/talk.css';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
// import user from "../images/user.png";
import "../../styles/about.css";
import PageHeader from "../../common/PageHeader";
import Footer from "../../common/Footer";
import SideMenu from "../../common/SideMenu";
// import apis from "../configuration/apis";
import { FRONTEND_NAME } from "../../configuration/constants";
import Popup from "../../components/popup";
import Popup1 from "../../components/Popup.jsx";
import $ from "jquery";

// import apiUrls from "../configuration/apiUrls";

// import * as Constant from '../configuration/constants'
import Signup from "../../components/signup";
// import { withTranslation } from 'react-i18next';
// import { compose } from 'redux'
import Header2 from "../../common/Header2";
import Chat_Talk_Header from "../../common/Chat&Talk_Header";

const vouchers = [
    {
        id:1,
        price:'151',
        disc:'10 Mins of Consultation + Kundali with 5 Years of Prediction + Access to Chat History + 5% Off on All Astromall Itinerarie'
    },
    {
        id:2,
        price:'251',
        disc:'15Mins of Consultation + Kundali with 10 Years of Prediction + Access to Chat History + 5% Off on All Astromall Itineraries'
    },
    {
        id:3,
        price:'501',
        disc:'30 Mins of Consultation + Kundali with 10 Years of Prediction + Access to Chat History + 10% Off on All Astromall Itineraries + Free Kundali Matching with Explanation (Upto 5 person)'
    },
    {
        id:4,
        price:'1001',
        disc:'1 hr of Consultation + Kundali with Lifetime Prediction + Access to Chat History + 20% Off on All Astromall Itineraries + Free Kundali Matching with Explanation (Upto 5 person)'
    },
    // {
    //     id:5,
    //     price:'',
    //     disc:''
    // },
    // {
    //     id:6,
    //     price:'',
    //     disc:''
    // },
]

export default function Evoucher(props) {
    const [state, setState] = React.useState({
        displaySignupPopUp: false,
        loginSelected: true,
        loginSelected: false,
        showPopUp: false,
        countryCode: '91',
        mobSideNaveTrue: false,
        viewMore:false,
        id:0
    });

    const openLoginPopup = () => {
        setState({
            displaySignupPopUp: true,
            loginSelected: true,
        });
    };


    const openSignupPopup = () => {
        setState({
            displaySignupPopUp: true,
            loginSelected: false,
        });
    };

    const closeSignUpPopup = () => {
        setState({
            displaySignupPopUp: false,
        });
    };

    const closePopupOnLogin = () => {
        localStorage["isUserLoggedIn"] = true;
        setState({
            displaySignupPopUp: false,
            isUserLoggedIn: true,
        });
        props.history.push(FRONTEND_NAME + "/home");
    };

var id;

React.useEffect(() =>{
    id = localStorage['vouchersId'];
})

console.log(state.id);
console.log(state.viewMore);
    return (
        <>
            <Chat_Talk_Header
                IsNavIconTrue={false}
                IsSearchTrue={true}
                IsFilterTrue={true}
                IsTitleTrue={true}
                propsData={[]}
                title={'E-voucher'}
            />

            <Header2 IsActive_header_Or_not="chat_and_talk_header-" />
            <div className="container">
                {
                    <PageHeader
                        Mob_HeaderIsTrue={'not_show_mob_header1'}
                        name={{ firstname: ('E'), lastname: ('Voucher') }}
                    />
                }


                {state.displaySignupPopUp && (
                    <Signup
                        openLoginPopup={openLoginPopup}
                        openSignupPopup={openSignupPopup}
                        closePopUp={closeSignUpPopup}
                        closeOnLogin={closePopupOnLogin}
                        isLogin={state.loginSelected}
                    //   countryCode={state.countryCode}
                    />
                )}
                {state.showPopUp ? (
                    <Popup
                        heading={this.state.heading}
                        msg={this.state.msg}
                        button={this.state.button}
                        closePopUp={this.closePopUp}
                        Isicon={true}
                        alert_panditMsg={this.state.IspanditBusy ? "pandit busy" : ''}
                    />
                ) : null}
                <>
                    <div className="page-body" style={{ marginBottom: "50px" }}>
                        <div className="row">
                            <div className={state.mobSideNaveTrue ? "col-md-3 mobsidemenu mob_Side_Nave" : 'col-md-3 mobsidemenu'}>
                                <SideMenu />
                            </div>
                            <div className="astrologer_list_container">
                                <div className="e_voucher_container d-flex justify-content-start column-gap-30 flex-wrap row-gap-30">
                                    {vouchers.map(item=> <div className="e_voucher_card" key={item.id} >
                                        <p className="e-voucher-header"></p>
                                        <div className="e-voucher-body d-flex align-items-center">
                                            <div className="e-voucher_details">
                                                <h3 className="text-white mt-3"> ₹{item.price} </h3>
                                                <p className="text-white"> {item.disc.substring(0,50)+ "..."}
                                                <button className="view-morebtn" onClick={() => {
                                                    localStorage.setItem('vouchersId', item.id);
                                                    setState({
                                                        viewMore:true,
                                                        id:item.id
                                                    })
                                                    $('#exampleModalCenter').modal('show');
                                                }}>View more</button> </p>
                                            </div>
                                            <div className="e-voucher_emty"></div>
                                        </div>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
            <Popup1 vouchers={vouchers} id={state.id}/>

            <Footer history={props} />
        </>
    )
}

