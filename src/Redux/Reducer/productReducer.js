// import { act } from "react-dom/test-utils"

const INITIAL_STATE = {
    productList : [],
    brands: [],
    loading: false,
    error: false,
    productById : {},
    cart:[],
    cartUser: []
}


export const productReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'FETCH_DATA_START':
            return{
                ...state,
                loading: true
            }
        case 'FETCH_DATA_SUCCES':
            return{
                ...state,
                productList: action.payload,
                loading:false
            }
        case 'FETCH_DATA_ID_SUCCES':
            return{
                ...state,
                productById: action.payload,
                loading:false
            }
        case 'FETCH_DATA_FAILED' :
            return{
                ...state,
                error: true,
                loading: false
            }          
        default: 
            return state
    }
}

