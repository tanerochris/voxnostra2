import { useState } from 'react';
import mongoose from 'mongoose';
import axios from 'axios';
import Error from 'next/error';


const Project = mongoose.model('Project');
const ViewProject = ({ project, errorCode }) => {
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    const deleteProject = async (projectId) => {
        if(confirm("Do you want to delete this project?")){
            try {
                const response = await axios.delete(`/api/project/${projectId}`);
                if (response.status === 200) {
                    setSuccessMessage("Project successfully deleted.");
                    setTimeout( () => {
                        location.assign(`/page/project/list`);
                    })
                }
            }
            catch(error) {
                console.log(error);
                setErrorMessage(error.response.data.message);
            }
        }
    }
    if (errorCode) {
        return <Error statusCode={errorCode} />;
    }
    return (
        <div>
            <div className="alert-box" style={{ 
                background: errorMessage ? '#ff0000ad' : '#32cd32a1',
                display: errorMessage || successMessage ? 'block' : 'none'
            }}>
                { errorMessage ? <div className="error"><span>{errorMessage}</span></div> : null}
                { successMessage ? <div className="success"><span>{successMessage}</span></div> : null}
            </div>
            <div className="project-header">
                <h3>
                    <span className="title">{project.name}</span>&nbsp;&nbsp;&nbsp;
                    <span className="verified">
                        <object type="image/svg+xml" data="/assets/svg/verified-badge.svg" width="18" height="18"></object>
                    </span>
                </h3>
                <h6 className="subtitle">
                    <span>Created by: {project.createdBy?.name}</span>&nbsp;&nbsp;
                    <span>{project.createdAt}</span>&nbsp;&nbsp;
                </h6>
            </div>
            <div>
                <a href={`/page/project/edit?project_id=${project.id}`}> Edit</a>
            </div>
            <div>
                <button onClick={ () => deleteProject(project.id)}>Delete</button>
            </div>
        </div>
    )
}
export async function getServerSideProps({ params }) {
    const project = await Project.findById(params.projectId)
                        .populate('createdBy', ['-password']);
    let errorCode = "";
    if (!project)
        errorCode = 404;
    return {
        props: {
            project: project?.view() || {},
            errorCode
        }, // will be passed to the page component as props
    }
}
export default ViewProject;