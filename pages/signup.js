import axios from 'axios';
import { applySession } from 'next-session';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AppHeader from '../components/partials/AppHeader';
import { isAuthenticated } from '../helpers/auth-helpers';
import { sessionOptions } from '../middlewares/Session';

const SignUpPage = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false
    }
  });
  const onSubmitHandler = (user) => {
    // if terms
    if (user.password !== user.confirmPassword) {
      errors.confirmPassword = true;
      return false;
    }
    return axios({
      method: 'POST',
      url: '/api/user/signup',
      data: user,
      validateStatus: () => true
    })
      .then((response) => {
        if (response.status === 200) {
          reset();
          setSuccessMessage('Successfully created project.');
          setTimeout(() => router.push(`/user`), 1000);
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
          <div className="row r-section">
            <div className="column column-40">
              <form name="createAccount" onSubmit={handleSubmit(onSubmitHandler)} noValidate>
                <div className="row">
                  <h4>Create an Account</h4>
                </div>
                <hr />
                <fieldset>
                  <label htmlFor="name">
                    Name <span className="red">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    name="name"
                    ref={register({ required: true, minLength: 3 })}
                  />
                  <span className="validation-errors">
                    {errors.name && 'Name is required and must be greater than 3 characters'}
                  </span>
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
                  <span className="validation-errors">{errors.email && 'Email must be valid'}</span>
                  {/* <div className="row">
                            <div className="column">
                              <label htmlFor="town">Town <span className="red">*</span></label>
                              <input type="text" placeholder="Town" id="town"/>
                            </div>
                            <div className="column">
                              <label htmlFor="tel">Phone Number <span className="red">*</span></label>
                              <input type="text" placeholder="Tel" id="tel"/>
                            </div>
                          </div> */}
                  <label htmlFor="password">
                    Password <span className="red">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Your Password"
                    id="password"
                    name="password"
                    ref={register({ required: true, minLength: 8 })}
                  />
                  <span className="validation-errors">
                    {errors.password && 'Password is required and minimum length is 8.'}
                  </span>
                  <label htmlFor="password">
                    Confirm Password <span className="red">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Re-Enter Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    ref={register({ required: true })}
                  />
                  <span className="validation-errors">{errors.confirmPassword && 'Must match password'}</span>
                  <div className="float-left">
                    <input type="checkbox" id="terms" name="terms" ref={register({ required: true })} />
                    <span className="validation-errors">{errors.terms && 'This must be checked.'}</span>
                    <label className="label-inline" htmlFor="terms">
                      {' '}
                      Agree to terms and conditions
                    </label>{' '}
                    <br />
                  </div>
                  <button className="button-primary" type="submit" value="Send">
                    Create Account
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  await applySession(req, res, sessionOptions);

  if (isAuthenticated(req)) {
    res.writeHead(302, { location: '/' });
    res.end();
  }

  return {};
};

export default SignUpPage;
