import axios from "axios";

export const getPostApi =   (url, headers = {}, requestBody={} ) => {
    console.log("Url to call : ", url);
    console.log("headers : ", headers)
    console.log("requestBody : ", requestBody);
    return axios.post(url, requestBody, {headers} );
}

export const getGetApi = (url, headers = {}) => {
    console.log("Url to call : ", url);
    debugger;
     headers["Content-Type"]="application/json";
    console.log("headers : ", headers);
    return axios.get(url,{data: null},{headers});
}
  export function getDeviceId(force){
    if(force || (typeof sessionStorage["DeviceId"] == 'undefined' || sessionStorage['DeviceId'] == '')){
      sessionStorage["DeviceId"] = generateDeviceId();
    }
    return sessionStorage["DeviceId"];
  }

  function generateDeviceId(){
    var navigator_info = window.navigator;
    var screen_info = window.screen;
    var uid = navigator_info.mimeTypes.length;
    uid += navigator_info.userAgent.replace(/\D+/g, '');
    uid += navigator_info.plugins.length;
    uid += screen_info.height || '';
    uid += screen_info.width || '';
    uid += screen_info.pixelDepth || '';
    //console.log(uid);
    return uid.toString();
  }
  