import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const withAuth = (Component) => {
  const WithAuth = ({isAuthorized}, ...props) => {
    if (isAuthorized) {
      return <Component {...props}/>;
    }
    return <Redirect to = "/login"/>;
  };

  WithAuth.propTypes = {
    isAuthorized: PropTypes.bool
  };
  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
    isAuthorized: !!state.user,
  });
  return connect(mapStateToProps, null)(WithAuth);
};

export default withAuth;
