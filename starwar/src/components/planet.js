import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class planet extends Component {
   
      render(){
        const selectedPlanet = this.props.planet.planet;

      return(
        <div id="main" className="w-100">
          <div class="row">
        <div class="col-xs-4">
        <Link className="btn btn-primary btn-lg" to="/search">Back To Search</Link>
        </div>
        
          <div className="page-header col-md-6 col-md-offset-3"><h2>Planet Details</h2></div>
        <div className="col-md-6 col-md-offset-3">
          <div>
          <div class="search-list">
               
                <table class="table" id="myTable">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                               
                    <tr>
                        <td>Name</td>
                        <td>{selectedPlanet.name}</td>
                    </tr>
                    <tr>
                        <td>Gravity</td>
                        <td>{selectedPlanet.gravity}</td>
                    </tr>
                    <tr>
                        <td>TClimate</td>
                        <td>{selectedPlanet.climate}</td>
                    </tr>
                    <tr>
                        <td>Population</td>
                        <td>{selectedPlanet.population}</td>
                    </tr>
                    <tr>
                        <td>Diameter</td>
                        <td>{selectedPlanet.diameter}</td>
                    </tr>
                    <tr>
                        <td>Surface Water</td>
                        <td>{selectedPlanet.surface_water}</td>
                    </tr>
                    <tr>
                        <td>Rotation Period</td>
                        <td>{selectedPlanet.rotation_period}</td>
                    </tr>
                    <tr>
                        <td>Orbital Period</td>
                        <td>{selectedPlanet.orbital_period}</td>
                    </tr>
                   
                    </tbody>
                </table>

            </div>
        </div>
        </div>
         </div>
         </div>
      );
    }
}

function mapstateToProps(state){
    return {
      planet :state.planetReducer
       
    }; 
}

export default connect(mapstateToProps)(planet);