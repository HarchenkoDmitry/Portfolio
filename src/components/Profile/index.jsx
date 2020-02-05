import React from 'react';
import '../../index.css'
import s from './profile.module.css'
import ProfileInfo from './ProfileInfo/container';


function Profile() {
  return (
    <div className="container">
      <div className={s.wrap}>
        <div className={s.photoWrap}>
          <img src="https://avatars3.githubusercontent.com/u/46461437?s=460&v=4" alt=""/>
        </div>
        <ProfileInfo/>
      </div>
    </div>
  )
}

export default Profile;
