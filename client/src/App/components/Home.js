import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../static/styles.css'

class Home extends Component {

  render() {
    return (
      <div class="wrapper">
        
        <div className="title">
          <div>Home</div>
        </div>

        <div class="list-container">
            <div><Link to={'./register'}><button>Register</button></Link></div>
            <div><Link to={'./login'}><button>Login</button></Link></div>   
        </div>
      
      </div>      
    );
  }

}

export default Home;