import {addPostActionCreator, changeInputActionCreator} from '../../redux/feedback-reducer';
import Contacts from './index';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    current: state.feedback.current
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: () => {
      dispatch(addPostActionCreator());
    },
    handleChangeInput: (type, value) => {
      dispatch(changeInputActionCreator(type, value));
    },
  }
};

const ContactsContainer = connect(mapStateToProps, mapDispatchToProps)(Contacts);

export default ContactsContainer;
