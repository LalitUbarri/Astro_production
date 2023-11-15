import { ActionType } from '../Constents/ActionType_constent';

const initialState = {
    BannerList: [],
    TopAstrologers: [],
    Daily_horoscope: [],
    AstroVideos: [],
    // userData: [],
    // Coins: [],
    IsfreeSession: false,
    // IsDark: false
}


// Banner List Reducer
export const BannerlistReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionType.GET_BANNER_LIST:
            return { BannerList: payload }
        default:
            return state;
    }
}

// Get Daily Horoscope 
export const GetDailyHoroscope = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionType.DAILY_HOROSCOPE:
            return { Daily_horoscope: payload }
        default:
            return state;
    }
}


// Get Top Astrologers
export const TopAstrologers_Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionType.GET_TOP_ASTROLOGERS:
            return { TopAstrologers: payload }
        default:
            return state;
    }
}

// FREE SESSION Reducer 

export const freeSessionReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionType.FREE_SESSION:
            return { IsfreeSession: payload }
        default:
            return state;
    }
}

// Get Astro Videos

export const GetAsttroVideossReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionType.GET_ASTRO_VIDEOS:
            return { AstroVideos: payload }
        default:
            return state;
    }
}
// // Get UserProfile Data

// export const GetUserProfileReducer = (state = initialState, { type, payload }) => {
//     switch (type) {
//         case ActionType.GET_USERPROFILE:
//             return { ...state, userData: payload }
//         default:
//             return state;
//     }
// }

// // Get LoyaltyConis 

// export const GetloyaltyCoinsReducer = (state = initialState, { type, payload }) => {
//     switch (type) {
//         case ActionType.GET_LOYALTY_COINS:
//             return { ...state, Coins: payload }
//         default:
//             return state;
//     }
// }

// // Light Them 

// export const IsLightThemReducer = (state = initialState.IsLight, { type, payload }) => {
//     switch (type) {
//         case ActionType.WHITE_THEM:
//             return { ...state, IsLight: payload }
//         default:
//             return state;
//     }
// }

// // Dark Them 

// export const IsDarkThemReducer = (state = initialState.IsLight, { type, payload }) => {
//     switch (type) {
//         case ActionType.DARK_THEM:
//             return { ...state, IsDark: payload }
//         default:
//             return state;
//     }
// }