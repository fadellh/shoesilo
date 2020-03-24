import React, { Component } from 'react';
import './App.css';
import Home from './Pages/Home';
import { Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
// import RegisterPage from './Pages/RegisterHooks'
import ProductsPage from './Pages/ProductsPage'
import LatihanAxios from './Pages/LatihanAxios';
import Review from './Pages/Review'
import ProductDetail from './Pages/ProductDetail'
// import {API_URL} from './Support/API_URL'
// import Axios from 'axios'
import { Login, keepLogin } from './Redux/Action'
import { connect } from 'react-redux'
import ManageProduct from './Pages/ManageProduct'
import CartPage from './Pages/CartPage'
import TransactionPages from './Pages/TransactionPages'
import Profile from './Pages/Profile'

class App extends Component{

  componentDidMount(){
    let token = localStorage.getItem('token')
    if(token){
      this.props.keepLogin(token)
    }
    // let token = localStorage.getItem('username')
    // if(token){
    //   console.log(JSON.parse(token))
    //   let tokenParse = JSON.parse(token)
    //   Axios.get(`${API_URL}/users?username=${tokenParse.username}&password=${tokenParse.username}`)
    //   .then((res)=>{
    //     console.log(res.data)
    //     let { id, username, email,  role } = res.data[0]
    //     this.props.Login({
    //         id,
    //         username,
    //         email,
    //         role
    //     })
    //   })
    //   .catch((err)=>{
    //     console.log(err)
    //   })
    // }
  }

  render(){
    return(
      <div>
        <Header />
        <Route path='/' component={Home} exact/>
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/products' component={ProductsPage} />
        <Route path='/latihan' component={LatihanAxios} />
        <Route path='/review' component={Review} />
        <Route path='/product-detail' component={ProductDetail} />
        <Route path='/manage-product' component={ManageProduct} />
        <Route path='/cartpage' component={CartPage} />
        <Route path='/transaction' component={TransactionPages} />
        <Route path='/profile' component={Profile} />
        <Footer/>
      </div>
    )
  }
}

export default connect(null, { Login, keepLogin })(App);
