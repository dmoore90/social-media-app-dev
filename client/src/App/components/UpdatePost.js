import { Component } from 'react';

class UpdatePost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			content: ''
		};

    	this.componentDidMount = this.componentDidMount.bind(this);
   		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		fetch(`http://localhost:3000/getPost/${id}`, {credentials: 'include'})
			.then(res => res.json())
			.then(post => { this.setState(post)})
	}

	handleChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value })
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch('http://localhost:3000/postUpdate', {
			method: 'POST',
			withCredentials: 'true',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if (res.status === 200) {
				return this.props.history.push('/profile')
			}
		})
		.catch(err => {
			console.log(err);
		})
	}

	handleDelete(event) {
		event.preventDefault();
		fetch('http://localhost:3000/deletePost', {
			method: 'POST',
			withCredentials: 'true',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if (res.status === 200) {
				return this.props.history.push('/profile');
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
					<h1>Update Post</h1>
				</div>
				<div>
					<form onSubmit={this.handleSubmit}>
						<input type="hidden" name="id" value={this.state.id} onChange={this.handleChange} />
						<label>title:</label>
						<li><input type="text" name="title" value={this.state.title} onChange={this.handleChange} /></li>
						<label>content:</label>
						<li><input type="text" name="content" value={this.state.content} onChange={this.handleChange} /></li>
						<input type="submit" value="submit"/>
					</form>
				</div>
				<div>
					<form onSubmit={this.handleDelete}>
						<input type="hidden" name="id" value={this.state.id} />
						<input type="submit" value="delete" />
					</form>
				</div>
			</div>
		);
	}
}

export default UpdatePost;