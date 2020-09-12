import React from 'react';
import {Row, Col, Button, Collapse, Breadcrumb} from 'react-bootstrap';
import { connect } from "react-redux";
import { login } from '../../../actions/index';
import '@progress/kendo-theme-material/dist/all.css';
import { Input  } from '@progress/kendo-react-inputs';
import Aux from "../../../hoc/_Aux";
import './style1.css';
import SignUpForm from './signupForm';
import { Dialog } from '@progress/kendo-react-dialogs';


function mapDispatchToProps(dispatch) {
  return {
    login: (email, pwd) => dispatch(login(email, pwd))
  };
}
class LoginForm1 extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: "",
      pwd: "",
      submitted: false,
      email_valid:false,
      password_alid:false,
      ptype:"password",
      signup_window : false
    };

   //this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) { 
    this.setState({ 
      [event.target.name]: event.target.value,
      [event.target.name + "_valid"]:event.target.validity.valid
     });
  }
  handleSubmit(event) {
    event.preventDefault();    
    this.setState({ 
      submitted: true      
    });
    this.props.login(this.state.email, this.state.password);
  }
  handlePasswordShow = () => this.setState(({ptype}) => ({
    ptype: ptype === 'text' ? 'password' : 'text'
  }))

  toggle_window = () =>{
    this.setState({ 
      signup_window: !this.state.signup_window
     });
  }
  render() {
    const { email,pwd,submitted } = this.state;
    return (
      <Aux>
                <div className="auth-wrapper">
                    <div className="auth-content">
                            <div >
                                <div className="mb-4 text-center">
                                <i style={{fontSize:"50px",color:"#008bcf"}}  class="fa fa-twitter"></i>
                                </div>
                                <h3 className="mb-4 text-center"><b>Log in to Dwitter</b></h3>
                                <form onSubmit={this.handleSubmit}>
                                  <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>\
                                    <Input 
                                      type={"email"}
                                      name={"email"}
                                      label="Email"
                                      required={true}
                                      onChange={this.handleChange}
                                      style={{width:"100%"}}
                                      autoFocus={true}
                                    />
                                  </div>
                                  <div className={'form-group' + (submitted && !pwd ? ' has-error' : '')}>
                                    <Input 
                                      type={this.state.ptype}
                                      name={"password"}
                                      label="Password"
                                      required={true}
                                      onChange={this.handleChange}
                                      style={{width:"100%"}} 
                                    />
                                    </div>
                                  <Button 
                                  style={{borderRadius:"50px"}}
                                    type="submit" 
                                    variant={ "primary"} 
                                    block 
                                    >Log in                
                                  </Button>
                                    <div onClick={this.toggle_window} className="text-center link" style={{color:"#008bcf",fontWeight:"400",cursor: "pointer"}} variant={'link'}>Sign up for Dwitter</div> 
                                  </form>
                                  {this.state.signup_window && <Dialog width={600} height={700}> 
                                      <div id="basic-collapse">
                                              {<SignUpForm closeDialog={this.toggle_window}/>}
                                      </div>
                                  </Dialog>}
                            </div>
                    </div>
                </div>
            </Aux>
		);
  }
}
const LoginForm = connect(null, mapDispatchToProps)(LoginForm1);

export default LoginForm
