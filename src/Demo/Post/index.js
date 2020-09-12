import React from 'react';
import '@progress/kendo-theme-material/dist/all.css';
import './../../assets/custom_css/button.css';
import './../../assets/custom_css/custom.css';
import "./post.css";
import {Button} from 'react-bootstrap';
import { Avatar } from '@progress/kendo-react-layout';
import { Input  } from '@progress/kendo-react-inputs';
import { authHeader,getEmail} from '../../helper/auth-header';
import { Dialog } from '@progress/kendo-react-dialogs';

class Post extends React.Component {
    tweetlike = process.env.REACT_APP_BASEURL + 'likes/';
    tweetcomment = process.env.REACT_APP_BASEURL + 'comment/'; 
    constructor(props) {
        super(props);
        this.state = {
            commenttext : "",
            tweet_id : this.props.tweet.id,
            comment_window : false,
            show_comment : true,
            allcomments : [],
            showcommentvalue : false
        };
    }
    
    setlike = (event) =>{
        fetch(this.tweetlike, {
            method:"POST",
            headers: authHeader(),
            body: JSON.stringify({
                "email": getEmail(),
                "tweet_id":this.state.tweet_id,
            })
        }).then(response => response.json())
        .then(json => {   
                if (json.status == 'success'){
                    this.props.getTweet();
                }else{
                }
            });
    }
    setComment = (event) =>{
        if (this.state.commenttext.trim() == ""){
            return false
        }
        fetch(this.tweetcomment, {
            method:"POST",
            headers: authHeader(),
            body: JSON.stringify({
                "email": getEmail(),
                "tweet_id":this.state.tweet_id,
                "text" :this.state.commenttext
            })
        }).then(response => response.json())
        .then(json => {  
                if (json.status == 'success'){
                    this.props.getTweet();
                    this.getComment();
                    this.setState({
                        commenttext : ""
                    })
                }else{
                }
            });
    }
    showComment = (event) =>{
        this.setState({
            show_comment : false,
            showcommentvalue : true
        })
    }
    getComment = (event) =>{
        fetch(this.tweetcomment + "?id=" + this.props.tweet.id, {
            method:'get',
              headers: authHeader()
          }).then(response => response.json())
            .then(json => { 
                this.setState({ allcomments : json.data })
            });
    }
    setTweetComment = (event) =>{
        this.setState({
            commenttext : event.target.value
        })
    }
    window_visible = (event) =>{
        this.setState({
            comment_window : !this.state.comment_window
        })
    }
    componentWillMount(){
        this.getComment()
    }
    render() {
        let title = 'Dwitter';
        document.title = title + ' | Feed';
        
        return (
                   
                <div className="post" >
                    <div className="post__avatar">
                    <Avatar shape='circle' type='initials'>{}</Avatar>
                    </div>
                    <div className="post__body">
                        <div className="post__header">
                            <div className="post__headerText">
                                <h3>
                                    <b>{this.props.tweet.name}{" "}</b>
                                        <span className="post__headerSpecial">
                                        @
                                        {this.props.tweet.username}
                                        </span>
                                </h3>
                            </div>
                            <div className="overwrap" className="post__headerDescription">
                                <p className="overwrap">{this.props.tweet.text}</p>
                            </div>
                        </div>
                        <div className="post__footer">
                            <i onClick={this.window_visible} className="fa fa-comment">&nbsp;{this.props.tweet.comment}</i>
                            {this.props.tweet.liked ? <i onClick={this.setlike} style={{paddingLeft:"40px"}} className="fa fa-heart liked" >&nbsp;{this.props.tweet.likes}</i> : <i onClick={this.setlike}style={{paddingLeft:"40px"}} className="fa fa-heart" >&nbsp;{this.props.tweet.likes}</i>}
                        </div>
                        {this.state.comment_window && <Dialog title={"  "} onClose={this.window_visible} width={600} height={400}>
                            <hr></hr> 
                            <div >
                                <div className="post1">
                                    <div className="post__avatar">
                                    <Avatar shape='circle' type='initials'>{}</Avatar>
                                    </div>
                                    <div className="post__body">
                                        <div className="post__header">
                                            <div className="post__headerText">
                                                <h3>
                                                    <b>{this.props.tweet.name}{" "}</b>
                                                        <span className="post__headerSpecial">
                                                        @
                                                        {this.props.tweet.username}
                                                        </span>
                                                </h3>
                                            </div>
                                            <div className="post__headerDescription">
                                                <p>{this.props.tweet.text}</p>
                                            </div>
                                            <div className="post__headerDescription">
                                                {this.state.show_comment && <p onClick={this.showComment}style={{cursor:"pointer",color:"#008bcf"}}>Show all comment</p>}
                                                {this.state.showcommentvalue && this.state.allcomments.map((comment) => (
                                                    <div className="post1">
                                                        <div className="post__avatar">
                                                        <Avatar shape='circle' type='initials'>{}</Avatar>
                                                        </div>
                                                        <div className="post__body">
                                                            <div className="post__header">
                                                                <div className="post__headerText">
                                                                    <h3>
                                                                        <b>{comment.name}{" "}</b>&nbsp;&nbsp;{comment.text} 
                                                                    </h3>
                                                                </div>
                                                            </div> 
                                                        </div>  
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="tweetBox1">
                                    <form>
                                        <div className="tweetBox__input">
                                        <Avatar shape='circle' type='initials'>{}</Avatar>
                                        <Input
                                            onChange={this.setTweetComment}
                                            value={this.state.commenttext}
                                            placeholder="Tweet your reply"
                                            type="text"
                                        />
                                        </div>
                                        <Button
                                        onClick={this.setComment}
                                        type="button"
                                        className="tweetBox__tweetButton"
                                        >
                                        Reply
                                        </Button>
                                    </form>
                                </div>
                            </div>
                            </Dialog>}
                    </div>
                </div>
                    
           
        );
    }
}
export default Post;

