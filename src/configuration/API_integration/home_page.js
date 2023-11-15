import { getCommonHeaders } from "../commonFunctions";
import * as constent from '../errorConstants';
import apis from '../apis';
import {
    BannerListAction,
    TopAstrologers_Action,
    freeSession_Action,
    DailyHoroscope_Action,
    getAstroVideo_Action
} from '../../Redux/Actions/home_Action'


export const fetchBannerAndSunSign = (dispatch) => {
    var headers = getCommonHeaders();
    apis
        .bannerAndSunSign(headers)
        .then((response) => response.data)
        .then((data) => {
            if (data.code === constent.SUCCESS_CODE && data.data) {
                console.log("resp data", data.data);
                dispatch(BannerListAction(data.data.bannerList));
                dispatch(DailyHoroscope_Action(data.data.featureList))
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

export const GetTopAstrologers = (dispatch) => {
    const headers = getCommonHeaders()
    const body = {
        "redeemCategory": "Chat",
        "redemptionType": "white"
    }
    apis
        .getTopAstrologerList(body, headers)
        .then(response => response.data)
        .then(data => {
            console.log(data)
            if (data.code === constent.SUCCESS_CODE && data.data) {
                dispatch(TopAstrologers_Action(data.data.slice(0, 4)))
                //   this.setState({
                //     astrolgerList: data.data.length > 4 ? data.data.slice(0, 4) : data.data
                //   })
            }
        })
        .catch(error => {
            console.log(error)
        })
}

export const GetStaticData = (dispatch) => {
    const headers = getCommonHeaders();
    apis
        .getStaticData(headers)
        .then((response) => response.data)
        .then((data) => {
            // console.log("static ddddata", data.data);

            if (data.code === constent.SUCCESS_CODE && data.data) {
                var freeSession = data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false
                dispatch(freeSession_Action(freeSession));
                dispatch(TopAstrologers_Action(data.data));
            }
            // this.setState({
            //   ourStaticData: data.data,
            //   isFreeSession: data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false
            // });
            // localStorage.setItem('freeSession', this.state.isFreeSession);
        })
        .catch((error) => {
            console.log(error);
        });
}

export const GetAstrologyVideo = (dispatch) => {
    const headers = getCommonHeaders()
    const body = {}
    apis
        .getLearningVideo(body, headers)
        .then(response => response.data)
        .then(data => {
            console.log(data)
            if (data.code === 2000 && data.data) {
                console.log(data)
                dispatch(getAstroVideo_Action(data.data.length > 4 ? data.data.slice(0, 3) : data.data))
                //   this.setState({
                //     astroVideos: data.data.length > 4 ? data.data.slice(0, 3) : data.data
                //   })
            }
        })
        .catch(error => {
            console.log(error)
        })
}