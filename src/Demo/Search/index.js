import React from 'react';
import '@progress/kendo-theme-material/dist/all.css';
import './../../assets/custom_css/button.css';
import './../../assets/custom_css/custom.css';
import { Input  } from '@progress/kendo-react-inputs';
import { authHeader,getEmail} from '../../helper/auth-header';
import "./search.css";
import Search1 from './serach'
import Profile from './../Profile/index'

class Search extends React.Component { 
    search = process.env.REACT_APP_BASEURL + 'search/';
    constructor(props) {
        super(props);
        this.state = {
            searchvalue : "",
            data : [] , 
            freshuser : true,
            new_user : false,
            new_user_email : ""
        };
    }
    handleChange = (event) =>{
        this.setState({
            searchvalue : event.target.value
        });
        this.searchUser(event.target.value)
    }
    searchUser = (value) => {
        fetch(this.search + "?text=" + value, {
            method:'get',
            headers: authHeader()
        }).then(response => response.json())
        .then(json => {
            if (json.data.length > 0){
                this.setState({
                    freshuser : undefined})
            }else{
                this.setState({
                    freshuser : true})
            }
            this.setState({
                data : json.data})
        })
    }
    userView = (value) =>{
        this.setState({
            new_user : true,
            new_user_email : value

        })
    }
    componentWillMount(){
        this.searchUser(this.state.searchvalue)
    }
    setting = (event) =>{
        this.props.setting()
        this.setState({
            new_user : false
        })
    }
    render() {
        let title = 'Dwitter';
        document.title = title + ' | Search';
        
        return (
            <div style={{width: "50%"}} className="feed">
                {this.state.new_user ?  <Profile setting={this.setting}email={this.state.new_user_email} /> :
                <div>
                <div className="feed__header">
                    <Input type="name" style={{width: "80%"}} onChange={this.handleChange} value={this.state.searchvalue} placeholder="Search Dittwer"/>
                </div>
               <div>
                    {this.state.freshuser ? 
                        <div style={{padding:"10px"}}>
                            <h4 style={{textAlign:"center",paddingTop:"30px",fontWeight:"3000",fontSize:"20px"}}>No user found</h4>
                        </div> 
                        : 
                        <div>
                            {this.state.data.map((user) => (
                                <Search1 userView={this.userView} user={user}></Search1>
                                ))}
                        </div>}
                </div>
                </div>}
            </div>
            
           
        );
    }
}
export default Search;

