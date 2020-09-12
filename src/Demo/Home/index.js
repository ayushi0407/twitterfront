import React from 'react';
import '@progress/kendo-theme-material/dist/all.css';
import './../../assets/custom_css/button.css';
import './../../assets/custom_css/custom.css';
import { getEmail} from '../../helper/auth-header'
import Feed from "./../Feed/index";
import Profile from './../Profile/index'
import Search from './../Search/index'
import "./home.css";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag1 : "active",
            flag2 : undefined,
            flag3 : undefined,
            homepage :true,
            profilepage : false,
            explorepage : false,
        };
    }

    setHome = (event) =>{
       this.setState({
            flag1 : "active",
            flag2 : undefined,
            flag3 : undefined,
            homepage :true,
            profilepage : false,
            explorepage : false,
       })
    }
    setProfile = (event) =>{
        this.setState({
            flag1 : undefined,
            flag2 : "active",
            flag3 : undefined,
            homepage : false,
            profilepage : true,
            explorepage : false,
       })
    }
    setExplore = (event) =>{
        this.setState({
            flag1 : undefined,
            flag2 : undefined,
            flag3 : "active",
            homepage :false,
            profilepage : false,
            explorepage : true,
       })
    }
    render() {
        let title = 'Dwitter';
        document.title = title + ' | home';
        
        return (
               
            <div className="app">
            
                <div className="sidebar">
                    <div className="sidebar__twitterIcon">
                        <i style={{fontSize:"100px"}}className="fa fa-twitter"></i>
                    </div>
                    <div className={`sidebarOption ${this.state.flag1 && "sidebarOption--active"}`} >
                        &nbsp;&nbsp;<i style={{fontSize:"40px"}} className="fa fa-home"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <h2 className={`sidebarOption ${this.state.flag1 && "sidebarOption--active"}`} style={{fontSize:"30px"}} onClick={this.setHome}>Home</h2>
                     </div><br></br>
                    <div className={`sidebarOption ${this.state.flag2 && "sidebarOption--active"}`}>
                        &nbsp;&nbsp;<i style={{fontSize:"40px"}} className="fa fa-user"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;<h2 className={`sidebarOption ${this.state.flag2 && "sidebarOption--active"}`} style={{fontSize:"30px"}} onClick={this.setProfile}>Profile</h2>
                    </div><br></br>
                    <div className={`sidebarOption ${this.state.flag3 && "sidebarOption--active"}`}>
                        &nbsp;&nbsp;<i style={{fontSize:"40px"}} className="fa fa-search"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <h2 className={`sidebarOption ${this.state.flag3 && "sidebarOption--active"}`} style={{fontSize:"30px"}}onClick={this.setExplore}>Explore</h2>
                    </div><br></br>
                    <div className="sidebarOption">
                        &nbsp;&nbsp;<i style={{fontSize:"40px"}} className="fa fa-sign-out"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href={"/logout"}> 
                        <h4 style={{fontSize:"30px"}}><b>Logout</b></h4></a>
                    </div>
                </div>
                
                
                {this.state.homepage && <Feed />}
                {this.state.profilepage && <Profile setting={this.setHome} email={getEmail()}/>}
                {this.state.explorepage && <Search setting={this.setExplore}/>}
               
            </div>
           
        );
    }
}
export default Home;

