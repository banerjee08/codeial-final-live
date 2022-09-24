// import React from 'react';
import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  // Link,
  Route,
  Routes,
  // Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchPosts } from '../actions/posts';
import Home from './Home';
import Navbar from './Navbar';
import Page404 from './Page404';

const Login = () => {
  <div>Login</div>;
};

const Signup = () => {
  <div>Signup</div>;
};

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
        <Navbar />
        <Routes>
          {/* <Switch> */}
          {/* <Route
            exact
            path="/"
            render={(props) => {
              return <Home {...props} posts={posts} />;
            }}
          /> */}

          <Route path="/" element={<Home {...this.props} posts={posts} />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Page404 />} />
          {/* </Switch> */}
        </Routes>
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
