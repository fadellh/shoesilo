import React, { Component } from 'react'
// import Axios from 'axios'
// import { API_URL } from '../Support/API_URL'
import { Button } from 'reactstrap'
import Creatable from 'react-select/creatable';
import { fetchDataById } from '../Redux/Action'
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'



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
        ]
    }

    componentDidMount(){
        let id = this.props.location.search.split('=')[1]
        console.log(id)
        this.props.fetchDataById(id)

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

    render() {
        let {data} = this.props
        // if(this.props.error){
        //     return(
        //         <div>
        //             error
        //         </div>
        //     )
        // }
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
            <div  className="shoesBack" className='row'>
               <div className="shoesBack" className='col-5'>
                   <img src={data.image} alt="sepatu" width='600px' ></img>
                </div> 
               <div className='col-4'>
                   <div>
                    {data.name}
                   </div>
                   <div>
                    {data.brand}
                   </div>
                   <div>
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
                       <Creatable options={this.state.sizes}>
                          
                       </Creatable>              
                   </div>
                   <div>
                       <Button className="bi bi-Bucket-fill" width='32'>
                           Add to Cart
                       </Button>
                   </div>
                </div> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        data : state.product.productById,
        loading: state.product.loading
    }
}

export default connect(mapStateToProps, {fetchDataById})(ProductDetail)