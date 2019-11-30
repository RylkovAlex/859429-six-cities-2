import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Header from '../header/header.jsx';
import withInputsState, {validator} from '../hocs/withInputsState/withInputsState';
import {Operation} from '../../redux/actions/action-creator/action-creator.js';

const SignIn = ({setInput, inputValues, logIn}) => {
  return (
    <div className="page page--gray page--login">
      <Header/>
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
                  onChange = {(evt) => setInput(`email`, evt.target.value)}
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
                  onChange = {(evt) => setInput(`password`, evt.target.value)}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled = {!(inputValues.password && inputValues.email)}
                onClick = {(evt) => {
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
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
};

SignIn.propTypes = {
  setInput: PropTypes.func.isRequired,
  inputValues: PropTypes.object.isRequired,
  logIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logIn: (authData) => dispatch(Operation.fetchAuthData(authData)),
});

export default connect(null, mapDispatchToProps)(
    withInputsState(
        SignIn,
        [`email`, `password`],
        {
          'email': [validator.EMAIL],
          'password': [validator.REQUIED]
        }
    )
);
