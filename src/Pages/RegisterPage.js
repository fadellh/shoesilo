import React, { Component } from 'react';
import { Input, FormGroup, Label, Form, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../Support/API_URL';
import { connect } from 'react-redux';
import { Login } from '../Redux/Action';

class LoginPage extends Component {
    state = { 
        inputUser: {
            Username : '',
            char : false,
            num: false,
            show: false
        }
     }

    handleChange = (e) =>{
        let pass = e.target.value
        // let num = /[0-9]/
        // console.log(pass)
        if(pass.length<8){
            window.alert('harus lebih dari 8')
            return(
                <div>
                    password harus lebih dari 8
                </div>
            )
        }
        // if(pass == )
        // this.setState({
        //     char: ,
        //     // num : pass.test(num)
        // })
    }
    
    onBtnRegister = () => {
        let username = this.username.value;
        let email = this.email.value;
        let password = this.password.value;
        let confirmPass = this.confirmPass.value;

        if(password === confirmPass){
            axios.get(`${API_URL}/users?username=${username}`)
            .then((res) => {
                if(res.data.length > 0){
                    window.alert('Username already exists')
                }else{
                    axios.post(`${API_URL}/users`, {
                        username,
                        email, 
                        password,
                        role : 'user'
                    })
                    .then((res) => {
                        console.log(res.data)
                        let { username , email, role, id } = res.data;
                        this.props.Login({
                            username,
                            email,
                            role,
                            id
                        })
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            window.alert('Invalid Password')
        }
    }

    render() { 
        let {char,num,show} = this.state.inputUser
        if(this.props.logged){
            return(
                <Redirect to='/'/>
            )
        }
        return ( 
            <div className='d-flex justify-content-center' style={{height : '100vh', alignItems : 'center'}}>
                {console.log(this.state.inputUser.char)}
                <Form style={{width : '400px', height: '400px'}}>
                    <FormGroup>
                      <Label for="exampleEmail">Username</Label>
                      <Input type="text" name="email" id="exampleEmail" placeholder="Username" innerRef={(username) => this.username = username}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Email</Label>
                      <Input type="text" name="password" id="examplePassword" placeholder="Email" innerRef={(email) => this.email = email} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="Password" innerRef={(password) => this.password = password} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Confirm Password</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="Password" innerRef={(confirmPass) => this.confirmPass = confirmPass}/>
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button onClick={this.onBtnRegister}>
                            Register
                        </Button>
                        <Link to='/login'>
                            <Button>
                                Login
                            </Button>
                        </Link>
                    </div>
                </Form>
                    {/* {
                        // console.log(char, 'INI CHAR')
                        show
                        ?
                        char?window.alert('yeay'):window.alert('oker')
                        :null
                    } */}
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return{
        logged : state.auth.logged
    }
}
 
export default connect(mapStatetoProps, {Login} )(LoginPage);