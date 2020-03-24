import React, { Component } from 'react'
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { connect } from 'react-redux'
import { fetchTransaction} from '../Redux/Action'
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'

class TransactionPages extends Component {
    state = {
        openModal: false,
        productMap: null,
        modalReady: false,
        renderModal: []
        
    }



componentDidMount(){
    let token = localStorage.getItem('token')
        let userId = JSON.parse(token)
        this.props.fetchTransaction(userId.id)

}


totalqty = (qtytotal) => {
   var output = null
    qtytotal.forEach((par)=>{
        output = output + par.qty
    })
    return(
        <td>{output}</td>
    )
}

detailTrans = (id) => {
    let tempatDetail = []
    console.log(this.props.transaction[id])
   let object = this.props.transaction[id] 
   console.log(object.productCart)
   this.setState({
       renderModal: object.productCart
   })
            
}

// renderBody = ()=>{
//     this.props.transaction.map((val)=>{
//         console.log(val.date)
//         return(
//             <tr key={val.id}>
//                 <td>{val.id}</td>
//                 <td>{val.date}</td>
//                 <td>{val.totalAmount}</td>
//                 <td>{val.totalAmount}</td>
//                 <td>
//                     <Button>Detail</Button>
//                 </td>
//             </tr>
//         )
//     })
// }

    render() {
        // let {openModal} = this.state
        return (
            <div>
                <Modal isOpen={this.state.openModal} >
                    <ModalHeader>Transaction Detail</ModalHeader>
                    <ModalBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Product Id</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Size</th>
                                    <th>Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {console.log(this.state.renderModal)}
                                {this.state.renderModal.map((val)=>{
                                   return(
                                       <tr>
                                           <td>{val.id}</td>
                                           <td>
                                               <img src={val.image} alt={val.name} height='50'>
                                               </img>
                                            </td>
                                           <td>{val.name}</td>
                                           <td>Rp. {val.price.toLocaleString()}</td>
                                           <td>{val.size}</td>
                                           <td>{val.qty}</td>
                                       </tr>
                                   )
                                })}
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => {
                            this.setState({ openModal: false })
                            }}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
                <h4 style={{textAlign:'center'}}>Your Transaction</h4>  
            
                <Table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Total Pembelian</th>
                        <th>Harga Total</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {/* {console.log(this.props.transaction,"ayo dong bisa")} */}
                        {/* render body */}
                        {this.props.transaction.map((val)=>{
                        console.log(val.date)
                        return(
                         <tr>
                                <td>{val.id}</td>
                                <td>{val.date}</td>
                                {this.totalqty(val.productCart)}
                                <td>Rp. {val.totalAmount.toLocaleString()}</td>
                                <td>
                                    <Button onClick={()=>{

                                        this.detailTrans(val.id-1)
                                        this.setState({openModal:true})
                                        }}>
                                        Detail
                                    </Button>
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

