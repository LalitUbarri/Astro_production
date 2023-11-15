import { ActionType } from '../Constents/ActionType_constent';


// Banner Home page
export const BannerListAction = (bannerData) => {
    return {
        type: ActionType.GET_BANNER_LIST,
        payload: bannerData
    }
}

// Get Daily Horoscope 

export const DailyHoroscope_Action = (horoscope) => {
    return {
        type: ActionType.DAILY_HOROSCOPE,
        payload: horoscope
    }
}

// Get Top Astrologers 
export const TopAstrologers_Action = (topAstrologers) => {
    return {
        type: ActionType.GET_TOP_ASTROLOGERS,
        payload: topAstrologers
    }
}

// Free Session  
export const freeSession_Action = (IsfreeSession) => {
    return {
        type: ActionType.FREE_SESSION,
        payload: IsfreeSession
    }
}

// Get Astro Videos
export const getAstroVideo_Action = (videos) => {
    return {
        type: ActionType.GET_ASTRO_VIDEOS,
        payload: videos
    }
}