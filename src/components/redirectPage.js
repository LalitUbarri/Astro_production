import React from "react";
import { withRouter } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
import about from "../images/about.png";
import "../styles/about.css";
import Header from "../common/Header2";
import HeaderMenu from "../common/HeaderMenu";
// import Footer from "../common/Footer";

import PageHeader from "../common/PageHeader";
// import * as Constant from '../configuration/constants';
// import { getApi, postApi } from "../configuration/apis";
// import { getCommonHeaders } from '../configuration/commonFunctions';
// import * as ErrorConstant from '../configuration/errorConstants';
// import { FRONTEND_NAME } from "../configuration/constants";

class RedirectPage extends React.Component {
  constructor(props) {
    
    super(props);
    this.state = {
     
    }
  }
  componentDidMount() {
    
  }

  componentDidUpdate(props){
     
  }
  
  render() {
    const { aboutUsList } = this.state;
    
    return (
      <>
        <div className="container">
          <Header />
          <HeaderMenu />
          <PageHeader name={{ firstname: this.props.footer.title1, lastname: this.props.footer.title2 }} />
          <div className="row page-body">
              
            {(this.props.footer.imgUrl!=null && this.props.footer.imgUrl!='') ?
            <div className="col-md-12 col-lg-12 col-sm-12 mg-top-42 padd-0">
            
            <div className="col-sm-4 col-md-4 col-lg-4 float-left pd-left">
           <img src={about} className="about-img" alt="about"></img>
         </div>
       
      
       <div className="col-sm-8 col-md-8 col-lg-8 float-right padd-0 text-left ">
       <p className="about-header">
           {this.props.footer.title1 + ' '+ this.props.footer.title2}
         </p>
         <p>
           {this.props.footer.desc}
         </p>
       </div>
     </div> :
     <div className="col-md-12 col-lg-12 col-sm-12 mg-top-42 padd-0">
        


<div className="col-sm-12 col-md-12 col-lg-12 float-left padd-0 text-left ">
<p className="about-header">
           {this.props.footer.title1 + ' '+ this.props.footer.title2}
         </p>
         <p>
           {this.props.footer.desc}
         </p>
</div>
</div>}
          </div>
        </div>
       
      </>
    );
  }
}

export default withRouter(RedirectPage);
