import React from 'react';
import s from './profileInfo.module.css';

function ProfileInfo(props) {

  let profile = props.profile;
  let contacts = props.contacts;
  let socials = contacts.socials;

  return (
    <section>
      <h2 className={s.name}>{profile.name} {profile.surname}</h2>
      <p className={s.about}>{profile.professions.join(', ')}</p>
      <table className={s.table}>
        <tbody>

        {!!profile.age &&
        <tr>
          <td>age:</td>
          <td>{profile.age}</td>
        </tr>
        }

        {!!contacts.email &&
        <tr>
          <td>email:</td>
          <td>{contacts.email}</td>
        </tr>
        }

        {!!contacts.address &&
        <tr>
          <td>address:</td>
          <td>{contacts.address}</td>
        </tr>
        }
        </tbody>
      </table>
      <ul className={s.social}>
        {!!socials.vk &&
        <li><a href={socials.vk} target="_blank" rel="noopener noreferrer">vk</a></li>
        }
        {!!socials.gitHub &&
        <li><a href={socials.gitHub} target="_blank" rel="noopener noreferrer">gitHub</a></li>
        }
      </ul>
    </section>
  )
}

export default ProfileInfo;
