import { combineReducers } from 'redux'; 
import { authReducer } from './authReducer';
import { productReducer} from './productReducer'
import { cartReducer, cartCount } from './cartReducer'

export default combineReducers({
    auth : authReducer,
    product : productReducer,
    cart : cartReducer,
    count: cartCount,
    
})