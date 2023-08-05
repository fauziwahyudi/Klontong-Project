import { combineReducers } from "redux";
import productReducer from './products'
import categoryReducer from "./categories";
import productDetailReducer from "./detail";

const rootReducer = combineReducers({
    productReducer,
    categoryReducer,
    productDetailReducer
})

export default rootReducer