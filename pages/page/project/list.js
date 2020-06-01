import Head from 'next/head';
import axios from 'axios';
import { ProjectCard } from '../../../components/partials/project'

const ListProjects = function ({ projects }) {
    return (
        <div>
            <Head>
                <link href="/style.css" rel="stylesheet" />
            </Head>
            <div className="project-list-container">
                {
                    projects.length ? projects.map( project => <ProjectCard key={project.id} {...project}/>)
                    : <span>No project</span>
                }
            </div> 
        </div> 
    )
};
ListProjects.getInitialProps = async (context) => {
    const response = await axios('http://localhost:3000/api/projects');
    const projects = response.data;

    return {
       projects // will be passed to the page component as props
    }
}
export default ListProjects;