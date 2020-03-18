import React, { Component } from 'react'
// import Axios from 'axios'
// import { API_URL } from '../Support/API_URL'
import { Button } from 'reactstrap'
import Select from 'react-select';
import { fetchDataById, addToCart,fetchCart } from '../Redux/Action'
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'
import { Link, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2'



class ProductDetail extends Component {
    state = { 
        // data: {},
        sizes: [
            {
                value: 40,
                label: 40
            },
            {
                value: 41,
                label: 41
            },
            {
                value: 42,
                label: 42
            },
            {
                value: 43,
                label: 43
            },
            {
                value: 44,
                label: 44
            },
            {
                value: 45,
                label: 45
            },
        ],
        userSize: ''
    }
    

    componentDidMount(){
        let id = this.props.location.search.split('=')[1]
        console.log(this.props)
        this.props.fetchDataById(id)
        this.props.fetchCart()
        
        // Axios.get(`${API_URL}/products/${id}`)
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
    
    userSize = (e) => {
        console.log('userSize jalan')
        console.log(e.value)
        this.setState({
            userSize : e.value
        })
    }
    
    addToCart = () => {
        if(!this.state.userSize){
            Swal.fire('Berapa ukuran sepatumu?')
        }else{

            let userId = this.props.userId
            let productId = this.props.data.id
            let name = this.props.data.name
            let image = this.props.data.image
            let price = this.props.data.price
            let size = this.state.userSize
            let qty = 1
            
            let cartData = {
                userId,
                productId,
                name,
                price,
                image,
                size,
                qty
            }
            this.props.addToCart(cartData)
        }
    }
        
    render() {
        console.log(this.state.userSize)
        let {data} = this.props
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
            <div  className='row'>
               <div  className='col-6'>
                   <img src={data.image} alt="sepatu" width='500px' ></img>
                </div> 
               <div className='col-4'>
                   <div style={{fontSize:'25pt' , font:'bold'  }} >
                       {data.name}
                   </div>
                   <div style={{fontSize:'20pt' , font:'bold'  }}>
                    {data.brand}
                   </div>
                   <div style={{fontSize:'17pt' , font:'bold'  }}>
                    {data.category}
                   </div>
                   <div>
                    {
                        data.price
                        ?
                        data.price.toLocaleString()
                        :
                        null
                    }
                   </div>
                   <div>
                       <Select ref='size' onChange={this.userSize} options={this.state.sizes} placeholder="Size">
                          
                       </Select>              
                   </div>
                   <br></br>
                   <div >
            
                            <Link to='/cartpage'>
                            <Button onClick={this.addToCart}  className="bi bi-Bucket-fill" width='32'>
                                Add to Cart
                            </Button>
                            </Link>
                       
                        
                   </div>
                </div> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        data : state.product.productById,
        loading: state.product.loading,
        userId: state.auth.id,
        product: state.product.productList
    }
}

export default connect(mapStateToProps, {fetchDataById, addToCart, fetchCart})(ProductDetail)