import React, { Component } from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import '../Containers/App.css';
import ErrorBoundry from '../Components/ErrorBoundry';

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots : [],
			searchfield: ''
		}
	}

	onSearchChange =(event) => {
	  this.setState({searchfield: event.target.value});
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=>response.json())
		.then(users =>this.setState({robots : users}))
	}

	render() {
	    const filterRobots = this.state.robots.filter(robots => {
	      		return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
	    })

	    if (this.state.robots.length === 0) {
	    	return <h1 className='tc'> Loading... </h1>
	    } 
	    else {
	    	return(
		 	<div className='tc'> 
		 	  <h1 className='f1'>Robofriends</h1>
		 	  <SearchBox searchChange = {this.onSearchChange} />
		 	  <Scroll>
		 	    <ErrorBoundry>
		 	  	  <CardList robots = {filterRobots} />
		 	  	</ErrorBoundry>
		 	  </Scroll>
		 	</div> 
 			);
	    }
	}
}

export default App;