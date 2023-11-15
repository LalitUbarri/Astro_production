import { ActionType } from '../Constents/ActionType_constent';

const initialState = {
    countryCode: '',
}
// Get Country code 
export const GetCountryCodeReducers = (state = initialState, { type, paylod }) => {
    switch (type) {
        case ActionType.GET_COUNTRY_CODE:
            return { countryCode: paylod }
        default:
            return state;
    }
}

