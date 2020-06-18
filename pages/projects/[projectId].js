/* eslint-disable no-alert */
import mongoose from 'mongoose';
import Error from 'next/error';
// import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import AppHeader from '../../components/partials/AppHeader';
import { ProjectType, SessionType } from '../../components/propTypes';
import getSession from '../../helpers/session-helpers';

const ViewProject = ({ project, errorCode, session }) => {
  const [successMessage /* ,setSuccessMessage */] = useState('');
  const [errorMessage /* ,setErrorMessage */] = useState('');
  /*  const deleteProject = async (projectId) => {
    if (window.confirm('Do you want to delete this project?')) {
      try {
        const response = await axios.delete(`/api/project/${projectId}`);
        if (response.status === 200) {
          setSuccessMessage('Project successfully deleted.');
          setTimeout(() => {
            window.location.assign(`/projects/list`);
          });
        }
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    }
  }; */
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }
  return (
    <div>
      <AppHeader user={session.user} />
      <section className="mt-3">
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
        <div className="container">
          <div className="row u-section">
            <div className="column column-25 f">
              <div className="current m project">
                <div className="row r">
                  <img src="/assets/images/avatar-1.png" alt="project-logo" />
                </div>
                <div className="row r">
                  <h5>{project.name}</h5>
                </div>
                <hr className="hr" />
                <div className="row">
                  <div className="column">
                    <h6></h6>
                    <p>Catergory: Educationi</p>
                    <p>
                      Cost: {project.cost} {project.currency}
                    </p>
                    <p>Date Started: {project.createdAt}</p>
                    <p>
                      Duration: {project.duration} {project.period}
                    </p>
                    <p>
                      Status: <span className="in-progress">{project.status}</span>
                    </p>
                    <p>
                      Website: <a href="projectwebsite.com">www.projectwebsite.com</a>
                    </p>
                    <p>2,345 Followers</p>
                  </div>
                </div>
              </div>
              <div className="complete m">
                <div className="row pr project">
                  <div className="row">
                    <input type="checkbox" id="follow-project" />
                    <p htmlFor="follow-project">Follow Project</p>
                  </div>
                  <div className="row">
                    <input type="checkbox" id="upvote" />
                    <p htmlFor="upvote">Upvote Project</p>
                  </div>
                  <div className="row">
                    <input type="checkbox" id="downvote" />
                    <p htmlFor="downvote">Downvote Project</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column column-40 m">
              <div className="row r">
                <h5>{project.createdBy.name}</h5>
              </div>
              <hr className="hr" />
              <div className="row d">
                <h6>Details</h6>
                <p>{project.description}</p>
              </div>
              <div className="row d">
                <h6>Execution plan</h6>
                <p>{project.executionPlan}</p>
              </div>
              <div className="row comment">
                <p>{project.comments} Comments</p>
              </div>
              <div className="row comments">
                <div className="row cmt">
                  <div className="column column-20">
                    <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                  </div>
                  <div className="column column-80">
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem a sit excepturi quisquam ullam? Quia
                      inventore consectetur debitis, error voluptas officiis dolores excepturi consequuntur officia.
                    </p>
                    <div className="row post-time">
                      <em>posted 5h ago</em>
                    </div>
                  </div>
                </div>
                <div className="row cmt">
                  <div className="column column-20">
                    <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                  </div>
                  <div className="column column-80">
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem a sit excepturi quisquam ullam? Quia
                      inventore consectetur debitis, error voluptas officiis dolores excepturi consequuntur officia.
                    </p>
                    <div className="row post-time">
                      <em>posted 5h ago</em>
                    </div>
                  </div>
                </div>
                <div className="pos">
                  <div className="row cmt post">
                    <div className="column column-10">
                      <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                    </div>
                    <div className="column column-67">
                      <input type="text" name="write-comment" id="write-comment" placeholder="Write a comment" />
                    </div>
                    <div className="column column-10">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M464 4.3L16 262.7C-7 276-4.7 309.9 19.8 320L160 378v102c0 30.2 37.8 43.3 56.7 20.3l60.7-73.8 126.4 52.2c19.1 7.9 40.7-4.2 43.8-24.7l64-417.1C515.7 10.2 487-9 464 4.3zM192 480v-88.8l54.5 22.5L192 480zm224-30.9l-206.2-85.2 199.5-235.8c4.8-5.6-2.9-13.2-8.5-8.4L145.5 337.3 32 290.5 480 32l-64 417.1z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column column-25 m">
              <div className="row r">
                <h5>Contractors</h5>
              </div>
              <hr className="hr" />
              <div className="row pr">
                <div className="column column-25 o">
                  <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                </div>
                <div className="column column-75 o">
                  <h6>John Smith</h6>
                  <p>Computer Engineer</p>
                  <p className="small">Buea, Cameroon</p>
                </div>
              </div>
              <div className="row pr">
                <div className="column column-25 o">
                  <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                </div>
                <div className="column column-75 o">
                  <h6>John Smith</h6>
                  <p>Computer Engineer</p>
                  <p className="small">Buea, Cameroon</p>
                </div>
              </div>
              <div className="row pr">
                <div className="column column-25 o">
                  <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                </div>
                <div className="column column-75 o">
                  <h6>John Smith</h6>
                  <p>Computer Engineer</p>
                  <p className="small">Buea, Cameroon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Project = mongoose.model('Project');

export async function getServerSideProps({ params, req, res }) {
  const session = await getSession(req, res);

  const project = await Project.findById(params.projectId).populate('createdBy', ['-password']);
  let errorCode = '';
  if (!project) errorCode = 404;
  return {
    props: {
      session,
      project: project.view() || {},
      errorCode
    } // will be passed to the page component as props
  };
}

ViewProject.propTypes = {
  session: SessionType,
  project: ProjectType,
  errorCode: PropTypes.number
};
export default ViewProject;
