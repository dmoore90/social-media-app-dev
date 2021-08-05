import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
import Profile from './components/Profile.js';
import Logout from './components/Logout.js';
import CreatePost from './components/CreatePost.js';

class App extends Component {
	render() {
		const App = () => (
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
					<Route path="/profile" component={Profile} />
					<Route path="/logout" component={Logout} />
					<Route path="/create_post" component={CreatePost} />
				</Switch>
			</div>
		)
		return (
			<Switch>
				<App />
			</Switch>
		)
	}

}

export default App;