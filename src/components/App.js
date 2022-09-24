// import React from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchPosts } from '../actions/posts';
import { Home, Navbar } from './';

const Login = () => {
  <div>Login</div>
}

const Signup = () => {
  <div>Signup</div>
}

// const Home = (props) => {
//   console.log(props );
//   return <div>Home</div>
// }

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
        
          <Route exact path="/" render={(props) => {
            return <Home {...props} posts={posts} />
          }
          } />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
