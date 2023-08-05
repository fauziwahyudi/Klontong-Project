import { FETCH_PRODUCTS_SUCCESS } from '../actions/actionType'

const initialState = {
    products: []
}

function productReducer(currentState = initialState, action) {
    if (action.type === FETCH_PRODUCTS_SUCCESS ) {
        return { ...currentState, products: action.payload}
    }

    return currentState
}

export default productReducer