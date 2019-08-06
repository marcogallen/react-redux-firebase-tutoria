import React, { Component } from 'react';
import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { deleteProject } from "../../store/actions/projectActions";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.deleteProject = this.deleteProject.bind(this);
    }
    deleteProject(id) {
        //console.log("Project to delete", id);
        this.props.deleteProject(id);        
    }

    render() {
        
        const { projects, auth, notifications } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />
        
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects={projects} deleteProject = {this.deleteProject} />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications = {notifications} />
                    </div>
                </div>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    //console.log(state); 
    return {
        //projects: state.project.projects
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: (projectId)=> dispatch(deleteProject(projectId)),
    }
}
// where: ['uid', '==', 'iGAPoKIH9na9R6WVQBVUENo9Nwh1'],
//project: Ro1BxNHEtSQKH6ixupTC
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props)=> {
        console.log("FirestoreConnect", props.auth.uid)

        if(props.auth.uid) {
            return [
                { 
                    collection: 'projects', 
                    orderBy: ['createdAt', 'desc'],
                    where: ['authorId', '==', props.auth.uid],
                    },
                { 
                    collection: 'notifications', 
                    limit: 3, 
                    orderBy: ['time', 'desc'] 
                }
            ]
        } else {
            return [
                { 
                    collection: 'projects', 
                    orderBy: ['createdAt', 'desc'],
                    },
                { 
                    collection: 'notifications', 
                    limit: 3, 
                    orderBy: ['time', 'desc'] 
                }
            ]
        }
    })
)(Dashboard);