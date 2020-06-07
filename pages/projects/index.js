import mongoose from 'mongoose';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import AppHeader from '../../components/partials/AppHeader';
import ProjectCard from '../../components/partials/project';
import { SessionType } from '../../components/propTypes';
import getSession from '../../helpers/session-helpers';

const ProjectsIndexPage = ({ projects, session }) => {
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

const ProjectModel = mongoose.model('Project');

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);

  const projects = (await ProjectModel.find().exec()).map((project) => project.view());

  return { props: { session, projects } };
};

export default ProjectsIndexPage;
