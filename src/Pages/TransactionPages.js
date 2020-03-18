import React, { Component } from 'react'
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { connect } from 'react-redux'
import { fetchTransaction} from '../Redux/Action'

class TransactionPages extends Component {
    state = {
        openModal: false,
        productMap: null
    }



componentDidMount(){
    this.props.fetchTransaction()
    // this.props.transaction.map((val)=>{
    //     console.log(val.productCart)
    //     this.setState({
    //      productMap : val.productCart
    //     })
    
    // })
}

detailTrans = () => {
    this.props.transaction.map((val)=>{
        // console.log(val.productCart)
        let productMap = val.productCart
        productMap.map((par)=>{
            console.log(par.name)
            return(
                <tr>
                    <td>{par.productId}</td>
                    <td>Image</td>
                    <td>Nama</td>
                    <td>Price</td>
                </tr>
            )
        })
    })
}

renderBody = ()=>{
    this.props.transaction.map((val)=>{
        console.log(val.date)
        return(
            <tr>
                <td>{val.id}</td>
                <td>{val.date}</td>
                <td>{val.totalAmount}</td>
                <td>{val.totalAmount}</td>
                <td>
                    <Button>Detail</Button>
                </td>
            </tr>
        )
    })
}

    render() {
        let {openModal} = this.state
        return (
            <div>
                <Modal isOpen={openModal}>
                    <ModalHeader>Transaction Detail</ModalHeader>
                    <ModalBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Product Id</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.detailTrans()}
                                {/* {console.log(this.props.transaction,'ini PRODUCT CART')} */}
                                {/* {console.log(this.state.productMap)} */}
                                {/* {this.props.transaction.map((val)=>{
                                    // console.log(val.productCart)
                                    let productMap = val.productCart
                                    productMap.map((par)=>{
                                        console.log(par.name)
                                        return(
                                            <tr>
                                                <td>{par.productId}</td>
                                                <td>Image</td>
                                                <td>Nama</td>
                                                <td>Price</td>
                                            </tr>
                                        )
                                    })
                                })} */}
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.setState({ openModal: false })}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
                <h4 style={{textAlign:'center'}}>Your Transaction</h4>  
                <Table>
                    <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Date</th>
                        <th>Total Pembelian</th>
                        <th>Harga Total</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {/* {console.log(this.props.transaction,"ayo dong bisa")} */}
                        {this.props.transaction.map((val)=>{
                        console.log(val.date)
                        return(
                         <tr>
                                <td>{val.id}</td>
                                <td>{val.date}</td>
                                <td>{val.totalAmount}</td>
                                <td>{val.totalAmount}</td>
                                <td>
                                    <Button onClick={()=>this.setState({openModal:true})}>Detail</Button>
                                </td>
                         </tr>
                        )
                    })}
                    </tbody>

                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        transaction: state.cart.transaction,
        productCart : state.cart.transaction.productCart

    }
}

export default connect(mapStateToProps,{fetchTransaction})(TransactionPages)

