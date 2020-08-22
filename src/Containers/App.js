import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import '../Containers/App.css';
import ErrorBoundry from '../Components/ErrorBoundry';

import {setSearchField } from '../actions';

const mapStateToProps = (state) => {
	return {
		searchField: state.searchField
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value))
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots : [],
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=>response.json())
		.then(users =>this.setState({robots : users}))
	}

	render() {
		const {searchField, onSearchChange } = this.props;
	    const filterRobots = this.state.robots.filter(robots => {
	      		return robots.name.toLowerCase().includes(searchField.toLowerCase());
	    })

	    if (!(this.state.robots.length)) {
	    	return <h1 className='tc'> Loading... </h1>
	    } 
	    else {
	    	return(
		 	<div className='tc'> 
		 	  <h1 className='f1'>Robofriends</h1>
		 	  <SearchBox searchChange = {onSearchChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);