import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AppHeader from '../../components/partials/AppHeader';
import { SessionType } from '../../components/propTypes';
import { isAuthenticated } from '../../helpers/auth-helpers';
import getSession from '../../helpers/session-helpers';

const ProjectsCreatePage = ({ session }) => {
  const [tags, setTag] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      beneficiary: '',
      period: 'mon',
      duration: 0,
      executionPlan: ''
    }
  });
  const onSubmitHandler = async (data) => {
    const project = { ...data, tags, createdBy: '5ec5248ce52d3c222ceb84b9' };
    try {
      const response = await axios.post('/api/project', project);
      const responseData = response.data;
      reset();
      setSuccessMessage('Succesfully created project.');
      setTimeout(() => {
        window.location.assign(`/projects/${responseData.id}`);
      }, 1000);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div>
      <AppHeader user={session.user} />
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
              <form name="createProjectForm" onSubmit={handleSubmit(onSubmitHandler)} noValidate>
                <div className="row">
                  <h4>Create project</h4>
                </div>
                <hr />
                <fieldset>
                  <label htmlFor="name">
                    Name <span className="red">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Project name"
                    id="name"
                    name="name"
                    ref={register({ required: true, minLength: 8 })}
                  />
                  <span className="validation-errors">{errors.password && 'Password required.'}</span>
                  <label htmlFor="beneficiary">
                    Beneficiary<span className="red">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Beneficiary"
                    id="beneficiary"
                    name="beneficiary"
                    ref={register({ required: true })}
                  />
                  <span className="validation-errors">{errors.beneficiary && 'Beneficiary is required.'}</span>
                  <div style={{ display: 'inline-flex' }}>
                    <label htmlFor="cost">
                      Project budget/cost<span className="red">*</span>
                      <input
                        type="number"
                        placeholder="1"
                        defaultValue={1}
                        id="cost"
                        name="cost"
                        style={{ width: '20rem' }}
                        ref={register({ required: true })}
                      />
                      <span className="validation-errors">{errors.cost && 'Budget is required.'}</span>
                    </label>
                    <label htmlFor="currency">
                      Currency
                      <br />
                      <select style={{ width: '100%' }} defaultValue="XAF" name="currency" ref={register()}>
                        <option value="XAF"> FCFA </option>
                        <option value="USD"> USD </option>
                      </select>
                    </label>
                  </div>
                  <div style={{ display: 'inline-flex' }}>
                    <label htmlFor="duration">
                      Execution period<span className="red">*</span>
                      <input
                        type="number"
                        placeholder="1"
                        defaultValue={1}
                        id="duration"
                        name="duration"
                        style={{ width: '20rem' }}
                        ref={register({ required: true, min: 1 })}
                      />
                      <span className="validation-errors">{errors.period && 'Duration is required.'}</span>
                    </label>
                    <label htmlFor="currency">
                      <br />
                      <select style={{ width: '100%' }} defaultValue="mon" name="period" ref={register()}>
                        <option value="wks"> Weeks </option>
                        <option value="mon"> Months </option>
                        <option value="yrs"> Years </option>
                      </select>
                    </label>
                  </div>
                  <label htmlFor="description">
                    Description<span className="red">*</span>
                  </label>
                  <textarea
                    cols="30"
                    rows="3"
                    name="description"
                    placeholder="Project details"
                    ref={register({ required: true, minLength: 1 })}
                  ></textarea>{' '}
                  <span className="validation-errors">
                    {errors.description && 'Field is required and must be greater than 100 characters'}
                  </span>
                  <label htmlFor="executionPlan">
                    Execution plan<span className="red">*</span>
                  </label>
                  <textarea
                    cols="30"
                    rows="3"
                    name="executionPlan"
                    ref={register({ required: true, minLength: 100 })}
                  ></textarea>{' '}
                  <span className="validation-errors">
                    {errors.executionPlan && 'Field is required and must be greater than 100 characters'}
                  </span>
                  <div>
                    <label>Tags</label>
                    <input
                      name="tags"
                      onKeyUp={({ keyCode, currentTarget }) => {
                        if (keyCode === 13 || keyCode === 188) {
                          const newTag = currentTarget.value.replace(',', '');
                          setTag(tags.concat(newTag));
                          currentTarget.value = '';
                        }
                      }}
                    />
                    <div className="tags">
                      {tags.map((tag, i) => (
                        <div className="tag" key={`tags${i}`}>
                          <span>{tag}</span>
                          <span className="close"></span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="button-primary" type="submit">
                    Create
                  </button>
                  <button className="button-default" type="reset">
                    Reset
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

ProjectsCreatePage.propTypes = {
  session: SessionType
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);

  if (!isAuthenticated(req)) {
    res.writeHead(302, { location: '/login' });
    res.end();
  }

  return { props: { session } };
};

export default ProjectsCreatePage;
