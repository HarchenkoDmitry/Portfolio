import ProfileInfo from './index';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const ProfileInfoContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);

export default ProfileInfoContainer;
