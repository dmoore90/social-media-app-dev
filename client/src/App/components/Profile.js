import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Profile extends Component {
	constructor() {
		super();
		this.state = {
			list: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/profile', {credentials: 'include'})
		.then(res => {
			if (res.status === 200) {
				return res.json()
			} else {
				return this.props.history.push('/')
			}
		})
		.then(list => this.setState({ list }))
	}

	render() {
		return (
			<div>
				<div>
					<h1>Profile</h1>
				</div>
				<div>
					<li style={{ listStyleType: "none" }}><Link to={'./logout'}><button>Logout</button></Link></li>
					<li style={{ listStyleType: "none" }}><Link to={'./createPost'}><button>Create Post</button></Link</li>
				</div>	

			</div>
		);
	}
}

export default Profile;