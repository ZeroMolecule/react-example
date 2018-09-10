import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getAuth } from 'store/auth';
import Auth from 'models/Auth';
import { paths } from 'routes';

class PrivateRoute extends PureComponent {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  };

  render () {
    const {component: Component, auth, ...rest} = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          auth.isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: paths.signIn(),
                state: {from: props.location}
              }}
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps)(PrivateRoute);
