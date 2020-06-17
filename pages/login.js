import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AppHeader from '../components/partials/AppHeader';
import { isAuthenticated } from '../helpers/auth-helpers';
import getSession from '../helpers/session-helpers';

const LoginPage = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const router = useRouter();
  const onSubmitHandler = (user) => {
    axios({
      method: 'POST',
      url: '/api/user/login',
      data: user,
      validateStatus: () => true
    })
      .then((response) => {
        if (response.status === 200) {
          // const newAccount = response.data;
          // jsCookie.set('user', newAccount);
          reset();
          setSuccessMessage('Successful logged in.');
          setTimeout(() => router.push(`/user/home`), 1000);
        } else {
          setErrorMessage(response.data.message);
        }
      })
      .catch((error) => {
        setErrorMessage(error.data.message);
      });
  };

  return (
    <div>
      <AppHeader />
      <section className="mt-4">
        <div className="container">
          <div className="row r-section">
            <div className="column column-40">
              <div
                className="alert-box"
                style={{
                  background: errorMessage ? '#ff0000ad' : '#32cd32a1',
                  display: errorMessage || successMessage ? 'block' : 'none'
                }}
              >
                {errorMessage ? (
                  <div className="error">
                    <span>{errorMessage}</span>
                  </div>
                ) : null}
                {successMessage ? (
                  <div className="success">
                    <span>{successMessage}</span>
                  </div>
                ) : null}
              </div>
              <form name="login" onSubmit={handleSubmit(onSubmitHandler)} noValidate>
                <div className="row">
                  <h4>Login to your Account</h4>
                </div>
                <hr />
                <fieldset>
                  <label htmlFor="email">
                    Email <span className="red">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    name="email"
                    ref={register({
                      required: true,
                      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}
                  />
                  <span className="validation-errors">{errors.email && 'Email required'}</span>
                  <label htmlFor="password">
                    Password <span className="red">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Your Password"
                    id="password"
                    ref={register({ required: true, minLength: 8 })}
                    name="password"
                  />
                  <span className="validation-errors">{errors.password && 'Password required.'}</span>
                  <button className="btn button-primary" type="submit" value="Send">
                    Login
                  </button>
                  <div className="example-send-yourself-copy">
                    <p>
                      Forgot Password? click <a href="#">here</a>
                    </p>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

LoginPage.propTypes = {};

export const getServerSideProps = async ({ req, res }) => {
  await getSession(req, res);

  if (isAuthenticated(req)) {
    res.writeHead(302, { location: '/' });
    res.end();
  }

  return { props: {} };
};

export default LoginPage;
