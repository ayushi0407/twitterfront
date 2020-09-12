import { history } from './../../../helper/history';
import React from 'react';
import {Row, Col,Form, Button} from 'react-bootstrap';
import '@progress/kendo-theme-material/dist/all.css';
import './../../../assets/custom_css/button.css';
import './../../../assets/custom_css/custom.css';
import './../../../assets/custom_css/kendo_multiselect_fix.css';
import { authHeader } from './../../../helper/auth-header';
import { Input} from '@progress/kendo-react-inputs';

class SignUpForm extends React.Component {
    signupurl = process.env.REACT_APP_BASEURL + 'users/';
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            phonenumber:"",
            password: "",
            confirmpassword: "",
            errormessage : "",
        }
    }
    componentWillMount(){
    }
    resetState = () =>{
        this.setState ({
            firstname: '',
            lastname: '',
            email: '', 
            phonenumber:'',
            password: '', 
            errormessage : "", 
        })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value});
    }
    handleSubmit = (event) => {
        if (this.state.firstname == "" || this.state.lastname == "" || this.state.email == "" || this.state.phonenumber == "" || this.state.password == "" || this.state.confirmpassword == ""){
            this.setState({
                errormessage : "Please fill all the fields"
            })
            return false
        }
        if (this.state.password === this.state.confirmpassword){
            fetch(this.signupurl, {
                method: "POST",
                headers: authHeader(),
                body: JSON.stringify({
                    "firstname":this.state.firstname,
                    "lastname":this.state.lastname,
                    "email":this.state.email,                             
                    "phonenumber":this.state.phonenumber,
                    "password":this.state.password,
                })
            }).then(response => response.json())
            .then(json => {
                    if (json.status == 'success'){
                        this.props.closeDialog();
                        this.resetState();
                        alert(json.message)
                        
                    }
                    else{
                        this.setState({
                            errormessage : json.message
                        })
                    }
                });
                
        }else{
            this.setState({
                errormessage : "Unmatched Password"
            })
            return false
        }
    }
    
    render() {      
        return (
            <Form  id="signupForm"> 
                <div className="mb-4 text-center">
                    <i style={{fontSize:"40px",color:"#008bcf"}}  className="fa fa-twitter"></i>
                </div>
                <Row>
                    <Col sm={1}></Col><Col sm={10}><h6 style={{color : "red"}}>{this.state.errormessage}</h6></Col><Col sm={1}></Col>
                </Row>
                <Row>
                    <Col sm={1}></Col><Col sm={10}><h4><b>Create your account</b></h4></Col><Col sm={1}></Col>
                </Row>
                <Row>
                    <Col sm={1}></Col><Col sm={10}>
                        <Form.Group controlId="formBasicName">
                            <Input
                                name="firstname"
                                type="name"                    
                                label="FirstName"
                                onChange={this.handleChange}
                                value={this.state.firstname}
                                style={{width:"100%"}}
                                />
                            </Form.Group>
                    </Col><Col sm={1}></Col>
                </Row>
                <Row>
                    <Col sm={1}></Col><Col sm={10}>
                        <Form.Group controlId="formBasicName">
                            <Input
                                name="lastname"
                                type="name"                    
                                label="LastName"
                                onChange={this.handleChange}
                                value={this.state.lastname}
                                style={{width:"100%"}}
                                />
                            </Form.Group>
                    </Col><Col sm={1}></Col>
                </Row>
                <Row>
                    <Col sm={1}></Col><Col sm={10}>
                        <Form.Group controlId="formBasicEmail">
                            <Input
                                id="email"
                                name="email"
                                type="email"                    
                                label="Email"
                                onChange={this.handleChange}
                                value={this.state.email}
                                style={{width:"100%"}}
                                />
                            </Form.Group>
                    </Col><Col sm={1}></Col>
                </Row>
                <Row>
                    <Col sm={1}></Col><Col sm={10}>
                        <Form.Group controlId="formBasicPhone">
                            <Input
                                id="phonenumber"
                                type="tel"
                                pattern="[0-9]{10}"
                                name="phonenumber"              
                                label="Phone Number"
                                minLength={10}
                                validationMessage={"Please enter a valid 10 digit phonenumber"}
                                onChange={this.handleChange}
                                value={this.state.phonenumber}
                                style={{width:"100%"}}
                                />
                            </Form.Group>
                    </Col><Col sm={1}></Col>
                </Row>
                <Row>
                    <Col sm={1}></Col><Col sm={10}>
                        <Form.Group >
                            <Input 
                                id="password"
                                type="password"
                                name="password"              
                                label="Password"
                                onChange={this.handleChange}
                                value={this.state.password}
                                style={{width:"100%"}}
                                />
                                {/* <div className="help-block">Password is required</div> */}
                            </Form.Group>
                    </Col><Col sm={1}></Col>
                </Row>
                <Row>
                    <Col sm={1}></Col><Col sm={10}>
                        <Form.Group >
                            <Input 
                                id="confirmpassword"
                                type="password"
                                name="confirmpassword"              
                                label="Confirm Password"
                                onChange={this.handleChange}
                                value={this.state.confirmpassword}
                                style={{width:"100%"}}
                                />
                            </Form.Group>
                    </Col><Col sm={1}></Col>
                </Row>
                <br></br>
                <Row>
                    <Col sm={1}></Col>
                    <Col sm={10}>
                        <h6 style={{fontSize:"13px",fontWeight:"20"}}>By signing up,you agree to the Terms and Service and Privacy Policy,including Cookies use. Others will be able to finf you by email when provided.</h6>
                    </Col>

                </Row>
                <Row>
                    <Col sm={1}></Col>
                    <Col sm={10} style={{ float:"right"}}  >
                        <Button variant="primary" type="button" onClick={this.handleSubmit} value="Submit" style={{ borderRadius:"50px",width: "100%" }}>
                            Save
                        </Button>
                    </Col> 
                </Row> 
           </Form>
        );
    }
}
           

export default SignUpForm;
// className={(submitted && !password ? ' has-error' : '')}