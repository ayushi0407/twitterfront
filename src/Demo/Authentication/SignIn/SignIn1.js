import React from 'react';
import { connect } from 'react-redux';
import './../../../assets/scss/style.scss';
import './style1.css';
import Aux from "../../../hoc/_Aux";
import LoginForm from "./LoginForm";
import { history } from '../../../helper/history';
import { alertActions } from '../../../actions/alertActions';


class SignUp2 extends React.Component {
    
    constructor(props) {
        super(props);
      
        let checking = localStorage.getItem('user') ? 'login' : 'No login' ;

        if( checking == 'login'){
          
          history.push('/');
          window.location.reload(true);
        }
        
        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }
    render () {
        const { alert } = this.props;
        return(
            <Aux>
                <React.Fragment>
                    <link href='https://fonts.googleapis.com/css?family=Noto Sans' rel='stylesheet' />  

                
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                       
                    <LoginForm />
                </React.Fragment>
            </Aux>
                        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const SignUp1 = connect(mapState, actionCreators)(SignUp2);

export default SignUp1;