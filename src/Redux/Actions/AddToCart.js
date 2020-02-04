import actionTypes from '../../Config/actionType'
export const addToCart = (data) => {
    return (
        {
            type: actionTypes.ADD_TO_CART,
            payload:  data
        }
    )
}