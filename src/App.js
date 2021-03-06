import React, { Component } from 'react';
import canyon from './assets/boulderCanyon.jpg';
import Header from './Header';
import Filter from './Filter';
import ListContainer from './ListContainer';
// import './Master.scss';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      areas: {},
      distances: [],
      filterAreas: [],
      filterTypes: []
    }
  }

  componentDidMount() {  
    fetch('http://whateverly-datasets.herokuapp.com/api/v1/coloradoClimbingAreas')
        .then(response => response.json())
        .then(climbingData => this.setState({areas: climbingData.coloradoClimbingAreas}))
        .catch(error => {throw new Error(error)})

  }

  updateFromFilter = (areas, types) => {
    this.setState({
      filterAreas: areas,
      filterTypes: types
    })
  }

  handleSearch = (value) => {
    console.log(value)
    this.setState({filterAreas: value, filterTypes: []})
  }

  render() {
      return (
        <div className="App">
            <Header className="header" search={this.handleSearch}/>
            <Filter climb={this.state.areas}
                    updateFromFilter={this.updateFromFilter}/>
            <ListContainer filterAreas={this.state.filterAreas} 
                            areasAndRoutes={this.state.areas} 
                            filterTypes={this.state.filterTypes}/>
        </div>
      );
    }
  }
