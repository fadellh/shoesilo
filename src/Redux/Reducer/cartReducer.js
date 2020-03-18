const INITIAL_STATE = {
    cart: [],
    cartUser: [],
    loading: false,
    error: false,
    count: 1,
    transaction: [] 
}

export const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'FETCH_DATA_START':
            return{
                ...state,
                loading: true
            }
        case 'ADD_CART':
            return{
                ...state,
                cart: action.payload,
                loading:false
            }
        case 'FETCH_CART_SUCCES': 
        return{
            ...state,
            cart: action.payload,
            loading: false
        }
        case 'FETCH_TRANSACTION_SUCCES': 
        return{
            ...state,
            transaction: action.payload,
            loading: false
        }
        case 'DELETE_CART_SUCCES': 
        return{
            ...state,
            cart: action.payload,
            loading: false
        }
        case'ADD_TRANSACTION':
        return{
            ...state,
            transaction: action.payload,
            loading: false 
        }
        case 'FETCH_CART_FAILED' :
            return{
                ...state,
                error: true,
                loading: false
            }  
        case 'INC_CART_FAILED' :
            return{
                ...state,
                error: true,
                loading: false
            }  
            default:
                return state        
    }
}

export const cartCount = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case'sUCCES':
        return{
            ...state,
            cart: state.count + action.payload
        }
        default:
            return state
    }
}