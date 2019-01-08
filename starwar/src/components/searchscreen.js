import React, { Component } from 'react';
import {connect} from 'react-redux';
import { history } from '../history';
import {searchaction} from '../_actions/searchaction';
import {logout} from '../_actions/logoutaction';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

class searchscreen extends Component {
    constructor(props){
        super(props);
        this.state = {
          planets: [],
          counter :0,
          userDisable:false
        }
        ;
      }

componentDidMount(){
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'http://swapi.co/api/planets'

    fetch(proxyUrl + targetUrl).then(res => res.json())
    .then(json => {
           this.setState({
            planets : json.results,
        })
    });
}

onChange = e =>{
    this.setState({search : e.target.value});
    this.setState({
        counter:this.state.counter+1
    })
    if(this.state.counter > 15 && (this.props.loginuser.user[0].name != 'Luke Skywalker')){
        this.state.userDisable = true;
        document.getElementById("input").disabled = true;
    }

    let timerId = setTimeout(() => {
        if(this.state.userDisable === true && this.state.counter > 2){
            this.state.userDisable = false;
            document.getElementById("input").disabled = false;
            this.state.counter=0;
          
        }
    }, 1000*60);

}

onClick(planet){
this.props.searchaction(planet);
history.push('/planet');  
}

    render(){
                
        const {planets,search} = this.state;
        const filteredplanets = planets.filter(planet =>{
            if( planet.name.indexOf(search) != -1){
                return planet
            }
        })
        const sortPlanets = filteredplanets.sort(function(a,b){
            return a.population > b.population ? 1 : a.population < b.population ? -1 : 0;
        })
        var i=0;
        sortPlanets.forEach(p => {
            p.size = (i+20);
             i=i+5;
          });
             
        return (
         <div>
        <div class="row">
        <div class="col-xs-4">
        <Link className="btn btn-primary btn-lg" to="/" onClick={() => this.props.logout()}>Logout</Link>
        </div>
        </div>
             <h3>Welcome {this.props.loginuser.user[0].name}</h3>
              <div className="search">
              
              <div className="search__title"><h3>Search by Planets </h3></div>
              
              <div class="active-pink-4 mb-4">
              <input id="input" disabled={this.state.userDisable} class="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.onChange}
                  autoFocus></input>
               {this.state.userDisable &&
                            <div className="help-block">{this.props.loginuser.user[0].name} cannot search more than 15 times in a minute.Try after one minute..</div>
                        }  
                <div>
                <div>
      
            {sortPlanets.map(planet => {
            const inlinestyle = {
                fontSize: planet.size
            }
          
          return (
              
            <div key={planet.name}>
              <div><span style={inlinestyle} onClick={() => this.onClick(planet)}>{planet.name}</span></div>
            </div>
          )
        })}
      </div>
                </div>
              </div>
            </div>
           
            </div>
          );
        };
    }

    function mapstateToProps(state){
        return {
             loginuser :state.userReducer
           
        }; 
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({searchaction:searchaction,logout:logout},dispatch)
      }


    export default connect(mapstateToProps,mapDispatchToProps)(searchscreen);