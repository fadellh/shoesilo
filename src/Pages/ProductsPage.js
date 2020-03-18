import React, { Component } from 'react';
// import axios from 'axios';
// import { API_URL } from '../Support/API_URL';
import ProductCard from '../Components/ProductCard';
import { Link } from 'react-router-dom';
import {connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import {fetchProduct} from '../Redux/Action'


// import Select from 'react-select';


class ProductsPage extends Component{
    state = {
        data : []
    }

    componentDidMount(){

        this.props.fetchProduct()
        // axios.get(`${API_URL}/products`)
        // .then((res) => {
        //     this.setState({
        //         data : res.data
        //     })
        //     console.log(this.state.data)
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    }

    

    // options = [
    //     {
    //         value : 'Jordan', label : 'Jordan'
    //     },
    //     {
    //         value : 'Nike', label : 'Nike'
    //     },
    //     {
    //         value : 'Adidas', label : 'Adidas'
    //     },
    // ]

    // handleChange = (e) => {
    //     console.log(e.value)
    //     axios.get(`${API_URL}/products?brand=${e.value}`)
    //     .then((res) => {
    //         this.setState({
    //             data: res.data
    //         })
    //     })
    // }

    renderCardProduct = () => {
        return this.props.product.map((val) => {
            return(
                <Link to={`/product-detail?id=${val.id}`}>
                    <ProductCard 
                        name={val.name}
                        image={val.image}
                        price={val.price}
                        brand={val.brand}
                        />
                </Link>
            )
        })
    }

    render(){
        if(this.props.error){
            return(
                <div>
                    error
                </div>
            )
        }
        if(this.props.loading){
            return(
                <div className='d-flex justify-content-center'>
                     <Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={300000} //3 secs
      />
                </div>
            )
        }
        return ( 
            <div className='d-flex'>
                <div className='col-2'>
                    {/* <Select options={this.options} onChange={this.handleChange} /> */}
                </div>
                <div  className='col-10'>
                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                        {this.renderCardProduct()}
                    </div>
                </div> 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        product: state.product.productList,
        loading: state.product.loading,
        error: state.product.error

    }
}
 
export default connect(mapStateToProps, {fetchProduct})(ProductsPage);