import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../static/styles.css'

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			username: '',
			first_name: '',
			last_name: ''
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
			this.setState({
				posts: data.posts, 
				username: data.username, 
				first_name: data.first_name,
				last_name: data.last_name
			});
			console.log(this.state);
		})
	}

	render() {
		return (
			<div className="wrapper">
				
				<div className="title">
					<div>{ this.state.first_name + " " + this.state.last_name}</div>
				</div>

				<div className="nav">
					<div><Link to={'./logout'}><button>Logout</button></Link></div>
					<div><Link to={'./createPost'}><button>Create Post</button></Link></div>
				</div>	
				
				<div className="posts">
					{this.state.posts.map(p => 
						<div key={p.id}>
							<Link to={`./updatePost/${p.id}`}><h2>{p.title}</h2></Link>
							{p.content}
						</div> 
					)}
				
				</div>
			
			</div>
		);
	}
}

export default Profile;