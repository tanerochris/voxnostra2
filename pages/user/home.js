import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import ProjectCard from '../../components/partials/project';
import AppHeader from '../../components/partials/AppHeader';
import { SessionType } from '../../components/propTypes';
import { isAuthenticated } from '../../helpers/auth-helpers';
import getSession from '../../helpers/session-helpers';

const UserHomePage = ({ session }) => {
  const [projects, setProjects] = useState([]);
  const loadProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      if (response.status === 200) setProjects(response.data);
    } catch (error) {
      // console.error(error);
    }
  };
  useEffect(() => {
    loadProjects();
  });
  return (
    <>
      <Head>
        <link href="/style.css" rel="stylesheet" />
      </Head>
      <AppHeader user={session.user} />
      <section className="mt-3">
        <div className="container">
          <div className="row u-section">
            <div className="column column-25 f">
              <div className="complete m">
                <div className="row r">
                  <h5>Organisations</h5>
                </div>
                <hr />
                <div className="row pr">
                  <div className="column column-25 o">
                    <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                  </div>
                  <div className="column column-75 o">
                    <h6>Project Name 3</h6>
                    <p>Time left: 3w 2days</p>
                    <p>
                      Status: <span className="completed">Completed</span>
                    </p>
                  </div>
                </div>
                <div className="row pr">
                  <div className="column column-25 o">
                    <img src="/assets/images/avatar-1.png" alt="organisation-pic" />
                  </div>
                  <div className="column column-75 o">
                    <h6>Project Name 3</h6>
                    <p>Time left: 3w 2days</p>
                    <p>
                      Status: <span className="completed">Completed</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column column-65 m">
              {projects.length ? (
                projects.map((project, i) => <ProjectCard key={i} {...project} />)
              ) : (
                <span>No project</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

UserHomePage.propTypes = {
  session: SessionType
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);
  if (!isAuthenticated(req)) {
    res.writeHead(302, { location: '/login' });
    res.end();
  }
  const sessionJson = JSON.parse(session);
  return {
    props: {
      session: sessionJson
    } // will be passed to the page component as props
  };
};

export default UserHomePage;
