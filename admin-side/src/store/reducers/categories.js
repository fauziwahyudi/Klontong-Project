import { FETCH_CATEGORIES_SUCCESS } from '../actions/actionType'

const initialState = {
    categories: []
}

function categoryReducer(currentState = initialState, action) {
    if (action.type === FETCH_CATEGORIES_SUCCESS ) {
        return { ...currentState, categories: action.payload}
    }

    return currentState
}

export default categoryReducer