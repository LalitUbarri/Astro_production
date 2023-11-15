import React from "react";
import Header from "../common/Header2";
import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";
import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";
import Pagination from "react-js-pagination";
import ReactPaginate from "react-paginate";
import "../styles/wallet-transactions.css";
import ads from "../images/ads.png";
import { FRONTEND_NAME } from "../configuration/constants";

import { getCommonHeaders } from "../configuration/commonFunctions";
import apis from "../configuration/apis";
import Moment from "moment";
import Popup from "../components/popup";
import Loading from "./loader";
import BottomHeader from "../common/BottomHeader";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import Chat_Talk_Header from "../common/Chat&Talk_Header";

class WalletTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walletData: [],
      userProfile: localStorage["userProfile"]
        ? JSON.parse(localStorage["userProfile"])
        : {},
      showPopUp: false,
      msg: "",
      button: "Ok",
      pageCount: 0,
      activePage: 0,
      pageSize: 40,
      heading: "Astrology",
      enableLoader: false,
      successPopup: false,
      successmsg: "Recharge Successful",
      currencyLogo: '',
      mobSideNaveTrue:false
    };
  }

  componentDidMount() {
    const url = window.location.href;
    if (url.includes("status=success")) {
      //alert('success');
      this.setState({ successPopup: true });
    }
    this.fetchWalletTransaction(0);
    this.getUserCurrency();
  }

  fetchWalletTransaction = (page) => {
    var headers = getCommonHeaders();
    headers.accessToken = this.state.userProfile["accessToken"];
    headers.msisdn = localStorage['selectedCountryCode'] + localStorage["msisdn"];
    console.log("active page>>" + this.state.activePage);
    var requestBody = {
      endDate: "0",
      entryList: "",
      pageNumber: page,
      searchKey: "",
      startDate: "0",
    };
    apis
      .walletTransactions(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          ////debugger;
          {
            console.log("walletTransactions" + data.data);
          }
          var pageS = this.state.pageSize;
          this.setState({
            walletData: data.data,
            pageCount: Math.ceil(data.totalCount / pageS),
            enableLoader: true,
          });
        } else if (data.code == "2002") {
          /*  else if(data.code == "2009")
          {
            localStorage.clear();
            sessionStorage.clear();
            this.setState({
              showPopUp: true,
              msg: 'Session logout ! Please login again. ',
              button: 'Ok',
              enableLoader : false
            });
          }*/
          this.setState({ walletData: [] });
          this.setState({ enableLoader: true });
        } else {
          console.log(data.msg);
          this.setState({ enableLoader: false });
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ enableLoader: false });
      });
  };

  closePopUp = () => {
    this.setState({
      showPopUp: false,
    });
    this.props.history.push({ pathname: FRONTEND_NAME + "/home" });
  };

  closeSuccPopUp = () => {
    this.setState({ successPopup: false });
  };

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log("selected page>>" + selectedPage);
    this.setState({ activePage: selectedPage });
    console.log("activePage page>>" + this.state.activePage);
    this.fetchWalletTransaction(selectedPage);
    //this.setState({activePage:selectedPage});
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
  IsMob_Side_Nave = (e) => {
    this.setState({
      ...this.state,
      mobSideNaveTrue: e
      
    })
  }
  render() {
    const {t}= this.props;
    return (
      <>
      <Chat_Talk_Header
          IsNavIconTrue={false}
          IsSearchTrue={false}
          IsFilterTrue={false}
          // IsMob_Side_Nave={this.IsMob_Side_Nave}
          propsData={this.props}
          CustomClass={true}
          IsTitleTrue={true}
          title={t('Wallet_Transactions')}
        />
      <Header 
          IsActive_header_Or_not="chat_and_talk_header-"
      />
      {/* <BottomHeader /> */}
        <div className="container">
          
          {/* <HeaderMenu /> */}
          <PageHeader
            // Mob_HeaderIsTrue={'not_show_mob_header1'}
            name={{ firstname: "Wallet", lastname: "Transactions" }}
          />
          {this.state.showPopUp ? (
            <Popup
              heading={this.state.heading}
              msg={this.state.msg}
              button={this.state.button}
              closePopUp={this.closePopUp}
            />
          ) : null}
          {this.state.successPopup ? (
            <Popup
              heading={this.state.heading}
              msg={this.state.successmsg}
              button={this.state.button}
              closePopUp={this.closeSuccPopUp}
            />
          ) : null}

          {this.state.enableLoader ? null : <Loading />}
          
          <div className="row">
            <div className={this.state.mobSideNaveTrue ? "col-md-3 mobsidemenu mob_Side_Nave" : 'col-md-3 mobsidemenu'}>
                <SideMenu />
            </div>
            <div className="col-md-9 wt_data_container mb-480" >
              <div className="DataTable">
                <div className="Table_Warrper">
                  <div className="tableD">
                    <div className="tableHead">
                      <div className="Thead wtBody">
                        <spin> {t('Description')} </spin>
                      </div>
                      <div className="Thead wtBody mobBody">
                        <span> {t('Transaction_Amount')} </span>
                      </div>
                      <div className="Thead wtBody">
                        <span> {t('DateTime')} </span>
                      </div>
                    </div>
                    {this.state.walletData.map((data, index) => {
                      return <>
                         <div className="tableBody">
                          <div className="Tbody wtBody">
                            {data.mode === null || data.mode === "" || !isNaN(data.mode) ? t(data.category) : (data.mode)}
                          </div>
                          <div className="Tbody wtBody mobBody">
                            {data.type === "DR" ? (
                              <div className="red_color">{`-${this.state.currencyLogo}${data.money}`}</div>
                            ) : (
                              <div className="green_color">{`+${this.state.currencyLogo}${data.money}`}</div>
                            )}
                          </div>
                          <div className="Tbody wtBody">
                            {Moment(data.dateTime).format(
                                "DD MMM YYYY, hh:mm a"
                              )}
                          </div>
                        </div>
                      </>
                    })}
                  </div>
                </div>
              </div>
            </div>
              
              <div className="wt_table_container desk_top">
                    <div className="wt_head">
                      <p> {t('Wallet Transactions')} </p>
                    </div>
                    {this.state.walletData.map((data, index) => {
                      return (
                        <div className="wt_body_card d-flex">
                        <div className="card_wt_user">
                          <p className="head_wt">  {data.mode === null || data.mode === "" || !isNaN(data.mode) ? t(data.category) : (data.mode)} </p>
                          <p> {Moment(data.dateTime).format(
                                "DD MMM YYYY, hh:mm a"
                              )}</p>
                        </div>
                        <div className="card_wt_t">
                          <span>{data.type === "DR" ? (
                              <div className="red_color">{`-${this.state.currencyLogo}${data.money}`}</div>
                            ) : (
                              <div className="green_color">{`+${this.state.currencyLogo}${data.money}`}</div>
                            )}</span>
                        </div>
                    </div>
                      )
                    })}
                    
              </div>

            <div className="col-md-12 mt-3 mb-5 pagination_container">
              <div className="pagination-cl mb-480">
                
                  <nav aria-label="...">
                    <ReactPaginate
                      previousLabel={"<"+ this.props.t("Previous")}
                      nextLabel={this.props.t("Next") + ">"}
                      pageCount={this.state.pageCount}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      previousLinkClassName={"pagination__link"}
                      nextLinkClassName={"pagination__link"}
                      disabledClassName={"pagination__link--disabled"}
                      activeClassName={"pagination__link--active"}
                    />
                  </nav>
                  
                </div>
            </div>
          </div>
        </div>
        <Footer history={this.props}/>
      </>
    );
  }
}


export default withTranslation()(WalletTransactions);
