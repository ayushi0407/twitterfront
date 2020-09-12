import React from 'react';
import {Row, Col, Collapse, Breadcrumb} from 'react-bootstrap';
// import '@progress/kendo-theme-material/dist/all.css';
// import './../../assets/custom_css/button.css';
// import './../../assets/custom_css/custom.css';
import "./feed.css";
import {Button} from 'react-bootstrap';
import { Avatar } from '@progress/kendo-react-layout';
import { Input  } from '@progress/kendo-react-inputs';
import { authHeader,getEmail} from '../../helper/auth-header';
import Post from '../Post/index'
import './../../assets/images/user/avatar-1.jpg'


class Feed extends React.Component { 
    tweetpost = process.env.REACT_APP_BASEURL + 'tweet/';
    constructor(props) {
        super(props);
        this.state = {
            tweetMessage : "",
            tweets : [] ,
            freshuser : true,
        };
    }
    setTweetMessage = (event) =>{
        this.setState({
            tweetMessage : event.target.value
        })
    }
    sendTweet = (event) => {
        if (this.state.tweetMessage.trim() == ""){
            return false
        }
        
        fetch(this.tweetpost, {
            method:"POST",
            headers: authHeader(),
            body: JSON.stringify({
                "email": getEmail(),
                "message":this.state.tweetMessage,
            })
        }).then(response => response.json())
        .then(json => { 
                if (json.status == 'success'){
                    this.setState({
                        tweetMessage : ""
                    }) 
                }else{
                    alert(json.message)
                }
            });
        this.getTweet() 
    }
    getTweet = (event) => {
        fetch(this.tweetpost + "?email=" + getEmail(), {
            method:'get',
            headers: authHeader()
        }).then(response => response.json())
        .then(json => {
            if (json.data.length > 0){
                this.setState({
                    freshuser : undefined})
            }
            this.setState({
                tweets : json.data})
        })
    }
    componentWillMount(){
       this.getTweet()
    }
    render() {
        let title = 'Dwitter';
        document.title = title + ' | Feed';
        
        return (
            <div style={{width: "50%"}}className="feed">
                <div className="feed__header">
                    <h2 >Home</h2>
                </div>
                <div className="tweetBox">
                    <form>
                        <div className="overwrap" className="tweetBox__input">
                        <Avatar shape='circle' type='initials'>{}</Avatar>
                        <Input 
                            onChange={this.setTweetMessage}
                            value={this.state.tweetMessage}
                            placeholder="What's happening?"
                            type="text"
                        />
                        </div>
                        <Button
                        onClick={this.sendTweet}
                        type="submit"
                        className="tweetBox__tweetButton"
                        >
                        Tweet
                        </Button>
                    </form>
                </div>
               <div>
                    {this.state.freshuser ? 
                        <div style={{padding:"10px",textAlign:"center"}}>
                            <h4  style={{textAlign:"center",paddingTop:"30px",fontWeight:"3000",fontSize:"20px"}}><b>Welcome to Twitter!</b></h4>
                            </div> 
                        : 
                        <div>
                            {this.state.tweets.map((tweet) => (
                                <Post getTweet={this.getTweet}tweet={tweet}/>
                                ))}
                        </div>}
                </div>
            </div>
        );
    }
}
export default Feed;

