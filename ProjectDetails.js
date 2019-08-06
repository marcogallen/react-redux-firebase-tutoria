import React from 'react';
import { connect } from 'react-redux';
import {firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { deleteProject } from "../../store/actions/projectActions";

const ProjectDetails = (props) => {
    let projectId = props.match.params.id;
    //console.log(props.match.params.id)
    const { project, auth, deleteProject  } = props;
    if(!auth.uid) return <Redirect to='/signin' />
    if(project) {
        return (
            <div className="container project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">
                        { project.title }
                    </span>
                    <p>{ project.content}</p>
                </div>
                <div className="card-action grey lighten-4 gray-text">
                    <div>Posted by { project.authorFirstName } { project.authorLastName }</div>
                    <div>{ moment(project.createdAt.toDate()).calendar() }</div>
                    <button className="btn-small red" onClick= { () => {
                    deleteProject(projectId);
                    props.history.push('/');
                    } } >Delete</button>
                </div>
                
            </div>            
        </div>
        );
    } else {
        return (
                <div className="container">
                    <p>Loading project... </p>
                </div>
            )
    }
    
}
const mapStateToProps = (state, ownProps)=>{
    //console.log(state);
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects
    const project = projects ? projects[id] : null ;

    return {
        project: project,
        auth: state.firebase.auth,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: (projectId)=> dispatch(deleteProject(projectId)),
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'projects'}
    ])
)(ProjectDetails);