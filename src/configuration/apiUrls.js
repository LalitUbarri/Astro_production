import { PROFILER_IP_ADDRESS, DEV_URL, HTTP, FLEX_PLATFORM_URL, CHAT_API_URL, CHAT_ONLY_API_URL } from "./constants";

const appendChatDomain = (url) => {
  return CHAT_API_URL + url;
};

export default {
  //videoBanner: CMS_URL + "/fetchHomePage",

  //videoBanner: CMS_URL + "/fetchHomePage",
  //sendOtp: PROFILER_IP_ADDRESS + "/generateotp.json",

  getStaticData: FLEX_PLATFORM_URL + "/getStaticData",
  getBalance: FLEX_PLATFORM_URL + "/getMyPointDetails",

  //chat api
  postChatForm: FLEX_PLATFORM_URL + "/userProfileDetails",
  preStart: appendChatDomain("/conversation/preStart?from=<userMsisdn>&to=<panditMsisdn>&appName=<appName>"),
  startConversation: appendChatDomain(
    "/conversation/start?from=<userMsisdn>&to=<panditMsisdn>&appName=<appName>"
  ),
  startConversationV2: appendChatDomain(
    "/conversation/v2/start?from=<userMsisdn>&to=<panditMsisdn>&appName=<appName>&language=<Language>&isPremium=<isPremium>&isPromotional=<isPromotional>"
  ),
  getLivePanditForUser: appendChatDomain(
    "/chat/getLivePanditForUser?appName=<appName>&to=<userMsisdn>"
  ),
  getChat: appendChatDomain(
    "/chat/getChat?from=<userMsisdn>&to=<panditMsisdn>&appName=<appName>&chatId=<chatId>"
  ),
  newChat: appendChatDomain(
    "/chat/newChat?to=<userMsisdn>&appName=<appName>&chatId=<chatId>"
  ), //get new chats periodically
  send: appendChatDomain(
    "/chat/send?from=<userMsisdn>&to=<panditMsisdn>&appName=<appName>&message=<chatMessage>&chatId=<chatId>"
  ),
  endChat: appendChatDomain(
    "/conversation/end?from=<userMsisdn>&to=<panditMsisdn>&appName=<appName>&chatId=<chatId>"
  ),

  //call api
  requestCall: FLEX_PLATFORM_URL + "/pushIvrObd",

  //report api
  pendingReport: FLEX_PLATFORM_URL + "/searchPendingRememptionByMsisdn",
  requestReport: FLEX_PLATFORM_URL + "/redeemPoint",

  getKeysValue: FLEX_PLATFORM_URL + "/getKeysValue",
  submitChatReview: FLEX_PLATFORM_URL + "/addReviewRating",

  astrolgersList: FLEX_PLATFORM_URL + "/redemptionSearchWithRating",

  premiumAstrolgersList: FLEX_PLATFORM_URL + "/getPremiumPanditList",

  fetchBookSlot: FLEX_PLATFORM_URL + '/getTimeSlotPandit',

  bookSlot: FLEX_PLATFORM_URL + '/bookPremiumSlot',

  getUserTimeSlot: FLEX_PLATFORM_URL + '/getUserTimeSlot',

  saveKundaliHoroscopeInfo: FLEX_PLATFORM_URL + '/saveKundaliHoroscopeInfo',

  getKundaliHoroscopeInfo: FLEX_PLATFORM_URL + '/getKundaliHoroscopeInfo?serviceType=kundali&msisdn=',

  getHoroscopeInfo: FLEX_PLATFORM_URL + '/getKundaliHoroscopeInfo?serviceType=horoscope&msisdn=',

  getSubsidizeAstrologerList: FLEX_PLATFORM_URL + "/getSubsidizeAstrologerList?msisdn=<msisdn>&serviceType=<serviceType>",

  ourStoryUrl: FLEX_PLATFORM_URL + "/productcatalog/searchByCategory",

  aboutUsUrl: FLEX_PLATFORM_URL + "/getLoyaltyProgrammeInfo",

  bannerSunSignUrl: FLEX_PLATFORM_URL + "/getFeatureList",

  logoutUrl: FLEX_PLATFORM_URL + "/security/logout",

  walletTransactions: FLEX_PLATFORM_URL + "/getWalletTransactions",

  panditJilist: FLEX_PLATFORM_URL + "/redemptionSearch",

  subscribeToPanditJi: FLEX_PLATFORM_URL + "/subscribeProductNotification",

  subscribeToPanditJi: FLEX_PLATFORM_URL + "/subscribeProductNotification",

  fetchBusyPandits: CHAT_API_URL + "/chat/getBusyPandit?appName=astrology",

  checkBusyPandit: CHAT_API_URL + "/chat/getBusyPandit?appName=astrology&msisdn=<panditMsisdn>",
  fetchPrivacyPolicy: FLEX_PLATFORM_URL + "/fetchPrivacyPolicy",

  basicAstrologerDetails: FLEX_PLATFORM_URL + "/redemptionSearchByName",
  totalReportDetails: FLEX_PLATFORM_URL + "/consolidateRedemptionByMode",
  astrologerReviewRating: FLEX_PLATFORM_URL + "/getReviewRating",
  fetchSunSignData: FLEX_PLATFORM_URL + "/productcatalog/searchByCategory",

  //View order history
  productBilling: FLEX_PLATFORM_URL + "/productBilling",
  productBillingDetails: FLEX_PLATFORM_URL + "/productBillingDetails",
  getPoojaOrderDetails: FLEX_PLATFORM_URL + "/getPoojaOrderDetails",
  downloadReport: CHAT_API_URL + "/file/download/", //<reportId>

  getOurServices: FLEX_PLATFORM_URL + "/getOurServices",
  getCountryList: FLEX_PLATFORM_URL + "/getCountryList",

  // getCurrencyData: FLEX_PLATFORM_URL + "/getCurrencyData",

  fetchVoucherList: FLEX_PLATFORM_URL + "/getPromocodeDtls",

  initiatePayment: HTTP + DEV_URL + "/ccavPaymentGateway/initiatePayment",

  ccavRedirectUrl: HTTP + DEV_URL + "/" + "ccavPaymentGateway/makePayment?orderId=<orderId>",

  fetchOfferList: FLEX_PLATFORM_URL + "/getofferlist",

  authenticatePromo: FLEX_PLATFORM_URL + "/authenticatePromocode",

  fetchPaymentSummary: FLEX_PLATFORM_URL + "/getpaymentsummary?amount=<amount>",

  removePromo: FLEX_PLATFORM_URL + "/removePromocode",

  addItemsToCart: FLEX_PLATFORM_URL + "/addItemsToCart",

  removeItemFromCart: FLEX_PLATFORM_URL + "/removeItemFromCart",

  viewCartItems: FLEX_PLATFORM_URL + "/viewCartItems",

  getCartItemCount: FLEX_PLATFORM_URL + "/getCartItemCount",

  clearCart: FLEX_PLATFORM_URL + "/clearCart",

  applyastromallpromo: FLEX_PLATFORM_URL + "/applyastromallpromo",
  //contact us
  contactUs: FLEX_PLATFORM_URL + "/feedback",

  //Kundali
  basicKundli: FLEX_PLATFORM_URL + "/getResponse",

  astroDetails: FLEX_PLATFORM_URL + "/astro_details",

  ghatChakra: FLEX_PLATFORM_URL + "/",

  //New UI Change
  topAstrologerList: FLEX_PLATFORM_URL + '/topAstrologerList',

  getLearningVideo: FLEX_PLATFORM_URL + '/getLearningVideo',

  getCurrencyData: FLEX_PLATFORM_URL + '/getCurrencyData?isdCode=',

  getLiveChatData: CHAT_API_URL + '/chat/getLivePanditForUser?appName=astrology&to=',

  getCountryData: FLEX_PLATFORM_URL + "/getLocationData?pinCode=",
  getLocationDataKundali: FLEX_PLATFORM_URL + '/KundaliLocation?pinCode=<pincode>',
  getRechargeCondition: FLEX_PLATFORM_URL + "/getRechargeCondition",

  newUserGetofferBanner: FLEX_PLATFORM_URL + '/getofferBanner',
  NewuserOfferInfo: FLEX_PLATFORM_URL + '/userOfferInfo',
  getUserInfo: FLEX_PLATFORM_URL + '/getUserInfo',
  kundaliOffer: FLEX_PLATFORM_URL + '/kundaliOffer',
  OfferProduct: FLEX_PLATFORM_URL + '/OfferProduct',
  OfferProductId: FLEX_PLATFORM_URL + "/OfferProductId?goodsId=<id>",
  RazorPayOffer: HTTP + DEV_URL + '/RazorPayOffer/orderPlace?txnId=<txnId>&price=<price>',
  // jioUserCheck: FLEX_PLATFORM_URL + '/jioUserCheck?msisdn=<msisdn>',
  jioUserCheck: 'http://14.99.239.245:8080/FPTest/jioUserCheck?msisdn=<msisdn>', // Uat
  // jioServiceAccepance: HTTP + DEV_URL + "/jioServiceAccepance"
  jioServiceAccepance: HTTP + DEV_URL + "/JioAPI/jioServiceAccepance",
  getUserStatussAtroking: HTTP + DEV_URL + '/JioAPI/getUserStatusAstrotell?msisdn=<msisdn>',
  getUserInfoStatus: FLEX_PLATFORM_URL + '/getUserInfoStatus',
  userPopupEvent: FLEX_PLATFORM_URL + '/userPopupEvent?msisdn=<msisdn>',
  updateUserFeedback: FLEX_PLATFORM_URL + '/updateUserFeedback'
};
