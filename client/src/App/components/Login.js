import React, { Component } from 'react';
import '../../static/styles.css'

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
			<div className="wrapper">

				<div className="title">
					<div>Login</div>
				</div>
			
				<div class="list-container">
					<form onSubmit={this.handleSubmit}>
				    	<label>username:</label>
				    	<div><input type="text" name="username" value={this.state.username} onChange={this.handleChange} /></div>
				    	<label>password</label>
				    	<div><input type="text" name="password" value={this.state.password} onChange={this.handleChange} /></div>
				    	<input type="submit" value="submit" />
					</form>
				</div>
			
			</div>					
		)
	}
}

export default Login;