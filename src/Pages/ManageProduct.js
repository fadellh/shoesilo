import React, { Component } from 'react'
import { Table, Button, Input} from 'reactstrap'
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'
import Swal from 'sweetalert2'

export default class ManageProduct extends Component {
    state = { 
        data: [],
        selectId: null,
        confirmId: null
     }

     fetchData =() =>{
        Axios.get(`${API_URL}/products`)
        .then((res)=> {
            this.setState({
                data: res.data  
            })
            console.log(res.data)
            console.log(this.state.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    componentDidMount(){
            Axios.get(`${API_URL}/products`)
            .then((res)=> {
                this.setState({
                    data: res.data  
                })
                console.log(res)
                console.log(this.state.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    
  renderBody = () =>{
       return this.state.data.map((val)=>{
           if(val.id === this.state.selectId){
               return(
                   <tr>
                       <td>{val.id}</td>
                       <td>
                           <Input defaultValue={val.name} innerRef={(editName) => this.editName = editName}/>
                       </td>
                       <td>
                           <Input defaultValue={val.brand} innerRef={(editBrand) => this.editBrand = editBrand}/>
                       </td>
                       <td>
                           <Input defaultValue=
                            {
                                val.price
                                    ?
                                val.price.toLocaleString()
                                    :
                                    null
                             } 
                            type='number' innerRef={(editPrice) => this.editPrice = editPrice}/>
                       </td>
                       <td>
                           <Input defaultValue={val.category} innerRef={(editCategory) => this.editCategory = editCategory}/>
                       </td>
                       <td>
                           <Input defaultValue={val.image}  innerRef={(editImage) => this.editImage = editImage}/>
                       </td>
                       <td>

                       <Button color="danger" className='m-2' onClick={() => this.setState({selectId : null})}>
                            Cancel
                       </Button>
                       </td>
                       <td>
                       <Button color="primary" className='m-2' onClick={() => this.confirmEdit(val.id)} >
                            Save
                       </Button>
                       </td>
                   </tr>
               )
           }
            return(
                <tr>
                        <td>{val.id}</td>
                        <td>{val.name}</td>
                        <td>{val.brand}</td>
                        <td>
                            {
                                val.price
                                    ?
                                val.price.toLocaleString()
                                    :
                                    null
                            }
                        </td>
                        <td>{val.category}</td>
                        <td>
                            <img src={val.image} alt={val.name} height='100'></img>
                        </td>
                        <td>
                        <Button color="success" onClick={()=> this.selectEdit(val.id)}>Edit</Button>{' '}
                        </td>
                        <td>
                        <Button color="danger" onClick={()=>this.deleteData(val.id, val.image)}>Delete</Button>{' '}
                        </td>
                    
                </tr>
            )
        })
    }

    deleteData = (id, image) => {
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            // imageUrl: this.state.data.find((val)=> val.id == id).image,
            imageUrl: image,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                Axios.delete(`${API_URL}/products/${id}`)
                .then((res)=>{
                    console.log(res.data)
                    this.fetchData()
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
    
    selectEdit = (id) => {
        this.setState({
            selectId: id
        })
    }

    confirmEdit = (id) => {
        let name = this.editName.value
        let brand = this.editBrand.value
        let price = parseInt(this.editPrice.value)
        let category = this.editCategory.value
        let image = this.editImage.value

        Axios.put(`http://localhost:2000/products/${id}`, { name, brand, price, category, image })
        .then((res) => {
            console.log(res)
            this.setState({selectId:null})
            this.fetchData()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderInput = () =>{
        return(
            <tfoot>
                <td></td>
                <td><Input placeholder='Name' innerRef={(name) => this.name = name}/></td>
                <td><Input placeholder='Brand' innerRef={(brand) => this.brand = brand}/></td>
                <td><Input type="number"placeholder='Price' innerRef={(price) => this.price = price}/></td>
                <td>
                    <Input type='select' innerRef={(category) => this.category = category}>
                        <option>Men</option>
                        <option>Women</option>
                        <option>Kids</option>
                    </Input>
                </td>
                <td><Input placeholder='Image' innerRef={(image) => this.image = image}></Input></td>
                <td>
                    <Button color='primary' onClick={this.addProduct}>
                        Add Product
                    </Button>{' '}
                    {/* <Button color='cancel'>
                        Cancel 
                    </Button> */}
                </td>
            </tfoot>
        )
    }
    
    addProduct = () => {
        console.log(this.image.value)
        let name = this.name.value
        let brand = this.brand.value
        let price = parseInt(this.price.value)
        let category = this.category.value
        let image = this.image.value
        let productData = {
            name,
            brand,
            price,
            category,
            image
        }

        Axios.post(`${API_URL}/products`,productData)
        .then((res)=>{
            console.log(res)
            Axios.get(`${API_URL}/products`)
            .then((res)=> {
                this.setState({
                    data: res.data  
                })
                console.log(res.data)
                console.log(this.state.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render() {
        // let {id, name, brand, price, category, image } = this.state.data
        return (
            <div>
              <Table >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nama</th>
                        <th>Brand</th>
                        <th>Proce</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th colSpan='2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                   {this.renderBody()}
                </tbody>
                   {this.renderInput()}
                </Table>
                        </div>
         )
        }
    }
