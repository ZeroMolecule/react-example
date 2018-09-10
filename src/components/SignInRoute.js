import React, { PureComponent } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'api/firebase';
import { paths } from 'routes';
import { connect } from 'react-redux';
import { authFulfilled, authRejected, getAuth } from 'store/auth';
import get from 'lodash/get';
import { Redirect } from 'react-router-dom';

class SignInRoute extends PureComponent {
  constructor (props) {
    super(props);

    this.uiConfig = {
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: this.onSignInSuccess,
        signInFailure: this.onSignInFailure,
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ]
    };
  }

  onSignInSuccess = (data) => {
    const {authFulfilled} = this.props;
    authFulfilled(get(data, 'user.providerData[0]', null));
  };

  onSignInFailure = (e) => {
    this.props.authRejected(e);
  };

  render () {
    const {auth, location} = this.props;
    const {from} = location.state || {from: {pathname: paths.index()}};

    if (auth.isAuthenticated()) {
      return <Redirect to={from}/>;
    }

    return (
      <div className="base-page sign-in-route">
        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: getAuth(state),
});

const mapDispatchToProps = dispatch => ({
  authFulfilled: (data) => dispatch(authFulfilled(data)),
  authRejected: (e) => dispatch(authRejected(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInRoute);

