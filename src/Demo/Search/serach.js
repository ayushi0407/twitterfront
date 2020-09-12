import React from 'react';
import '@progress/kendo-theme-material/dist/all.css';
import './../../assets/custom_css/button.css';
import './../../assets/custom_css/custom.css';
import { Avatar } from '@progress/kendo-react-layout';
import Profile from './../Profile/index'
class Search1 extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    viewUser1 = (event) =>{
        this.props.userView(this.props.user.email)
    }
    
    render() {
        let title = 'Dwitter';
        document.title = title + ' | Search';
        
        return (
           
                <div className="post1">
                    <div className="post__avatar">
                    <Avatar shape='circle' type='initials'>{}</Avatar>
                    </div>
                    <div className="post__body">
                        <div className="post__header">
                            <div className="post__headerText">
                                <h3 onClick={this.viewUser1} style={{cursor : "pointer"}}>
                                    <b>{this.props.user.name}{" "}</b><br></br>
                                        <span className="post__headerSpecial">
                                        @
                                        {this.props.user.username}
                                        </span>
                                </h3>
                            </div>
                        </div>
                    </div>
                    {this.state.new_user && <Profile email={this.props.user.email} />}
                   
                </div>
                                
            
           
        );
    }
}
export default Search1;

