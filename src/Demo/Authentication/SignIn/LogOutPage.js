import { Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { history } from '../../../helper/history';
import { authHeader } from '../../../helper/auth-header';

class LogoutPage extends Component {
  componentWillMount() {    
    fetch(process.env.REACT_APP_BASEURL + "logout/" , {
      method:'post',
      headers: authHeader(),
  }).then(response => response.json())
  .then(json => {      
      if(json.status == "success") {
          //alert("success")
          localStorage.removeItem('user');    
          history.push('/');
          window.location.reload(true);
      } 
      else{
          localStorage.removeItem('user');    
          history.push('/');
          window.location.reload(true);
      }  
  });
  }

  render() {
    return null
  }
}

export default withRouter(connect()(LogoutPage))