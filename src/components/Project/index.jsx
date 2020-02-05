import React from 'react';
import '../../index.css';
import Preloader from '../common/Preloader';
import s from '../Portfolio/portfolio.module.css';

let Project = (props) => {
  return (
    <div className={'container'}>
      {props.isFetching ?
        <Preloader/> :
        <>
          <h1>{props.name}</h1>
          <img src={props.photo} alt={props.name}/>
          <p>{props.description}</p>
          <ul>
            {props.stack.map(item => <li key={item}>{item}</li>)}
          </ul>
          <a href={props.url} target='_blank' rel="noopener noreferrer">{props.url}</a>
          <button
            type='button'
            className={`${s.like} ${props.userLike ? s.likeActive : ''}`}
            onClick={() => props.userLike ? props.removeLike() : props.addLike()}
          >
            like {props.likesAmount}
          </button>
        </>
      }
    </div>
  )
};

export default Project;
