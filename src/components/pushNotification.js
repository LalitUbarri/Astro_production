import React from "react";
import firebase from 'firebase';
import * as constantURL from "../configuration/constants";
// const firebase = React.lazy(() => import('firebase'));
const axios = React.lazy(() => import('axios'));


export const initializeFirebase = () => {
  // console.log("Inside initializeFirebase");
  var firebaseConfig = {
    apiKey: "AIzaSyBsD9t9guYXiTYKmq7J_M--dRhArQ1z_4I",
    authDomain: "astro-user-app.firebaseapp.com",
    projectId: "astro-user-app",
    storageBucket: "astro-user-app.appspot.com",
    messagingSenderId: "775309704174",
    appId: "1:775309704174:android:d48ca182375e2ca9deecff",
    measurementId: "G-LSRVDRDT8C",
  };
  firebase.initializeApp(firebaseConfig);
};

export const askForPermissioToReceiveNotifications = async (
  successCallbackFn,
  errCallbackFn
) => {
  ////debugger;
  // console.log("Inside askForPermissioToReceiveNotifications");
  try {
    const messaging = firebase.messaging();
    // console.log("After messaging");
    await messaging.requestPermission();
    // console.log("After requestPermission");
    const token = await messaging.getToken();
    // console.log("After token : ", token);
    sessionStorage.setItem("gcmId", token);
    await registerdevice(token, successCallbackFn, errCallbackFn);
    return token;
  } catch (error) {
    console.log("Error occured :  notifications: " + error);
    //errCallbackFn("p");
  }
};

export const registerdevice = async (
  token,
  successCallbackFn,
  errCallbackFn
) => {
  var isSuccess = false;
  var url = `${constantURL.USER_REGISTRATION_API_URL}`;
  var deviceID = generateDeviceId();
  // console.log("deviceID : ", deviceID);
  sessionStorage.setItem("deviceId", deviceID);

  var data = {
    appName: constantURL.APP_NAME,
    deviceId: generateDeviceId(),
    gcmId: token,
    msisdn: localStorage["msisdn"],
    appVersionName: "1.0",
    appVersionCode: 1.7,
    loginLogoutFlag: false,
    channel: "web",
    // 'access_token': sessionStorage.getItem("accessToken")
  };
  //'access_token': sessionStorage.getItem("accessToken"),

  var headers = {
    "Content-Type": "application/json",
    Device_id: deviceID,
    Accept: "application/json",
    channel: constantURL.NOTIFICATION_CHANNEL,
    access_token: localStorage.getItem("accessToken"),
  };

  // console.log("url to hit : ", url);
  // console.log("headers: " + JSON.stringify(headers));
  // console.log("body: " + JSON.stringify(data));
  await axios
    .post(url, data, { headers: headers })
    .then((response) => {
      // console.log("response from notificaation", response.data);
      isSuccess = true;
      //successCallbackFn();
      return isSuccess;
    })
    .catch((error) => {
      console.log(
        "Error occured : while calling registered user API : ",
        error
      );
      isSuccess = false;
      return isSuccess;
    });
};

export function generateDeviceId() {
  var navigator_info = window.navigator;
  var screen_info = window.screen;
  var uid = navigator_info.mimeTypes.length;
  uid += navigator_info.userAgent.replace(/\D+/g, "");
  uid += navigator_info.plugins.length;
  uid += screen_info.height || "";
  uid += screen_info.width || "";
  uid += screen_info.pixelDepth || "";
  // console.log("uid : ", uid);
  return uid.toString();
}
