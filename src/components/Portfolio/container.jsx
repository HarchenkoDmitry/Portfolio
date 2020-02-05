import {connect} from 'react-redux';
import React, {Component} from 'react';
import Portfolio from './index.jsx';
import {
  addLike,
  removeLike,
  setCurrentPage,
  getPortfolio
} from '../../redux/portfolio-reducer.js';

class PortfolioContainer extends Component {
  componentDidMount() {
    this.props.getPortfolio(this.props.currentPage);
  }

  addLike = (id) => {
    this.props.addLike(id);
  };

  removeLike = (id) => {
    this.props.removeLike(id);
  };

  changePage = (page) => {
    this.props.getPortfolio(page);
  };


  render() {
    return <Portfolio
      projects={this.props.projects}
      currentPage={this.props.currentPage}
      totalCount={this.props.totalCount}
      pageSize={this.props.pageSize}
      changePage={this.changePage}
      addLike={this.addLike}
      removeLike={this.removeLike}
      isFetching={this.props.isFetching}
      idLikeFetching={this.props.idLikeFetching}
    />
  } ;
}

const mapStateToProps = (state) => {
  return {
    projects: state.portfolio.projects,
    pageSize: state.portfolio.pageSize,
    currentPage: state.portfolio.currentPage,
    totalCount: state.portfolio.totalCount,
    isFetching: state.portfolio.isFetching,
    idLikeFetching: state.portfolio.idLikeFetching
  }
};

const actionCreators = {addLike, removeLike, getPortfolio, setCurrentPage};

export default connect(mapStateToProps, actionCreators)(PortfolioContainer);
