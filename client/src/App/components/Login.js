import React, { Component } from 'react';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value })
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch('http://localhost:3000/login', {
			method: 'POST',
			withCredentials: true,
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if (res.status === 200) {
				this.props.history.push('/profile');
			} else {
				this.props.history.push('/');
			}
		})
		.catch(err => {
			console.log(err);
		})
	}

	render() {
		return (
			<div>
				<div>
					<h1>Login</h1>
				</div>
				<div>
					<form onSubmit={this.handleSubmit}>
				    	<label>username:</label>
				    	<li><input type="text" name="username" value={this.state.username} onChange={this.handleChange} /></li>
				    	<label>password</label>
				    	<li><input type="text" name="password" value={this.state.password} onChange={this.handleChange} /></li>
				    	<input type="submit" value="submit" />
					</form>
				</div>
			</div>					
		)
	}
}

export default Login;