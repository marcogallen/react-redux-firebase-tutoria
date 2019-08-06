import React from 'react';
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom';

const ProjectList = ({projects, deleteProject}) => {
    
    return(
        <div className="project-list section">
            { projects && projects.map(project => {
                return (
                    <div  key={ project.id } >
                    <Link to={"/project/" + project.id} >
                        <ProjectSummary project= { project } />
                    </Link>
                    
                    <button className="btn-small red" onClick= {id => deleteProject(project.id)} >Delete</button>
                    
                    
                    </div>
                );
            })}
        </div>
    );
}

export default ProjectList