import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomePage extends Component {

  // Welcome label
  renderLabel() {
  	if (this.props.auth == true) {
  		return (
  			<h2>Welcome</h2>
  		);
  	}
  }

  render() {
    return (
      <div>
        {this.renderLabel()}
        <div>This is the home page route.</div>
      </div>      
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

export default connect(mapStateToProps)(HomePage);
