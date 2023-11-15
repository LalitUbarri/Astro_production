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
class GetVastu extends React.Component {

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
      var url = Constant.ASTRO_URL + Constant.GET_VASTU;
      const body = {
      }
      const headers = getCommonHeaders();
      console.log("body", body);
      postApi(url, headers, body)
        .then(response => response.data)
        .then((data) => {
          console.log("Get Vastu Gyan ", data);
          if (data && data.code == ErrorConstant.SUCCESS_CODE) {
            console.log("data ", data.data.productDetails);
            try {
              this.setState({
                productcatalogList: data.data,
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
        title={'Vastu Gyan'}
      />
        <Header 
          IsActive_header_Or_not="chat_and_talk_header-"
        />
        {/* <BottomHeader /> */}
        <PageBanner title={t('Vastu Gyan')} Banner = {''} />
          <div className="container">
            
            {/* <HeaderMenu /> */}
            {/* <PageHeader name={{ firstname: "", lastname: "" }} /> */}
            <div className="row page-body">
              <div className="col an-body">
              
              <div className="row mt-5 mob-mt-10">
                  
                   {productcatalogList && productcatalogList.length > 0 &&
                     productcatalogList.map((item, index) => (
  
                      <div className="col-12 col-md-6 mob-pd-0">
                        <div className="an-story">
                          
                          <div>
                            <img src={item.imageurl} alt={item.title}/>
                          </div>
                          <strong><p>{item.title}</p></strong>
                          <p>{item.description}</p>

                        </div>
                      </div>
                    ))
                     }
                    {(!productcatalogList ||(productcatalogList && productcatalogList.length ==0)) &&
                    <div className="col">
                    <p className="text-center pdb25" >{t("No data found")}</p>
                  </div>
                     }
                </div>
              </div>
            </div>
          </div>
          <Footer history={this.props} />
        </>
      )
    }
  }
  export default withTranslation()(GetVastu);