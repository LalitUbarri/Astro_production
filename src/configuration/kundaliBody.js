import moment from 'moment'

export const KundaliBody = (data, url,pathVariables, type) => {
    switch (type) {
        case 1:
            return {
                apiName: url,
                requestBody : {
                    "day": moment(new Date(data.birthDate)).date(),
                    "month": moment(new Date(data.birthDate)).month() + 1,
                    "year": moment(new Date(data.birthDate)).year(),
                    "hour":moment(new Date(data.birthTime)).hour(),
                    "min":moment(new Date(data.birthTime)).minute(),
                    "lat":data.latitude,
                    "lon":data.longitude,
                    "tzone":5.5
                },
                headers:{
                    'Accept-Language': localStorage['selectedLanguage'] ? localStorage['selectedLanguage'] : 'en'
                },
                queryParameters:{},
                pathVariables: pathVariables
            }
            // return "Type1"
        case 2:
            return {
                apiName: url,
                requestBody : {
                    "m_day": moment(new Date(data.birthDate)).date(),
                    "m_month": moment(new Date(data.birthDate)).month() + 1,
                    "m_year": moment(new Date(data.birthDate)).year(),
                    "m_hour":moment(new Date(data.birthTime)).hour(),
                    "m_min":moment(new Date(data.birthTime)).minute(),
                    "m_lat":data.latitude,
                    "m_lon":data.longitude,
                    "m_tzone":5.5,
                    "f_day": moment(new Date(data.birthDate)).date(),
                    "f_month": moment(new Date(data.birthDate)).month() + 1,
                    "f_year": moment(new Date(data.birthDate)).year(),
                    "f_hour":moment(new Date(data.birthTime)).hour(),
                    "f_min":moment(new Date(data.birthTime)).minute(),
                    "f_lat":data.latitude,
                    "f_lon":data.longitude,
                    "f_tzone":5.5,
                },
                headers:{
                    'Accept-Language': localStorage['selectedLanguage'] ? localStorage['selectedLanguage'] : 'en'
                },
                queryParameters:{},
                pathVariables: pathVariables
            }
            case 4:
                return {
                    apiName: url,
                    requestBody : {
                        "m_day": moment(new Date(data.malebirthDate)).date(),
                        "m_month": moment(new Date(data.malebirthDate)).month() + 1,
                        "m_year": moment(new Date(data.malebirthDate)).year(),
                        "m_hour":moment(new Date(data.malebirthTime)).hour(),
                        "m_min":moment(new Date(data.malebirthTime)).minute(),
                        "m_lat":data.malelongitude,
                        "m_lon":data.malelongitude,
                        "m_tzone":5.5,
                        "f_day": moment(new Date(data.femalebirthDate)).date(),
                        "f_month": moment(new Date(data.femalebirthDate)).month() + 1,
                        "f_year": moment(new Date(data.femalebirthDate)).year(),
                        "f_hour":moment(new Date(data.femalebirthTime)).hour(),
                        "f_min":moment(new Date(data.femalebirthTime)).minute(),
                        "f_lat":data.femalelatitude,
                        "f_lon":data.femalelongitude,
                        "f_tzone":5.5,
                    },
                    headers:{
                        'Accept-Language': localStorage['selectedLanguage'] ? localStorage['selectedLanguage'] : 'en'
                    },
                    queryParameters:{},
                    pathVariables: pathVariables
                }
            default: 
                return {
                    apiName: url,
                    requestBody : {
                        "place": data.place,
                        "maxRows": data.maxRows,
                    },
                    headers:{},
                    queryParameters:{},
                    pathVariables: pathVariables
                }
    }
}

export const KundaliBodyPDF = (data, url,pathVariables, type) => {
    switch (type) {
        case 1:
            return {
                "day": moment(new Date(data.birthDate)).date(),
                    "month": moment(new Date(data.birthDate)).month() + 1,
                    "year": moment(new Date(data.birthDate)).year(),
                    "hour":moment(new Date(data.birthTime)).hour(),
                    "min":moment(new Date(data.birthTime)).minute(),
                    "lat":data.latitude,
                    "lon":data.longitude,
                    "tzone":5.5
                }
            // return "Type1"
        case 2:
            return {
                "m_day": moment(new Date(data.birthDate)).date(),
                    "m_month": moment(new Date(data.birthDate)).month() + 1,
                    "m_year": moment(new Date(data.birthDate)).year(),
                    "m_hour":moment(new Date(data.birthTime)).hour(),
                    "m_min":moment(new Date(data.birthTime)).minute(),
                    "m_lat":data.latitude,
                    "m_lon":data.longitude,
                    "m_tzone":5.5,
                    "f_day": moment(new Date(data.birthDate)).date(),
                    "f_month": moment(new Date(data.birthDate)).month() + 1,
                    "f_year": moment(new Date(data.birthDate)).year(),
                    "f_hour":moment(new Date(data.birthTime)).hour(),
                    "f_min":moment(new Date(data.birthTime)).minute(),
                    "f_lat":data.latitude,
                    "f_lon":data.longitude,
                    "f_tzone":5.5,
                }
        default: 
            return {
                    "place": data.place,
                    "maxRows": data.maxRows,
                }
    }
}