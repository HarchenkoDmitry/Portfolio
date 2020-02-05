import React, {Component} from 'react';
import {connect} from 'react-redux';
import Project from './index.jsx';
import {withRouter} from 'react-router-dom';
import {setIsFetching, getProject, addLikeProject, removeLikeProject} from '../../redux/project-reducer';
import {projectAPI} from '../../api/api.js';

class ProjectContainer extends Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getProject(id);
  }

  addLike = () => {
    let id = this.props.match.params.id;
    projectAPI.addLike(id)
      .then((isOk) => {
        if (isOk) this.props.addLikeProject(id);
      })
  };

  removeLike = () => {
    let id = this.props.match.params.id;
    projectAPI.removeLike(id)
      .then((isOk) => {
        if (isOk) this.props.removeLikeProject(id);
      });
  };

  render() {
    return <Project
      name={this.props.name}
      photo={this.props.photo}
      description={this.props.description}
      url={this.props.url}
      stack={this.props.stack}
      likesAmount={this.props.likesAmount}
      isFetching={this.props.isFetching}
      userLike={this.props.userLike}
      addLike={this.addLike}
      removeLike={this.removeLike}
    />
  }
}

const mapStateToProps = (state) => {
  return ({
    name: state.project.data.name,
    photo: state.project.data.photo.large,
    description: state.project.data.description,
    url: state.project.data.url,
    stack: state.project.data.stack,
    likesAmount: state.project.data.likesAmount,
    userLike: state.project.data.userLike,
    isFetching: state.project.isFetching
  })
};

const actionCreators = {
  getProject,
  setIsFetching,
  addLikeProject,
  removeLikeProject
};

let WithUrlDataProjectContainer = withRouter(ProjectContainer);

export default connect(mapStateToProps, actionCreators)(WithUrlDataProjectContainer);
