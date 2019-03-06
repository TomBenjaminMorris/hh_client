import { DATA_FETCH_REQUEST, DATA_FETCH_SUCCESS, DATA_POST_REQUEST, DATA_POST_SUCCESS, CENTER_MAP, SET_MILES } from '../actions/actions';

//the initial store (global app state)
let initialState = {
    data: [],
    loading: false,
    toggle: false,
    miles: 5
}

//REDUCERRRR
//When an action is called...the reducer checks the action type then basically does all the work depending on which action
export default function transactions(state = initialState, action) {

    switch (action.type) {
        case DATA_FETCH_REQUEST:
            console.log('DATA_FETCH_REQUEST Action');
            return { ...state, loading: true };
        case DATA_FETCH_SUCCESS:
            console.log('DATA_FETCH_SUCCESS Action');
            return { ...state, data: action.payload, loading: false };
        case DATA_POST_REQUEST:
            console.log('DATA_POST_REQUEST Action');
            return { ...state };
        case DATA_POST_SUCCESS:
            console.log('DATA_POST_SUCCESS Action');
            return { ...state };
        case CENTER_MAP:
            console.log('CENTER_MAP Action');
            return { ...state, lat: action.payload.lat, lng: action.payload.lng, toggle: !state.toggle };
        case SET_MILES:
            console.log('SET_MILES Action: ' + action.payload.miles);
            return { ...state, miles: action.payload.miles };
        default:
        return state;
    }
}
