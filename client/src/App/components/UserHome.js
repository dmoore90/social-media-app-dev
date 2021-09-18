import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../static/styles.css'

class UserHome extends Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			current_user: []

		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/userHome', {credentials: 'include'})
		.then(res => {
			if (res.status === 200) {
				return res.json()
			} else {
				return this.props.history.push('/')
			}
		})
		.then(indata => { 
			this.setState({
				posts: indata.posts,
				current_user: indata.cuser
			});
			console.log(this.state)
		})
	}

	render() {
		return (
			<div className="wrapper">
				
				<div className="title">
					<div>{ this.state.current_user.first_name + " " + this.state.current_user.last_name}</div>
				</div>

				<div className="nav">
					<div><Link to={'./logout'}><button>Logout</button></Link></div>
					<div><Link to={'./createPost'}><button>Create Post</button></Link></div>
				</div>	
				
				<div className="posts">
					{this.state.posts.map(p => 
						<div key={p.id}>
							<Link to={`./updatePost/${p.id}`}><h2>{p.title}</h2></Link>
							<div>{p.content}</div>
							<br />
							<div>{p.user.first_name + " " + p.user.last_name}</div>
						</div> 
					)}
				</div>
			
			</div>
		);
	}
}

export default UserHome;