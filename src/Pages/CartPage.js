import React, {Component} from 'react'
import {Table, Button} from 'reactstrap'
import {connect} from 'react-redux'
import {fetchCart, addTransaction, endCart} from '../Redux/Action'
import Loader from 'react-loader-spinner'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'



class CartPage extends Component {
    state = {
       qty: 1,
       grandTotal: null
    }  

    componentDidMount(){
        this.props.fetchCart()
        
        console.log(this.props.fetchCart(),'data udh keambil')
        console.log(this.props.cart, 'ini cart awal')
    }


deleteCart = (id, image) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        // imageUrl: this.state.data.find((val)=> val.id == id).image,
        imageUrl: image,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
            Axios.delete(`${API_URL}/cart/${id}`)
            .then((res)=>{
                console.log(res.data)
                this.props.fetchCart()
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
             ) 
            })
            .catch((err)=>{
                console.log(err)
            })
        }
      })
}

renderGrandTotal = () => {
    let qtyArr = []
    let priceArr = []
    let jumlah = 0
    let total = 0
    let userId = this.props.user.id
    console.log(userId)

    this.props.cart.map((val) =>{
        qtyArr.push(val.qty)
        priceArr.push(val.price)
    })
    for(var i=0; i<qtyArr.length;i++){
        jumlah=qtyArr[i]*priceArr[i]
        total += jumlah
    }
    // Axios.post(`${API_URL}/transaction/`,{total})
    // .then((res)=>{
    //     // console.log(res)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })
    return (
        <td>{total.toLocaleString()}</td>
    )
}

nambah = (userIdC,productIdC,nameC,imageC,sizeC,priceC,id,qtyInc) => {
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
            this.props.fetchCart()
        })
        .catch((err) => {
            console.log(err)
        })
}
decrement = (userIdC,productIdC,nameC,imageC,sizeC,priceC,id,qtyInc) => {    
        let userId = userIdC
        let productId = productIdC
        let name = nameC
        let image = imageC
        let price = priceC
        let size = sizeC
        let qty = qtyInc-1
    Axios.put(`http://localhost:2000/cart/${id}`, {userId,productId,name,price,image,size,qty}  )
    .then((res) => {
            console.log(res)
            this.props.fetchCart()
        })
        .catch((err) => {
            console.log(err)
        })
    
}


render(){
    if(this.props.error){
        return(
            <div>
                ERROR
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
     timeout={3000} //3 secs
  />
            </div>
        )
    }
    console.log(this.props.cart, 'ini cart remder')
    return (
        <div >
        <Table>
        <thead>
            <tr>
            <th>Images</th>
            <th>Name</th>
            <th>Size</th>
            <th colspan='3' >Qty</th>
            <th>Price</th>
            <th>Action</th>
            <th></th>
            </tr>
        </thead>
        <tbody>

            {this.props.cart.map((val)=>{
                return(
                    <tr>
                        <td><img src={val.image} alt={val.name} height='100'></img></td>
                        <td>{val.name}</td>
                        <td>{val.size}</td>
                        <td>
                          <Button color='danger' onClick={()=>this.decrement(val.userId,val.productId,val.name,val.image,val.size,val.price,val.id,val.qty)}>-</Button>
                        </td>
                        <td>{val.qty}</td>
                        <td>
                          <Button color='success' onClick={()=>this.nambah(val.userId,val.productId,val.name,val.image,val.size,val.price,val.id,val.qty)}>+</Button>
                        </td>
                        
                        {/* <td>{val.price}</td> */}
                        <td>{val.price.toLocaleString()}</td>
                        <td>
                            <Button color='danger' onClick={()=>this.deleteCart(val.id,val.image)}>Delete</Button>
                        </td>
                        <td></td>
                    </tr>
                    )
            })}
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <h4>Grand Total</h4>
                </td>
                <td>{this.renderGrandTotal()}</td>
                <td>
                    <Button onClick={this.checkout=()=>{
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your cart has been saved',
                            showConfirmButton: false,
                            timer: 1500
                          })
                        let qtyArr = []
                        let priceArr = []
                        let jumlah = 0
                        let total = 0
                        // let userId = this.props.user.id
                        // console.log(userId)

                        this.props.cart.map((val) =>{
                            qtyArr.push(val.qty)
                            priceArr.push(val.price)
                        })
                        for(var i=0; i<qtyArr.length;i++){
                            jumlah=qtyArr[i]*priceArr[i]
                            total += jumlah
                        }
                          //Jika sudah berhasil data Cart Hilang
                        let kosong = []
                        let username = this.props.user.username 
                        let userId = this.props.user.id
                        let totalAmount = total
                        //   let userId = this.props.cart.userId
                        //   let productId = this.props.cart.productId
                        //   let name = this.props.cart.name
                        //   let image = this.props.cart.image
                        //   let price = this.props.cart.price
                        //   let size = this.props.cart.size
                        //   let qty = this.props.cart.qty
                        let productCart = this.props.cart
                        var month = new Date().getMonth() + 1; //Current Month
                        var day = new Date().getDate()
                        var year = new Date().getFullYear(); //Current Year
                        var date = year + "/" + month + "/" + day
                        console.log(this.props.cart)
                        console.log(this.props.user)

                        let transactionData = {
                              username, userId, productCart, totalAmount, date
                        }

                        this.props.addTransaction(transactionData)
                        //Hilangan transaction

                        }}>
                        Checkout
                    </Button>
                    </td>
            </tr>
        </tfoot>
        </Table>
        <br/>
        <br/>
    </div>
    )
}
}


const mapStateToProps = (state) => {
    return{
        data : state.product.productById,
        cart : state.cart.cart,
        loading: state.cart.loading,
        error: state.cart.error,
        count: state.count,
        user: state.auth

    }
}

export default connect(mapStateToProps, {fetchCart,addTransaction,endCart})(CartPage)
