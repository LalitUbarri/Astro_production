// export const HTTP1 = "http://localhost:3000";  // for Localhost 
// export const HTTP1 = "http://localhost:3002";  // for Localhost 
//export const HTTP1 = "http://14.99.239.245";  // for UAT 
 export const HTTP1 = "https://astroking.net";  // for Prod 
// export const HTTP = "//";  // for UAT 
 export const HTTP = "https://"; // for producation

const CONTENT_PROJECT_NAME = "ContentManager2";
//const SPS_PROJECT_NAME = "SPSBilling";
const PROFILER_PROJECT_NAME = "Profiler";

export const DOMAIN_ADDRESS = "14.99.239.244";


// export const DEV_URL = "localhost:8080"; //for stage
//export const DEV_URL = "digital.mv1.in"; //for stage
// export const DEV_URL = "14.99.239.245:8080";  //for uat
 export const DEV_URL = "astroking.net:8080"; //for prod

const FLEX_PLATFORM = "FlexPlatform";
export const PROFILER_IP_ADDRESS = HTTP + DEV_URL + "/" + PROFILER_PROJECT_NAME;
export const CONTENT_IP_ADRESS = HTTP + DEV_URL + "/" + CONTENT_PROJECT_NAME;
export const ASTRO_URL = HTTP + DEV_URL;

// export const FRONTEND_NAME = "/astrology"; //for stage, uat 
 export const FRONTEND_NAME = ""; //for prod

export const GET_PRODUCT_CATALOG = "/FlexPlatform/productcatalog/searchByCategory";
export const GET_VASTU = "/FlexPlatform/getVastu";
export const GET_REDEMPTION = "/FlexPlatform/redemptionSearch?page=<page>&size=<size>";
export const GET_LOYALTY_PROGRAMME_INFO = "/FlexPlatform/getLoyaltyProgrammeInfo";
export const GET_KEYS_VALUE = "/FlexPlatform/getKeysValue";
export const GET_USER_ADDRESS = "/FlexPlatform/getUserAddress";
export const GET_ORDER_WHITE_GOODS = "/FlexPlatform/orderWhitegoods";
export const SAVE_USER_ADDRESS = "/FlexPlatform/saveUserAddress";
export const UPDATE_USER_ADDRESS = "/FlexPlatform/updateUserAddress";
export const DELETE_USER_ADDRESS = "/FlexPlatform/deleteUserAddress";
export const GET_PRODUCT_BILLING_DETAILS = "/FlexPlatform/getProductBillingDetails";
export const PRODUCT_BILLING_DETAILS = "/FlexPlatform/productBillingDetails";
export const GET_REDEMPTION_SEARCH_WITH_RATING = "/FlexPlatform/redemptionSearchWithRating";
export const POST_LOGIN = "/FlexPlatform/security/login";
export const POST_LOGIN_WITH_OTP = "/FlexPlatform/security/loginWithOtp";
export const GET_USER_PROFILE_DETAILS = "/FlexPlatform/userProfileDetails";
export const VALIDATE_OTP_REGISTER = "/FlexPlatform/validateOTP";
export const VALIDATE_OTP_FORGOT_PWD = "/FlexPlatform/security/resetpassword/validateOTP";
export const SEND_OTP_REGISTER = "/FlexPlatform/sendOTP";
export const SEND_OTP_FORGOT_PWD = "/FlexPlatform/security/resetpassword/sendOTP";
export const SAVE_USER_PROFILE = "/FlexPlatform/saveUserProfileDetails";
export const UPLOAD_FILE = "/FlexPlatform/uploadFile";
export const CHECK_USER_PROFILE_STATUS = "/FlexPlatform/checkUserProfileStatus"
//NOTIFICATION CONFIGURATION

//const NOTIFICATION_DOMAIN_IP_ADDRESS = "digital.mv1.in" //stage
// const NOTIFICATION_DOMAIN_IP_ADDRESS = "14.99.239.245:8080" //stage
 const NOTIFICATION_DOMAIN_IP_ADDRESS = "astroking.net" //prod

//export const CHAT_API_URL = HTTP +"digital.mv1.in:9090/ChatMachine"; // stage
// export const CHAT_API_URL = HTTP + "14.99.239.245:8080/ChatMachine";  //uat
export const CHAT_API_URL = HTTP + "astroking.net:8090/ChatMachine"; //prod
// export const CHAT_API_URL = "ws://localhost:3000/ws"; //localhost


//export const RAZORPAY_API_URL = HTTP +"digital.mv1.in:9090/RazorPayIntegration"; // stage
// export const RAZORPAY_API_URL = HTTP + "14.99.239.245:8080/RazorPayIntegration";  //uat
// export const RAZORPAY_API_URL = HTTP + "localhost:8080/RazorPay";  //local
export const RAZORPAY_API_URL = HTTP + "astroking.net/RazorPayIntegration"; //prod

// export const RAZORPAY_KEY = 'rzp_test_Z05KGs2HYnDIzY' // uat
 export const RAZORPAY_KEY = 'rzp_live_JOksMhu2wnFSqP' // producation

export const NOTIFICATION_API_URL = HTTP + NOTIFICATION_DOMAIN_IP_ADDRESS + "/GnNotificationManager";
export const CHECK_NOTIFICATION_STATUS_API_URL = HTTP + NOTIFICATION_DOMAIN_IP_ADDRESS + "/GnNotificationManager/v1/user/checkStatus"
export const USER_REGISTRATION_API_URL = HTTP + NOTIFICATION_DOMAIN_IP_ADDRESS + "/GnNotificationManager/v1/user/register"
export const USER_UNREGISTRATION_API_URL = HTTP + NOTIFICATION_DOMAIN_IP_ADDRESS + "/GnNotificationManager/v2/user/unregister"
export const NOTIFICATION_CHANNEL = "web";
export const GET_INAPP_NOTIFICATION = "/GnNotificationManager/v1/gnNotification/inapp";

//export const ANDROID_APK= "astro-user-prod.apk"
export const ANDROID_APK = "play.google.com/store/apps/details?id=com.astroking"

export const NEWS_CATEGORY = "News";
export const LANGUAGE_KEY = "language";

export const DEVICE_TYPE = "mobile";
// export const APP_LANGUAGE = "en";
export const APP_LANGUAGE = "hi";
export const CHANNEL_NAME = "android";
export const CHANNEL = "api";
export const APP_VERSION = "1";
export const NOTIFICATION_APP_NAME = "Astrology";
export const DEVICE_ID = "a1b2c3d4";
export const CAMPAIGN_ID = "1";
export const CLIENT_ID = "yBMYafcnQ/OZY70+m7WwWA==";
export const CONTENT_TYPE = "application/json";
export const MSISDN = "8802150158"
export const HASH =
  "$2a$10$zivYZgtcu8tp63NI.PLzVeMwSRP7NWJLm1IJ2eoXLIJoX/d0cl4eK";
export const ROLE_CLIENT = 'role_client';

export const CMS_URL = "//mobileapp.gloworld.com//ContentManager2/v1";


export const ENCRYPTION_SECRET_KEY = 'LOYALTYPLATF0%MOne97@LOyalty%#!m';
export const FLEX_PLATFORM_URL = HTTP + DEV_URL + "/" + FLEX_PLATFORM;
export const APP_NAME = "astrology";
export const SUBSIDISED_ID = 12;
export const FirstMessage = 'Namaskar Pandit Ji, Below are my details: Name: <name> Gender: <gender> DOB: <dob> TOB: <tob> POB: <pob>. Dear user, we have shared your details with Acharya ji. Please wait, your chat will start within 2 minutes. Billing will start once Acharya ji reply.';
export const secondMessage = 'Dear user, I have received your details, allow me to generate your Kundali. Please wait a few minutes.';