import React, { Component } from 'react'
import {Button} from 'reactstrap'
import { addToCart } from '../Redux/Action';
import {connect} from 'react-redux'

class AddtoCart extends Component {


 addToCart = (id) => {
    this.props.addToCart(id)
}

    render() {
        return (
            <div className="col-5"> 
            <Button onClick={this.addToCart}  className="bi bi-Bucket-fill" width='32'>
                Add to Cart
            </Button>
            </div>
        )
    }
}

export default connect(null,{addToCart}) (AddtoCart)

