import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  render() {
    return (
      <div>
        <div>
          <h1>Home</h1>
        </div>
        <div>
            <li style={{ listStyleType: "none" }}><Link to={'./register'}><button>Register</button></Link></li>
            <li style={{ listStyleType: "none" }}><Link to={'./login'}><button>Login</button></Link></li>   
        </div>
      </div>      
    );
  }

}

export default Home;