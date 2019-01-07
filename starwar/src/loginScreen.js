import React from 'react';
import {connect} from 'react-redux';
import {loginuser} from './_actions/loginaction';
import { history } from './history';
import {bindActionCreators} from 'redux';

class loginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            users: [],
            loginUsers : [],
            submitted: false
        };
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'http://swapi.co/api/people'
    
        fetch(proxyUrl + targetUrl).then(res => res.json())
        .then(json => {
            console.log(json.results)
               this.setState({
                loginUsers : json.results,
            })
        });

       // this.listUsers();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
   }

    componentDidMount(){
       
        
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true }); 
        const { username, password,loginUsers } = this.state;
        const filteredUser = loginUsers.some(user =>{
            return (user.name === username && user.birth_year === password)
       })
         
        console.log(filteredUser);
        
        this.setState({loginUser : filteredUser});
      
        if(filteredUser){
            const userDetails = loginUsers.filter(user =>{
                return user.name.indexOf(username) !== -1
            })
            this.props.loginuser(userDetails);
            console.log(userDetails);
            history.push('/search');  
        }
                     
    }

    render(){
        const { username, password, submitted, filteredUser} = this.state;
        
        return (
            <div className="col-md-6 col-md-offset-3">
            <h2>StarWars User Login</h2>
            <form name="form" onSubmit={this.handleSubmit}>
                <div >
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                    {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                </div>
                <div >
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                    {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    {!filteredUser  && submitted &&
                            <div className="help-block">Invalid Username and Password</div>
                        }
               </div>
               <div><p></p></div>
                <div className="form-group">
                    <button className="btn btn-primary">Login</button>
                                        
                </div>
            </form>
        </div>
        );
    }
 }


      function mapDispatchToProps(dispatch) {
        return bindActionCreators({loginuser:loginuser},dispatch)
      }

 //function mapstateToProps(state){
 //    return {
   //      loginusers :state.loginusers
   //  }; 
 //}

 export default connect(null,mapDispatchToProps)(loginScreen);