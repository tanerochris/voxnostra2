import mongoose from 'mongoose';
import { applySession } from 'next-session';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import AppHeader from '../../components/partials/AppHeader';
import ProjectCard from '../../components/partials/project';
import { SessionUserType } from '../../components/propTypes';
import { sessionOptions } from '../../middlewares/Session';

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
  session: PropTypes.shape({
    user: SessionUserType
  }),
  projects: PropTypes.array
};

const ProjectModel = mongoose.model('Project');

export const getServerSideProps = async ({ req, res }) => {
  await applySession(req, res, sessionOptions);

  const projects = (await ProjectModel.find().exec()).map((project) => project.view());

  return { props: { session: { user: req.session?.user }, projects } };
};

export default ProjectsIndexPage;
