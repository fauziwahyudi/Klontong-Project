import { DETAIL_PRODUCT_SUCCESS } from '../actions/actionType'

const initialState = {
    detail: []
}
// console.log(initialState, ">>>>>>>>>>>");

function productDetailReducer(currentState = initialState, action) {
    if (action.type === DETAIL_PRODUCT_SUCCESS ) {
        return { ...currentState, detail: action.payload}
    }

    return currentState
}

export default productDetailReducer