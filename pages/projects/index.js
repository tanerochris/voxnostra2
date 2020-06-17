import axios from 'axios';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import AppHeader from '../../components/partials/AppHeader';
import ProjectCard from '../../components/partials/project';
import { SessionType } from '../../components/propTypes';
import getSession from '../../helpers/session-helpers';

const ProjectsIndexPage = ({ session }) => {
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
      <AppHeader user={session.user} />
      <Head>
        <link href="/style.css" rel="stylesheet" />
      </Head>
      <div className="project-list-container">
        {projects.length ? (
          projects.map((project) => <ProjectCard key={project.id} {...project} />)
        ) : (
          <span>No projects</span>
        )}
      </div>
    </>
  );
};

ProjectsIndexPage.propTypes = {
  session: SessionType,
  projects: PropTypes.array
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);
  const sessionJSON = JSON.parse(session);
  return { props: { session: sessionJSON } };
};

export default ProjectsIndexPage;
