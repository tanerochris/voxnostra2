import axios from 'axios';
import mongoose from 'mongoose';
import { applySession } from 'next-session';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AppHeader from '../../components/partials/AppHeader';
import { SessionUserType } from '../../components/propTypes';
import { sessionOptions } from '../../middlewares/Session';

const ProjectsEditPage = ({ project, session }) => {
  const [tags, setTag] = useState(project.tags || []);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: '',
      description: '',
      beneficiary: '',
      period: 'mon',
      duration: 0,
      executionPlan: '',
      ...project
    }
  });

  const onSubmitHandler = async (data) => {
    const updateData = { ...data, tags };
    try {
      const response = await axios.put(`/api/projects/${project.id}`, updateData);
      const responseData = response.data;
      setSuccessMessage('Succesfully created project.');
      setTimeout(() => {
        window.location.assign(`/projects/${responseData.id}`);
      }, 1000);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <AppHeader user={session.user} />
      <Head>
        <link href="/style.css" rel="stylesheet" />
      </Head>
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
        <legend className="header">
          <span>Edit project</span>
        </legend>
        <fieldset className="form-items">
          <div className="input-item">
            <label>
              Name <br />
              <input
                placeholder="Project name"
                name="name"
                defaultValue={project.name}
                ref={register({ required: true, minLength: 3 })}
              />
              <br />
              <span className="validation-errors">
                {errors.name && 'Field is required and must be greater than 3 characters'}
              </span>
            </label>
          </div>
          <div className="input-item">
            <label>
              Beneficiary
              <br />
              <input
                placeholder="Enter item"
                name="beneficiary"
                defaultValue={project.beneficiary}
                ref={register({ required: true })}
              />
              <br />
              <span className="validation-errors">{errors.beneficiary && 'Field is required.'}</span>
            </label>
          </div>

          <div className="input-item" style={{ display: 'inline-flex' }}>
            <label>
              Budget/Cost
              <br />
              <input
                placeholder="1"
                type="number"
                style={{ width: '90%' }}
                name="cost"
                defaultValue={project.cost}
                ref={register({ required: true, min: 1 })}
              />{' '}
              <br />
              <span className="validation-errors">
                {errors.cost && 'Field is required and must be greater than 0.'}
              </span>
            </label>
            <label>
              <br />
              <select style={{ width: '100%' }} defaultValue={project.beneficiary} name="currency" ref={register()}>
                <option value="XAF"> FCFA </option>
                <option value="USD"> USD </option>
              </select>
            </label>
          </div>
          <div className="input-item" style={{ display: 'inline-flex' }}>
            <label>
              Execution period
              <br />
              <input
                placeholder="1"
                type="number"
                style={{ width: '90%' }}
                name="duration"
                defaultValue={project.duration}
                ref={register({ required: true, min: 1 })}
              />{' '}
              <br />
              <span className="validation-errors">
                {errors.duration && 'Field is required and must be greater than 0.'}
              </span>
            </label>
            <label>
              <br />
              <select style={{ width: '100%' }} name="period" defaultValue={project.period} ref={register()}>
                <option value="wks"> Weeks </option>
                <option value="mon"> Months </option>
                <option value="yrs"> Years </option>
              </select>
            </label>
          </div>
          <div className="input-item">
            <label>
              Description <br />
              <textarea
                cols="30"
                rows="5"
                name="description"
                className="project-details"
                placeholder="Project details"
                defaultValue={project.description}
                ref={register({ required: true, minLength: 1 })}
              ></textarea>{' '}
              <br />
              <span className="validation-errors">
                {errors.description && 'Field is required and must be greater than 100 characters'}
              </span>
            </label>
          </div>

          <div className="input-item">
            <label>
              Execution plan
              <br />
              <textarea
                cols="30"
                rows="5"
                name="executionPlan"
                className="project-plan"
                placeholder="Project details"
                defaultValue={project.executionPlan}
                ref={register({ required: true, minLength: 1 })}
              ></textarea>
              <br />
              <span className="validation-errors">
                {errors.executionPlan && 'Field is required and must be greater than 100 characters'}
              </span>
            </label>
          </div>
          <div className="input-item">
            <label>
              Tags
              <br />
              <input
                placeholder="Enter item"
                name="tags"
                onKeyUp={({ keyCode, currentTarget }) => {
                  if (keyCode === 13 || keyCode === 188) {
                    const newTag = currentTarget.value.replace(',', '');
                    setTag(tags.concat(newTag));
                    currentTarget.value = '';
                  }
                }}
              />
            </label>
            <div className="tags">
              {tags.map((tag, i) => (
                <div className="tag" key={`tags${i}`}>
                  <span>{tag}</span>
                  <span className="close"></span>
                </div>
              ))}
            </div>
          </div>
        </fieldset>
        <fieldset className="form-actions">
          <button className="button-primary" type="submit">
            Update
          </button>
          <button className="button-default" type="reset">
            Cancel
          </button>
        </fieldset>
      </form>
    </>
  );
};
ProjectsEditPage.propTypes = {
  project: PropTypes,
  error: PropTypes.shape({
    statusCode: PropTypes.number
  }),
  session: PropTypes.shape({
    user: SessionUserType
  })
};

const ProjectModel = mongoose.model('Project');
export async function getServerSideProps({ query, req, res }) {
  await applySession(req, res, sessionOptions);
  let project = null;

  if (query.project_id) project = await ProjectModel.findById(query.project_id).populate('createdBy');

  if (!project) return { session: { user: req.session?.user }, error: { statusCode: 404 } };
  return {
    props: {
      project: project.view(),
      session: { user: req.session?.user }
    }
  };
}

export default ProjectsEditPage;
