import React, { Component } from 'react';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			username: '',
			password: '',
			pass_confirmation: ''
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
		fetch('http://localhost:3000/register', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if (res.status === 200) {
				return this.props.history.push('/')
			} else {
				console.log("error")
				return this.props.history.push('/')
			}
		})
		.catch(err => console.log(err));
	}

	render() {
		return (
			<div>
				<div>
					<h1>Register</h1>	
				</div>
				<div>
			      <form onSubmit={this.handleSubmit}>
			    	<label>first name:</label>
			    	<li><input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} /></li>
			    	<label>last_name:</label> 
			    	<li><input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} /></li>
			    	<label>email:</label>
			    	<li><input type="text" name="email" value={this.state.email} onChange={this.handleChange} /></li>
			    	<label>username:</label>
			    	<li><input type="text" name="username" value={this.state.username} onChange={this.handleChange} /></li>
			        <label>password:</label>
			        <li><input type="text" name="password" value={this.state.password} onChange={this.handleChange} /></li>
			        <label>password confirmation:</label>
			        <li><input type="text" name="pass_confirmation" value={this.state.pass_confirmation} onChange={this.handleChange} /></li>
			        <input type="submit" value="Submit" />
			      </form>
				</div>
			</div>
		)
	}
}

export default Register;