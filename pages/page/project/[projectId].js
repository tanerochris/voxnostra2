/* eslint-disable no-alert */
import { useState } from 'react';
import mongoose from 'mongoose';
import axios from 'axios';
import PropTypes from 'prop-types';
import Error from 'next/error';

const Project = mongoose.model('Project');
const ViewProject = ({ project, errorCode }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const deleteProject = async (projectId) => {
    if (window.confirm('Do you want to delete this project?')) {
      try {
        const response = await axios.delete(`/api/project/${projectId}`);
        if (response.status === 200) {
          setSuccessMessage('Project successfully deleted.');
          setTimeout(() => {
            window.location.assign(`/page/project/list`);
          });
        }
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    }
  };
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }
  return (
    <div>
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
      <div className="project-header">
        <h3>
          <span className="title">{project.name}</span>&nbsp;&nbsp;&nbsp;
          <span className="verified">
            <object type="image/svg+xml" data="/assets/svg/verified-badge.svg" width="18" height="18"></object>
          </span>
        </h3>
        <h6 className="subtitle">
          <span>Created by: {project.createdBy ? project.createdBy.name : ''}</span>&nbsp;&nbsp;
          <span>{project.createdAt}</span>&nbsp;&nbsp;
        </h6>
      </div>
      <div>
        <a href={`/page/project/edit?project_id=${project.id}`}> Edit</a>
      </div>
      <div>
        <button onClick={() => deleteProject(project.id)}>Delete</button>
      </div>
    </div>
  );
};
export async function getServerSideProps({ params }) {
  const project = await Project.findById(params.projectId).populate('createdBy', ['-password']);
  let errorCode = '';
  if (!project) errorCode = 404;
  return {
    props: {
      project: project.view() || {},
      errorCode
    } // will be passed to the page component as props
  };
}
ViewProject.propTypes = {
  project: {
    id: PropTypes.string,
    name: PropTypes.string,
    createdBy: PropTypes.object,
    createdAt: PropTypes.string,
    duration: PropTypes.number,
    period: PropTypes.string,
    description: PropTypes.string,
    comments: PropTypes.number,
    status: PropTypes.string,
    currency: PropTypes.string,
    cost: PropTypes.number,
    beneficiary: PropTypes.string,
    executionPlan: PropTypes.string,
    tags: PropTypes.array
  },
  errorCode: PropTypes.number
};
export default ViewProject;
