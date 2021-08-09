import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Profile extends Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			username: ''
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
		.then(data => { 
			this.setState({posts: data.posts, username: data.username});
		})
	}

	render() {
		return (
			<div>
				<div>
					<h1>Profile</h1>
					<h1>Welcome, { this.state.username }</h1>
				</div>
				<div>
					<li style={{ listStyleType: "none" }}><Link to={'./logout'}><button>Logout</button></Link></li>
					<li style={{ listStyleType: "none" }}><Link to={'./createPost'}><button>Create Post</button></Link></li>
				</div>	
				<div>
				{this.state.posts.map(p => 
					<ul key={p.id}>
						<li style={{ listStyleType: "none" }}><Link to={`./updatePost/${p.id}`}><h2>{p.title}</h2></Link></li>
						<li style={{ listStyleType: "none" }}>{p.content}</li>
					</ul> )}
				</div>
			</div>
		);
	}
}

export default Profile;