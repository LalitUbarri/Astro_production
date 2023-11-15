import { combineReducers } from 'redux';
// import { LoginUser } from './login_reducer';
// import { OTPReducer } from './otp_reducer';
import {
    BannerlistReducer,
    TopAstrologers_Reducer,
    freeSessionReducer,
    GetDailyHoroscope,
    GetAsttroVideossReducer,
} from './home_reducer';
import {
    GetCountryCodeReducers
} from './loginReduces';

const reducer = combineReducers({
    // NewUser: LoginUser,
    // Otp: OTPReducer,
    BannerData: BannerlistReducer,
    astro_data: TopAstrologers_Reducer,
    freeSession: freeSessionReducer,
    horoscope: GetDailyHoroscope,
    AstroVideos: GetAsttroVideossReducer,
    countryCode: GetCountryCodeReducers,
    // userData: GetUserProfileReducer,
    // TotalCoins: GetloyaltyCoinsReducer,
    // IsLight: IsLightThemReducer,
    // IsDark: IsDarkThemReducer,

});

export default reducer;