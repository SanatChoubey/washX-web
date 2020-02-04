import actionTypes from '../../Config/actionType';

const initialState = {
 cart:[]
}
export default function addToCart (state= initialState, {type, payload}){
    switch(type){
        case actionTypes.ADD_TO_CART:
            return {...state, cart:[...state.cart,payload]};
        default:
            return state    
    }
}