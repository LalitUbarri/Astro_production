import React from "react";
import Header from "../common/Header2";
// import HeaderMenu from "../common/HeaderMenu";
// import PageHeader from "../common/PageHeader";
// import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";
import * as Constant from '../configuration/constants';
import { getCommonHeaders } from '../configuration/commonFunctions';
import { postApi } from "../configuration/apis";
import * as ErrorConstant from '../configuration/errorConstants';

import "../styles/astrology-news.css";
// import BottomHeader from "../common/BottomHeader";
import PageBanner from "../common/pageBanner";
import BannerImg from '../images/readmorebanner.png';
import { withTranslation } from 'react-i18next';
import Chat_Talk_Header from "../common/Chat&Talk_Header";
class AstrologyNews extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        productcatalogList: []
      }
    }
    componentDidMount() {
      this.getProductcatalog();
  
    }
  
    getProductcatalog = () => {
      console.log("inside getProductcatalog method");
      var url = Constant.ASTRO_URL + Constant.GET_PRODUCT_CATALOG;
      const body = {
        "category": Constant.NEWS_CATEGORY,
        "subCategory": ""
      }
      const headers = getCommonHeaders();
      console.log("body", body);
      postApi(url, headers, body)
        .then(response => response.data)
        .then((data) => {
          if (data && data.code == ErrorConstant.SUCCESS_CODE) {
            console.log("data ", data.data.productDetails);
            try {
              this.setState({
                productcatalogList: data.data.productDetails,
                enableLoader: true
              });
            }
            catch (error) {
              console.log("exception occured")
            //  this.toggleShowMsg("Something went wrong");
              this.setState({ enableLoader: false });
            }
          }
          else {
            console.log("Error code from getProductcatalog API : ", data.code, "with msg : ", data.msg);
            this.setState({ enableLoader: false });
          }
        })
        .catch(error => {
          console.log();
          console.error('error', error);
          this.setState({ enableLoader: false });
        });
    }
  
    render() {
      const {t}= this.props;
      const { productcatalogList } = this.state;
      return (
        <>
        <Chat_Talk_Header 
        IsNavIconTrue={false}
        IsSearchTrue={false}
        IsFilterTrue={false}
        // editSearchTerm={this.editSearchTerm}
        // editSortTerm={this.editSortTerm}
        // IsMob_Side_Nave={this.IsMob_Side_Nave}
        propsData={this.props}
        CustomClass={true}
        IsTitleTrue={true}
        title={t('Astrology_News')}
      />
        <Header 
          IsActive_header_Or_not="chat_and_talk_header-"
        />
        {/* <BottomHeader /> */}
        <PageBanner title={t('Astrology_News')} Banner = {BannerImg} />
          <div className="container">
            
            {/* <HeaderMenu /> */}
            {/* <PageHeader name={{ firstname: "", lastname: "" }} /> */}
            <div className="row page-body">
              <div className="col an-body">
              
              <div className="row mt-5">
                  
                   {productcatalogList && productcatalogList.length > 0 &&
                     productcatalogList.map((item, index) => (
  
                      <div className="col-12 col-md-6">
                        <div className="an-story">
                          
                          <div>
                            <img src={item.productImage} alt="product" />
                          </div>
                          <strong><p>{item.productTitle}</p></strong>
                          <p>{item.productDescription}</p>

                        </div>
                      </div>
                    ))
                     }
                    {(!productcatalogList ||(productcatalogList && productcatalogList.length ==0)) &&
                    <div className="col">
                    <p className="text-center pdb25" >{t("No data found")}</p>
                  </div>
                     }

                  
                  {/* //   <div className="col-6">
                //     <div className="an-story">
                //       <p>Neque porro quisquam est qui dolorem ipsum quia dolorsit amet, consectetur, adipisci velit…</p>
                //       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
                //       <img src={ads} />
                //       <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ” <a href="#">Read More</a></p>
                //     </div>
                //   </div>
                // </div>
                // <div className="row">
                //   <div className="col-6">
                //     <div className="an-story">
                //       <p>Neque porro quisquam est qui dolorem ipsum quia dolorsit amet, consectetur, adipisci velit…</p>
                //       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
                //       <img src={ads} />
                //       <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ” <a href="#">Read More</a></p>
                //     </div>
                //   </div>
                //   <div className="col-6">
                //     <div className="an-story">
                //       <p>Neque porro quisquam est qui dolorem ipsum quia dolorsit amet, consectetur, adipisci velit…</p>
                //       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
                //       <img src={ads} />
                //       <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ” <a href="#">Read More</a></p>
                //     </div>
                //   </div>
                // </div> */}
                </div>
              </div>
            </div>
          </div>
          <Footer history={this.props} />
        </>
      )
    }
  }
  export default withTranslation()(AstrologyNews);