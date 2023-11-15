import React from "react";
import Header from "../common/Header2";
import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";

import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";

import "../styles/apply-voucher-code.css";
import apply from "../images/apply.svg";
import { getCommonHeaders } from "../configuration/commonFunctions";
import apis from "../configuration/apis";
import Moment from 'moment';
class ApplyVoucherCode extends React.Component {

    constructor(props)
    {
        super(props);
        this.state={
            voucherList:[],
            userProfile : JSON.parse(localStorage["userProfile"]),
        }
    }
    componentDidMount(){
        this.fetchVoucherList();
    }
    fetchVoucherList=()=>{

        var headers=getCommonHeaders();
        //headers.accessToken = this.state.userProfile.accessToken;
       // console.log('headers.accessToken'+headers.accessToken)
        var requestBody={}
        apis.fetchVoucherList(headers,requestBody)
        .then(response=>response.data).
        then(data=>{

            if(data.code==2000)
            {
                this.setState({voucherList:data.data})
            }
           /* else if(data.code==2009)
            {

            }*/
            else{

            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    render(){
        return (
            <>
                <div className="container">
                    <Header />
                    <HeaderMenu />
                    <PageHeader name={{ firstname: 'Apply', lastname: 'Voucher Code' }}/>
                    <div className="row page-body">
                        <SideMenu />
                        <div className="col avc-body">
                            {
                                this.state.voucherList.map((data)=>
                                <div className="row">
                                <div className="col voucher-body">
                                    <div className="row">
                                        <div className="col voucher-1">
                                            <div className="voucher-per">
                            <p className="per">{data.promocodeFigure}% OFF</p>
                                                <a href="#" className="btn deal-btn">Deal</a>
                                            </div>
                                        </div>
                                        <div className="col voucher-2">
                            <p className="what">{data.promocode}</p>
                                            <p className="details">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,</p>
                            <p className="expire-time"><span className="clock-icon"><i class="bi bi-clock-fill"></i></span>Expire Date: {Moment(data.endDate).format('DD/MM/yyyy')}</p>
                                        </div>
                                        <div className="col voucher-3">
                                            <a href="#" className="apply"><img src={apply} alt="img" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                            }
                          
                           
                        </div>
                    </div>
                </div>
                <Footer history={this.props}/>
            </>
        )
    }
    
}

export default ApplyVoucherCode;