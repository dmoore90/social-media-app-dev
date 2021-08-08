import { Component } from 'react';

class CreatePost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			content: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch('http://localhost:3000/createPost', {
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
			} else {
				const error = new Error(res.error);
				throw error;
			}
		})
		.catch(err => {
			console.log(err);
			return this.props.history.push('/profile');
		})
	}

	render() {
		return (
			<div>
				<div>
					<h1>Create Post</h1>
				</div>
				<div>
					<form onSubmit={this.handleSubmit}>
						<label>title:</label>
						<li><input type="text" name="title" value={this.state.title} onChange={this.handleChange} /></li>
						<label>content:</label>
						<li><input type="text" name="content" value={this.state.content} onChange={this.handleChange} /></li>
						<input type="submit" value="submit"/>
					</form>
				</div>
			</div>
		);
	}
}

export default CreatePost;
