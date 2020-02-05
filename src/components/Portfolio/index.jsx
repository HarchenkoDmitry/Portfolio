import React from 'react';
import '../../index.css';
import s from './portfolio.module.css';
import Preloader from '../common/Preloader';
import {NavLink} from 'react-router-dom';

let Portfolio = (props) => {

  let pagesCount = Math.ceil(props.totalCount / props.pageSize);
  let pages = [];
  for (let i = 0; i < pagesCount; i++) {
    pages[i] = i + 1;
  }

  let paginationElement =
    <ul>
      {
        pages.map(pageNumber => {
          return (
            <li key={pageNumber}>
              {
                pageNumber === props.currentPage ?
                  <span>{pageNumber}</span> :
                  <button
                    type='button'
                    onClick={() => props.changePage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
              }
            </li>
          )
        })
      }
    </ul>;

  return (
    <div className={'container'}>
      {props.isFetching ?
        <Preloader/> :
        <ul className={s.list}>
          {
            props.projects.map(project => {
              return (
                <li key={project.id} className={s.item}>
                  <NavLink exact to={`/portfolio/${project.id}`} className={s.imgWrap}>
                    <img src={project.photo.small} className={s.img} alt={project.name}/>
                  </NavLink>
                  <h3 className={s.itemTitle}>{project.name}</h3>
                  <p className={s.itemAnnotation}>{project.annotation}</p>
                  <button
                    type='button'
                    className={`${s.like} ${project.userLike ? s.likeActive : ''}`}
                    disabled={props.idLikeFetching.some(id => id === project.id)}
                    onClick={() => project.userLike ? props.removeLike(project.id) : props.addLike(project.id)}
                  >
                    like {project.likesAmount}
                  </button>
                </li>
              )
            })
          }
        </ul>
      }

      {paginationElement}

    </div>
  )

};

export default Portfolio;
