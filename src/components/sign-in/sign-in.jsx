import React from "react";
import PropTypes from "prop-types";
import {Link, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

import Header from "../header/header.jsx";
import withInputsState from "../../hocs/with-inputs-state/withInputsState";
import {Operation} from "../../redux/actions/action-creator/action-creator.js";

const SignIn = ({setInput, inputValues, logIn, user}) => {
  if (user) {
    return <Redirect to="/"/>;
  }
  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required=""
                  onChange={(evt) => setInput(`email`, evt.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required=""
                  onChange={(evt) => setInput(`password`, evt.target.value)}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={!(inputValues.password && inputValues.email)}
                onClick={(evt) => {
                  evt.preventDefault();
                  logIn(inputValues);
                }}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to="/" className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

SignIn.propTypes = {
  setInput: PropTypes.func.isRequired,
  user: PropTypes.object,
  inputValues: PropTypes.object.isRequired,
  logIn: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  logIn: (authData) => dispatch(Operation.sendAuthData(authData))
});

export {SignIn};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withInputsState(SignIn, [`email`, `password`], {
      email: {
        email: true
      },
      password: {
        required: true
      }
    })
);
