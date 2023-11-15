import { ActionType } from '../Constents/ActionType_constent';

// Country code Action 
export const CountryCodeAction = (code) => {
    return {
        type: ActionType.GET_COUNTRY_CODE,
        payload: code
    }
}

// userMsisdn Action

export const UserMsisdnAction = (msisdn) => {
    return {
        type: ActionType.GET_USERMSISDN,
        payload: msisdn
    }
}