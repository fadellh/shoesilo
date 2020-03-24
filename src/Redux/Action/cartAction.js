import Axios from 'axios'
import {API_URL} from "../../Support/API_URL"

export const addToCart = (cartData,userId,productId) => {
    return(dispatch) => {
        dispatch({
            type: 'FETCH_DATA_START'
        })
        Axios.post(`${API_URL}/cart`,cartData)
        .then((res)=>{
        console.log(res,'berhasil masuk')
            dispatch({
                type: 'ADD_CART',
                payload: res.data
        })
        })
        .catch((err)=>{
            dispatch({
                type: 'FETCH_DATA_FAILED'
            })
        })
}
}

export const addTransaction = (transactionData) => {
    return(dispatch) => {
        dispatch({
            type: 'FETCH_DATA_START'
        })
        Axios.post(`${API_URL}/transaction`, transactionData)
        .then((res)=>{
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data
        })
        })
        .catch((err)=>{
            dispatch({
                type: 'FETCH_DATA_FAILED'
            })
        })
    }
}

export const endCart = (user) => {
    return(dispatch)=> {
        dispatch({
            type: 'FETCH_DATA_START'
        })
        Axios.delete(`${API_URL}/cart?userId=${user}`)
        .then((res)=>{
            console.log(res)
            dispatch({
                type: 'DELETE_CART_SUCCES',
                payload: res.data
            })
        })
        .catch((err)=>{
            console.log(err)
            dispatch({
                type: 'DELETE_CART_FAILED'
            })
        })
    }
}

export const fetchCart = (id) => {
    return(dispatch)=> {
        dispatch({
            type: 'FETCH_DATA_START'
        })
        Axios.get(`${API_URL}/cart?userId=${id}`)
        .then((res)=> {
            // console.log(res.data, 'INI DARI FETCH CART')
            dispatch({
                type: 'FETCH_CART_SUCCES',
                payload: res.data
            })
        })
            .catch((err)=>{
                console.log(err)
                dispatch({
                    type: 'FETCH_CART_FAILED'
                })
            })
    }
}
export const fetchTransaction = (id) => {
    return(dispatch)=> {
        dispatch({
            type: 'FETCH_DATA_START'
        })
        Axios.get(`${API_URL}/transaction?userId=${id}`)
        .then((res)=> {
            // console.log(res)
            dispatch({
                type: 'FETCH_TRANSACTION_SUCCES',
                payload: res.data
            })
        })
            .catch((err)=>{
                console.log(err)
                dispatch({
                    type: 'FETCH_CART_FAILED'
                })
            })
    }
}


export const increment = (userIdC,productIdC,nameC,imageC,sizeC,priceC,id,qtyInc) => {
    return(dispatch)=> {
        dispatch({
            type: 'FETCH_DATA_START'
        })
    let userId = userIdC
    let productId = productIdC
    let name = nameC
    let image = imageC
    let price = priceC
    let size = sizeC
    let qty = qtyInc+1  
    Axios.put(`http://localhost:2000/cart/${id}`, {userId,productId,name,price,image,size,qty}  )
        .then((res) => {
            console.log(res)
            // this.fetchCart()
            dispatch({
                type: 'INC_CART_SUCCES',
                payload: res.data
            })
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: 'INT_CART_FAILED'
            })
        })
}
}