// import React from 'react';
import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  // Link,
  Route,
  Routes,
  // Switch,
  Navigate,
  // loc,
  useLocation,
  useParams,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchPosts } from '../actions/posts';
import Home from './Home';
import Navbar from './Navbar';
import Page404 from './Page404';
import Login from './Login';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import Signup from './Signup';
// const Login = () => {
//   <div>Login</div>;
// };

// const Signup = () => {
//   <div>Signup</div>;
// };

// const Home = (props) => {
//   console.log(props );
//   return <div>Home</div>
// }

var loc = {};
const PrivateRoute = (privateRoutesProps, { children }) => {
  loc = useLocation();
  const { isLoggedIn, component: Component } = privateRoutesProps;
  const params = useParams();

  return isLoggedIn ? <Component params={params} /> : <Navigate to="/login" />;
};

const Settings = () => <div>Settings</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = localStorage.getItem('token');

    if (token) {
      const user = jwtDecode(token);

      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }


  render() {
    const { posts, auth } = this.props;
    const { isLoggedin } = this.props.auth;
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
          <Route
            path="/login"
            element={isLoggedin ? <Navigate to="/" /> : <Login />}
          />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
          {/* <PrivateRoute
            path="/settings"
            element={<Settings />}
            isLoggedin={auth.isLoggedin}
          /> */}
          <Route
            path="/settings"
            element={
              <PrivateRoute isLoggedIn={isLoggedin} component={Settings} />
            }
          />
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
    auth: state.auth,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//   };
// }
export default connect(mapStateToProps)(App);
