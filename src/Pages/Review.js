import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Login } from '../Redux/Action'

const Review = () => {
    const [contoh, setContoh] = useState(0)
    const logged = useSelector((state) => {
        return{
           logged: state.auth.logged,
           role: state.auth.role
        }
        })

    const dispatch = useDispatch()

    const LoginHooks = () => {
        dispatch(Login({
            username: 'lianeddy',
            email: "lianeddy@gmail.com",
            role: 'admin',
            // password: '123'
        }))
    }
    console.log(logged)

    return (
        <div>
            <input type='button' value='-' onClick={() => setContoh(contoh-1)}/>
            {contoh}
            {logged.roles}
            <input type='button' value='+' onClick={() => setContoh(contoh+1)}/>
            <input type='button' value='Login' onClick={LoginHooks}/>
        </div>
    )
}

export default Review