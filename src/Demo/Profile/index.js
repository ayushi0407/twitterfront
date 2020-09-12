import React from 'react';
import '@progress/kendo-theme-material/dist/all.css';
import './../../assets/custom_css/button.css';
import './../../assets/custom_css/custom.css';
import { authHeader,getEmail} from '../../helper/auth-header';
import Post from '../Post/index';
import {Button} from 'react-bootstrap';


class Profile extends React.Component { 
    profileurl = process.env.REACT_APP_BASEURL + 'profile/?email='+this.props.email +"&myemail="+getEmail();
    tweetpost =  process.env.REACT_APP_BASEURL + "profile/tweet/?email="+this.props.email +"&myemail="+getEmail(); 
    followurl = process.env.REACT_APP_BASEURL + 'follow/' 
    constructor(props) {
        super(props);
        this.state = {
            name :"",
            email :"",
            username :"",
            tweets : "",
            following :"",
            follower :"",
            selected: 0,
            tweetlist : [] ,
            myprofile : false,
            follow : ""
            // freshuser : true,
        };
    }
    getTweet = (event) => {
        fetch(this.tweetpost , {
            method:'get',
            headers: authHeader()
        }).then(response => response.json())
        .then(json => {
            if (json.data.length > 0){
                this.setState({
                    freshuser : undefined})
            }
            this.setState({
                tweetlist : json.data})
        })
    }
    handleSelect = (e) => {
        this.setState({selected: e.selected})
    }
    getProfileData =(event) =>{
        fetch(this.profileurl , {
            method:'get',
              headers: authHeader()
          }).then(response => response.json())
            .then(json => { 
                this.setState({
                    name : json.data[0].name,
                    email : json.data[0].email,
                    username : json.data[0].username,
                    tweets : json.data[0].tweetcount,
                    following : json.data[0].following,
                    follower : json.data[0].follower,
                    follow : json.data[0].follow,
                })
            });
    }
    componentWillMount(){
       
        if (this.props.email ==  getEmail()){
            this.setState({ myprofile : true })
        }else{
            this.setState({ myprofile : false })
        }
            this.getProfileData()
            this.getTweet()
    }
    sendFollow =(event) =>{
        fetch(this.followurl, {
            method:"POST",
            headers: authHeader(),
            body: JSON.stringify({
                "user_by": getEmail(),
                "user_to":this.state.email,
            })
        }).then(response => response.json())
        .then(json => {   
                if (json.status == 'success'){
                        alert(json.message)
                        this.getProfileData()
                }else{
                    alert(json.message)
                }
            });
    }
    setting = (event) =>{
        this.props.setting()
    }
    render() {
        let title = 'Dwitter';
        document.title = title + ' | Profile';
        
        return (
           
                <div style={{width: "50%"}} className="feed">
                    <div className="feed__header post">
                        <h6 style={{cursor:"pointer"}}>
                            <i onClick={this.setting} style={{fontSize:"30px",color:"#008bcf",paddingRight: "20px"}} className="feather icon-arrow-left"/>
                        </h6>
                        <h4>
                            <b>{this.state.name}{" "}</b><br></br>
                                <span className="post__headerSpecial">
                                    {this.state.tweets} Tweets
                                </span>
                        </h4>
                        {this.state.myprofile ?"":<Button
                        onClick={this.sendFollow}
                        type="submit"
                        className="tweetBox__tweetButton"
                        >
                        {this.state.follow ? "Followed" : "Follow"}
                        </Button>}
                    </div>
                    <div style={{backgroundColor:"#DCDCDC",height:"200px"}}>
                    </div>
                    <div style={{padding:"10px"}}>
                        <h4>
                            <div>
                            <b>{this.state.name}{" "}</b><br></br>
                                <span className="post__headerSpecial">
                                    @{this.state.username} 
                                </span>
                            </div>   
                        </h4>
                        
                    </div>
                    <div style={{paddingLeft:"10px",fontWeight:"600"}}>
                        <h6>
                            <b>{this.state.follower}</b> Follower &nbsp;&nbsp;<b>{this.state.following}</b> Following
                        </h6>
                    </div>
                    <hr></hr>
                    <div>
                        {this.state.freshuser ? 
                        <div >
                            <h4 style={{textAlign:"center",paddingTop:"30px",fontWeight:"3000",fontSize:"20px"}}><b>No tweets yet</b></h4>
                            {/* This is the best place to see what’s happening in your world. Find some people and topics to follow now. */}
                            </div> 
                            : 
                            <div>
                            {this.state.tweetlist.map((tweet) => (
                                <Post getTweet={this.getTweet} tweet={tweet}/>
                                ))}
                            </div>}
                    </div>   
                    
                </div>
                
           




            
            
            
            
        );
    }
}
export default Profile;

