import urls from "./apiUrls";
//import {getGetApi, getPostApi} from './axiosConfig'
import axios from "axios";

import { getCommonHeaders, getCommonHeaders1 } from "./commonFunctions";
import { FRONTEND_NAME, SAVE_USER_PROFILE } from "./constants";

axios.interceptors.request.use(function (request) {
  // var Ismsisdn = localStorage.getItem('msisdn');
  request.headers.msisdn = typeof localStorage['msisdn'] === 'undefined' ? 0 : localStorage['selectedCountryCode'] + localStorage['msisdn'];
  // alert(request.headers.msisdn)
  if (localStorage["userProfile"] != null) {
    let userProfile = JSON.parse(localStorage["userProfile"]);
    request.headers.accessToken = userProfile.accessToken;
  }
  // console.log("complete request", request);
  showLoader();
  return request;
});

axios.interceptors.response.use(
  function (response) {
    // alert('hello')
    hideLoader();
    // console.log("complete response is", response);
    // console.log("response.data.code, ", response.data.code);
    let requestUrl = response.config.url;
    // console.log("requestUrl", requestUrl);
    let preventTimeOut = requestUrl.includes(SAVE_USER_PROFILE) || requestUrl.includes(urls.addItemsToCart)
      || requestUrl.includes(urls.contactUs);
    // console.log("requestUrl-1", preventTimeOut);
    // console.log("requestUrl-2", response.data);
    // console.log("requestUrl-3", response);
    if (response.data.code === 2009 && !preventTimeOut ) {
      //if jio user flag==true
      //jiocheck user api call , acces 
      console.log("auth error");
      
      // debugger
      // if( localStorage["isJioUser"] == null){
        return (window.location = FRONTEND_NAME + "/home?err=1");
      // }

    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function showLoader() {
  //document.getElementById("loader").style.display ="block";
}
function hideLoader() {
  //document.getElementById("loader").style.display ="none";
}

axios.defaults.headers.common = getCommonHeaders();

export default {
  //sendOtp: (body,headers)=> postApi(urls.sendOtp,headers,body),
  //videoBanner: (headers)=> getApi(urls.videoBanner,headers),
  getStaticData: (headers) => getApi(urls.getStaticData, headers),
  getKeysValue: (body, headers) => postApi(urls.getKeysValue, headers, body),
  getBalance: (body, headers) => postApi(urls.getBalance, headers, body),
  astrolgersList: (body, headers) => postApi(urls.astrolgersList, headers, body),
  getSubsidizeAstrologerList: (url, body, headers) => postApi(url, headers, body),
  ourStory: (body, headers) => postApi(urls.ourStoryUrl, headers, body),
  aboutUs: (body, headers) => postApi(urls.aboutUsUrl, headers, body),
  bannerAndSunSign: (body, headers) => postApi(urls.bannerSunSignUrl, headers, body),
  logoutApi: (body, headers) => postApi(urls.logoutUrl, headers, body),
  walletTransactions: (body, headers) => postApi(urls.walletTransactions, headers, body),
  panditJilist: (body, headers) => postApi(urls.astrolgersList, headers, body),
  premiumPanditJilist: (body, headers) => postApi(urls.premiumAstrolgersList, headers, body),
  fetchBookSlot: (headers, query) => getApi(urls.fetchBookSlot + query, headers),
  fetchUserTimeSlot: (headers, query) => getApi(urls.getUserTimeSlot + query, headers),
  bookSlot: (headers, body) => postApi(urls.bookSlot, headers, body),
  subscribeToPanditJi: (body, headers) => postApi(urls.subscribeToPanditJi, headers, body),
  fetchBusyPandits: (body, headers) => postApi(urls.fetchBusyPandits, headers, body),
  checkBusyPandit: (url, body, headers) => postApi(url, headers, body),
  fetchPrivacyPolicy: (headers) => getApi(urls.fetchPrivacyPolicy, headers),
  getOurServices: (headers) => getApi(urls.getOurServices, headers),
  getCountryCode: (headers) => getApi(urls.getCountryList, headers),
  getCurrency: (headers, query) => getApi(urls.getCurrencyData + query, headers),
  getRechargeCondition: (headers, body) => postApi(urls.getRechargeCondition, headers, body),

  //Kundali 
  //getKundaliDetails : (url, body, headers) => postApi(url, headers, body),
  getKundaliDetails: (body, headers) => postApi(urls.basicKundli, headers, body),
  //fetchUserTimeSlot: (headers, query) => getApi(urls.getUserTimeSlot + query, headers),
  getKundaliHoroscopeInfo: (headers, query) => getApi(urls.getKundaliHoroscopeInfo + query, headers),
  getHoroscopeInfo: (headers, query) => getApi(urls.getHoroscopeInfo + query, headers),
  saveKundaliHoroscopeInfo: (headers, body) => postApi(urls.saveKundaliHoroscopeInfo, headers, body),

  //CHAT apis
  postChatForm: (body, headers) => postApi(urls.postChatForm, headers, body),
  preStart: (url, body, headers) => postApi(url, headers, body),
  startConversation: (url, body, headers) => postApi(url, headers, body),
  startConversationV2: (url, body, headers) => postApi(url, headers, body),
  send: (url, body, headers) => postApi(url, headers, body),
  getLiveUserForPandit: (url, body, headers) => postApi(url, headers, body),
  getLivePanditForUser: (url, body, headers) => postApi(url, headers, body),
  getChat: (url, body, headers) => postApi(url, headers, body), //get old chat
  newChat: (url, body, headers) => postApi(url, headers, body),
  endChat: (url, body, headers) => postApi(url, headers, body),
  submitChatReview: (url, body, headers) => postApi(url, headers, body),
  //call
  requestCall: (body, headers) => postApi(urls.requestCall, headers, body),
  //report
  pendingReport: (body, headers) => postApi(urls.pendingReport, headers, body),
  requestReport: (body, headers) => postApi(urls.requestReport, headers, body),
  basicAstrologerDetails: (url, body, headers) => postApi(url, headers, body),
  totalReportDetails: (url, body, headers) => postApi(url, headers, body),
  astrologerReviewRating: (url, body, headers) => postApi(url, headers, body),
  fetchSunSignData: (body, headers) => postApi(urls.fetchSunSignData, headers, body),
  fetchVoucherList: (body, headers) => postApi(urls.fetchVoucherList, headers, body),
  initiatePayment: (body, headers) => postApi(urls.initiatePayment, headers, body),
  fetchOfferList: (headers) => getApi(urls.fetchOfferList, headers),
  authenticatePromo: (body, headers) => postApi(urls.authenticatePromo, headers, body),
  fetchPaymentSummary: (urls, headers) => getApi(urls, headers),
  removePromo: (body, headers) => postApi(urls.removePromo, headers, body),


  //View Order History
  productBilling: (body, headers) => postApi(urls.productBilling, headers, body),

  getPoojaOrderDetails: (body, headers) => postApi(urls.getPoojaOrderDetails, headers, body),

  productBillingDetails: (body, headers) => postApi(urls.productBillingDetails, headers, body),

  addItemsToCart: (body, headers) => postApi(urls.addItemsToCart, headers, body),

  removeItemFromCart: (body, headers) => postApi(urls.removeItemFromCart, headers, body),

  viewCartItems: (headers) => getApi(urls.viewCartItems, headers),

  getCartItemCount: (headers) => getApi(urls.getCartItemCount, headers),

  clearCart: (headers) => getApi(urls.clearCart, headers),

  applyastromallpromo: (body, headers) => postApi(urls.applyastromallpromo, headers, body),

  contactUs: (body, headers) => postApi(urls.contactUs, headers, body),

  //New UI Changes
  getTopAstrologerList: (body, headers) => postApi(urls.topAstrologerList, headers, body),

  getLearningVideo: (body, headers) => postApi(urls.getLearningVideo, headers, body),
  // getLearningVideo: (body, headers) => postApi('https://astroking.com/FlexPlatform/getLearningVideo', headers, body),

  getCurrencyData: (headers, query) => getApi(urls.getCurrencyData + query, headers),

  getLiveChatData: (body, headers) => postApi(urls.getLiveChatData, headers, body),

  getCountryData: (headers, query) => getApi(urls.getCountryData + query, headers),
};



export const postApi = (url, headers = {}, requestBody = {}) => {
  // alert(JSON.stringify(headers));
  // console.log("Url to call : ", url);
  // console.log("headers : ", headers);
  // console.log("requestBody : ", requestBody);
  // const data = axios.post(url, requestBody, { headers });
  return axios.post(url, requestBody, { headers });
};

// export const postApi = (url, headers = {}, requestBody = {}) => {
//   console.log("Url to call : ", url);
//   console.log("headers : ", headers);
//   console.log("requestBody : ", requestBody);
//   console.log("responceBody", axios.post(url, requestBody, { headers }));
//   return axios.post(url, requestBody, { headers });
// };

export const getApi = (url, headers) => {
  // console.log("Url to call : ", url);
  // headers["Content-Type"] = "application/json";
  // console.log("headers : ", headers);
  return axios.get(url, { data: null }, { headers });
};

export const deleteApi = (url, headers = {}, data = {}) => {
  // console.log("Url to call : ", url);
  // console.log("headers : ", headers);
  // console.log("requestBody : ", data);
  return axios.delete(url, { headers, data });
};
