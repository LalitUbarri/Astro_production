import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { FRONTEND_NAME,HTTP1 } from "../configuration/constants";
import apis from "../configuration/apis";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import { getCommonHeaders } from "../configuration/commonFunctions";
import HomeIcon from '../images/home.png';
import '../styles/pageHeader.css';
import '../styles/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faWallet } from '@fortawesome/free-solid-svg-icons';

class PageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: localStorage["userProfile"] ? true : false,
      searchTerm: "",
      sortTerm: "",
      currencyLogo: "",
      balance: "",
      showSearch:false
    };
  }


  
  getUserBalance = async () => {
    
    return await apis
      .getBalance({})
      .then((response) => response.data)
      .then((res) => {
        // alert('balamce')
        if (res.code == "2000") {
          //debugger;
          // console.log("response getBalance", res);
          
          if (res.data) {
            
            let balanceData = res.data.myPoint;
            let balance = balanceData.point;
            localStorage["userBalance"] = balance;
            this.setState({
              balance: balance
            })
          }
        } else {
          console.log(res.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  recharge = () => {
    if (this.state.islogin) {
      this.props.history.push({ pathname: FRONTEND_NAME + "/recharge" });
    }
  };
  editSearchTerm = (e) => {
    let searchTerm = e.target.value;
    this.setState({
      searchTerm: e.target.value,
    });
    this.props.editSearchTerm(searchTerm);
  };
  editSortTerm = (e) => {
    let sortTerm = e.target.value;
    this.setState({
      sortTerm: sortTerm,
    });
    this.props.editSortTerm(sortTerm);
  };

  editFilterastrologer = (e) => {
    let sortTerm = e.target.value;
    this.setState({
      filterTerm: sortTerm,
    });
   
    this.props.editFilterastrologer(sortTerm);
  };

  getUserCurrency = () => {
    var headers = getCommonHeaders();
    headers.msisdn = localStorage['selectedCountryCode'] + localStorage['msisdn'];
    const countryCode = localStorage["selectedCountryCode"] ? localStorage["selectedCountryCode"] : '91';
    apis
      .getCurrency(headers, countryCode)
      .then((response) => response.data)
      .then((data) => {
        if (data.code == '2000') {
          const currencyLogo = data.data.currencyLogo ? data.data.currencyLogo : '₹';    
          this.setState({
            currencyLogo: currencyLogo
          });
        } 
      })
      .catch((error) => {
        console.log(error);
      });

      
  };
  
componentDidMount(){
  
  this.getUserCurrency();
  this.getUserBalance();
  if(window.location.href === HTTP1+FRONTEND_NAME+'/talk'){
    // alert(window.location.href)
    this.setState({
      ...this.state,
      showSearch:true
    })
  }else if(window.location.href === HTTP1+FRONTEND_NAME+'/chatList'){
// alert(window.location.href)
this.setState({
  ...this.state,
  showSearch:true
})
  }else{
    this.setState({
      ...this.state,
      showSearch:false
    })
  }
}

  render() {
    const {t}= this.props;
    // console.log(window.location.href);
    return (
      <div className={this.props.Mob_HeaderIsTrue}>
      <div className={"page-header"}>
          <div className={this.props.location.pathname === "/astrology/chatList" || this.props.location.pathname === "/astrology/talk" || this.props.location.pathname === "/astrology/report"? "userDetail_container_fluid d-flex mobRow":"userDetail_container_fluid d-flex"}>
            <div className="breadcrumbs_container page-name page_header_view mb-480">
              <ul id="breadcrumbs-two">
                <li> 
                    <a onClick={() => this.props.history.push(FRONTEND_NAME + '/home')}>
                        <img src={HomeIcon} alt="home" width="15px" />
                    </a>
                </li>
                <li className="head_title">
                    <a className="current active_breadcrumbs text-capitalize head_title">{t(this.props.name.firstname)} {" "}{t(this.props.name.lastname)}</a>
                </li>
              </ul>
            </div>

            <div className="userInfo_container page-details text-right page_header_view">
            {window.location.href === (HTTP1+FRONTEND_NAME+'/premium') || window.location.href === (HTTP1+FRONTEND_NAME+'/freesession') ? 
                <div className="premiumSection">
                <button className={this.props.selectedSection === "Chat" ? "premiumButton mr-2 isActive" : "premiumButton mr-2"} onClick={() => this.props.fetchPanditList(window.location.href === (HTTP1+FRONTEND_NAME+'/premium') ? "premiumChat":'Chat')}>{t('Chat')}</button>
                <button className={this.props.selectedSection === "Call" ? "premiumButton mr-2 isActive" : "premiumButton mr-2"} onClick={() => this.props.fetchPanditList(window.location.href === (HTTP1+FRONTEND_NAME+'/premium') ? "premiumCall":'Call')}>{t('Call')}</button>
              </div>:null
              }
              {
                this.state.showSearch ? <>
                   <div className="shot-by mobsidemenu mr-3">
                  {this.props.showSortOptions ? <> 
                  <button className="btn btn-outline-secondary"  data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-sort-down"></i>  {t('SortBy')}</button> &nbsp;&nbsp;&nbsp;
                  <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop1"> <i class="bi bi-funnel"></i> {t('Filter')}</button>
                  {filterData('SortBy','',this.props,this.editSortTerm)}
                  {filterData1('Filter','',this.props,this.editFilterastrologer)}
                  </>:null}
                </div>
                <div className="shot-by mobsidemenu mr-3">
                    {this.props.showSortOptions ? (
                      <input
                        type="text"
                        className="form-control searchbyname"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={this.state.searchTerm}
                        onChange={this.editSearchTerm}
                        placeholder={t('SearchNameSkillLanguage')}
                      />
                    ):null}
                </div>
                </>:null
               
              }
              
                  {this.state.islogin && localStorage["userBalance"] ? (
                      <div className="recharge-bls d-flex align-items-center">
                        <div className="desk_top wallet_icon">
                          <FontAwesomeIcon icon={faWallet} />
                        </div>
                        <div className="available-bls">{t('Available_Balance')}</div>
                        {/* <div className="bls">{this.state.currencyLogo + localStorage["userBalance"]}</div> */}
                        <div className="bls">{this.state.currencyLogo + this.state.balance}</div>
                      </div>
                    ):null}
                
                <div className="ml-2 recharge-bls mob-rechargebtn">
                  {this.state.islogin && (
                    <a className="btn rechargBtn_" onClick={() => this.recharge()}>
                      {t('Recharge')}
                    </a>
                  )}
                </div>
             
            </div>
          </div>
        
      </div>
      </div>
    );
  }
}

const filterData = (title, data,props,editSortTerm) => {
  const { t } = props;
  return (
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content staticBackdrop1">
          <div class="modal-header text-left hr">
            <h5 class="modal-title">{title}</h5>
            <span type="button" class="bi bi-x-circle-fill" data-bs-dismiss="modal" aria-label="Close"> </span>
          </div>
          <div class="modal-body text-left">
            <div class="form-check filter_check">
              <input class="form-check-input check_agree"data-bs-dismiss="modal" aria-label="Close" type="radio" onChange={editSortTerm} value={'expHL'} name="flexRadioDefault" id="flexRadioDefault1" />
              <label class="form-check-label" for="flexRadioDefault1"data-bs-dismiss="modal" aria-label="Close">
              {t('ExperienceHightoLow')}
              </label>
            </div>
            <div class="form-check filter_check">
              <input class="form-check-input check_agree"data-bs-dismiss="modal" aria-label="Close" onChange={editSortTerm} value={'expLH'} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label class="form-check-label" for="flexRadioDefault2"data-bs-dismiss="modal" aria-label="Close">
              {t('ExperienceLowtoHigh')}
              </label>
            </div>
            <div class="form-check filter_check">
              <input class="form-check-input check_agree"data-bs-dismiss="modal" aria-label="Close" onChange={editSortTerm} value={'orderHL'} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label class="form-check-label" for="flexRadioDefault2"data-bs-dismiss="modal" aria-label="Close">
              {t('TotalOrdersHightoLow')}
              </label>
            </div>
            <div class="form-check filter_check">
              <input class="form-check-input check_agree"data-bs-dismiss="modal" aria-label="Close" onChange={editSortTerm} value={'orderLH'} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label class="form-check-label" for="flexRadioDefault2"data-bs-dismiss="modal" aria-label="Close">
              {t('TotalOrdersLowtoHigh')}
              </label>
            </div>

            <div class="form-check filter_check">
              <input class="form-check-input check_agree"data-bs-dismiss="modal" aria-label="Close" onChange={editSortTerm} value={'priceHL'} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label class="form-check-label" for="flexRadioDefault2"data-bs-dismiss="modal" aria-label="Close">
              {t('PriceHightoLow')}
              </label>
            </div>
            <div class="form-check filter_check">
              <input class="form-check-input check_agree"data-bs-dismiss="modal" aria-label="Close" onChange={editSortTerm} value={'priceLH'} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label class="form-check-label" for="flexRadioDefault2"data-bs-dismiss="modal" aria-label="Close">
             {t('PriceLowtoHigh')}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const filterData1 = (title, data,props,editSortTerm) => {
  const { t } = props;
  return (
    <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content staticBackdrop1">
          <div class="modal-header text-left hr">
            <h5 class="modal-title">{title}</h5>
            <span type="button" class="bi bi-x-circle-fill" data-bs-dismiss="modal" aria-label="Close"> </span>
          </div>
          <div class="modal-body text-left">
            <div class="form-check filter_check">
              <input class="form-check-input check_agree" type="radio"  data-bs-dismiss="modal" aria-label="Close" onChange={editSortTerm} value={'vedic'} name="flexRadioDefault" id="flexRadioDefault15" />
              <label class="form-check-label" for="flexRadioDefault15"  data-bs-dismiss="modal" aria-label="Close">
              {t('Vedic Astrologers')}

              </label>
            </div>
            <div class="form-check filter_check">
              <input class="form-check-input check_agree"data-bs-dismiss="modal" aria-label="Close" onChange={editSortTerm} value={'Puja'} type="radio" name="flexRadioDefault" id="flexRadioDefault22" />
              <label class="form-check-label" for="flexRadioDefault22" data-bs-dismiss="modal" aria-label="Close">
              {t('Puja consultants')}
              </label>
            </div>
            <div class="form-check filter_check">
              <input class="form-check-input check_agree"data-bs-dismiss="modal" aria-label="Close" onChange={editSortTerm} value={'Face'} type="radio" name="flexRadioDefault" id="flexRadioDefault23" />
              <label class="form-check-label" for="flexRadioDefault23" data-bs-dismiss="modal" aria-label="Close">
              {t('Face readers')}
              </label>
            </div>
            <div class="form-check filter_check">
              <input class="form-check-input check_agree"data-bs-dismiss="modal" aria-label="Close" onChange={editSortTerm} value={'Palm'} type="radio" name="flexRadioDefault" id="flexRadioDefault24" />
              <label class="form-check-label" for="flexRadioDefault24" data-bs-dismiss="modal" aria-label="Close">
              {t('Palm Readers')}
              </label>
            </div>

            <div class="form-check filter_check">
              <input class="form-check-input check_agree"data-bs-dismiss="modal" aria-label="Close" onChange={editSortTerm} value={'Tarot'} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label class="form-check-label" for="flexRadioDefault2"data-bs-dismiss="modal" aria-label="Close">
              {t('Tarot Card Reading')}
              </label>
            </div>
            <div class="form-check filter_check">
              <input class="form-check-input check_agree" data-bs-dismiss="modal" aria-label="Close"onChange={editSortTerm} value={'Numerologist'} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label class="form-check-label" for="flexRadioDefault2"data-bs-dismiss="modal" aria-label="Close">
             {t('Numerologist')}
              </label>
            </div>
            <div class="form-check filter_check">
              <input class="form-check-input check_agree"data-bs-dismiss="modal" aria-label="Close" onChange={editSortTerm} value={'vastu'} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label class="form-check-label" for="flexRadioDefault2"data-bs-dismiss="modal" aria-label="Close">
             {t('Vastu Shastra')}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


const withCombine=compose(
  withRouter,
  withTranslation()
) 


export default withCombine(PageHeader);
