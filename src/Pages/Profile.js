import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {connect} from 'react-redux'
import Axios from 'axios';
import { API_URL } from '../Support/API_URL';

export class Profile extends Component {
    componentDidMount(){

    }

    changePass = () =>{
        let username = this.username.value
        let passwordLama = this.passwordLama.value;
        let passwordBaru = this.passwordBaru.value;
        let confirmPass = this.confirmPass.value;

        if(passwordBaru === confirmPass){
            Axios.get(`${API_URL}/users?password=${passwordLama}&username=${username}`)
            .then((res) => {
                console.log(res)
                if(res.data.length > 0){
                    Axios.patch(`${API_URL}/users/${res.data[0].id}`,{password: passwordBaru})
                    .then((res)=>{
                        console.log(res)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            window.alert('Invalid Password')
        }

    }
    render() {
        {console.log(this.props.auth)}
        return (
            <div className='d-flex justify-content-center' style={{height : '100vh', alignItems : 'center'}}>
            <Form>
                <h4>CHANGE PASSWORD</h4>
                {/* <FormGroup >
                    <Label for="exampleEmail">Email</Label>
                    <Input type="text" name="email" id="exampleEmail" placeholder="with a placeholder" />      
                </FormGroup> */}
                <FormGroup>
                      <Label for="exampleEmail">Username</Label>
                      <Input type="text" name="email" id="exampleEmail" placeholder="Username" innerRef={(username) => this.username = username}/>
                    </FormGroup>
                <FormGroup>
                      <Label for="examplePasswordLama">Password Lama</Label>
                      <Input type="password" name="passwordLama" id="examplePasswordLama" placeholder="Password Lama" innerRef={(passwordLama) => this.passwordLama = passwordLama}/>
                </FormGroup>
                <FormGroup>
                      <Label for="examplePasswordBaru">Password Baru</Label>
                      <Input type="password" name="passwordBaru" id="examplePasswordBaru" placeholder="Password Baru" innerRef={(passwordBaru) => this.passwordBaru = passwordBaru}/>
                </FormGroup>
                <FormGroup>
                      <Label for="examplePassword">Confirm Password Baru</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="Password Baru" innerRef={(confirmPass) => this.confirmPass = confirmPass}/>
                 </FormGroup>
                 <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <Button onClick={this.changePass}>
                        Confirm 
                    </Button>
                 </div>
            </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        auth: state.auth.logged
    }
}

export default connect(mapStateToProps)(Profile)
