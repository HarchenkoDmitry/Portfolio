import React from 'react';
import '../../index.css'
import s from './contacts.module.css'
import Button from '../common/Button';

function Contacts(props) {
  let current = props.current;

  let nameElement = React.createRef();
  let emailElement = React.createRef();
  let messageElement = React.createRef();

  let handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleSubmit();
  };

  let handleChangeInput = (type, value) => {
    props.handleChangeInput(type, value);
  };

  return (
    <div className={'container'}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={current.name}
          onChange={() => {handleChangeInput('name', nameElement.current.value) }}
          ref={nameElement}
          placeholder={'Name'}
          className={s.input}
          aria-label={'name'}
        />
        <input
          type="email"
          value={current.email}
          onChange={() => {handleChangeInput('email', emailElement.current.value) }}
          ref={emailElement}
          placeholder={'Email'}
          className={s.input}
          aria-label={'email'}
        />
        <textarea
          placeholder={'type the message here'}
          value={current.message}
          onChange={() => {handleChangeInput('message', messageElement.current.value) }}
          ref={messageElement}
          className={s.textarea}
          aria-label={'message'}
        />
        <Button type={'submit'} name={'Send'}/>
      </form>
    </div>
  );
}

export default Contacts;
