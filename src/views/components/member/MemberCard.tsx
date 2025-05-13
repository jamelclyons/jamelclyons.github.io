import React from 'react';

import User from '../../../model/User';

import MemberPic from './MemberPic';

interface MemberProps {
  user: User,
  member: User
}

const MemberCard: React.FC<MemberProps> = ({ user, member }) => {

  const handleClick = () => {
    handleUsers();
    if (user.login === member.login) {
      window.location.href = '/#/about'
    } else {
      window.location.href = `/#/user/${member.login}`
    };
  };

  const handleUsers = () => {
    const element = document.getElementById('top');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <button
        className="user-button"
        onClick={() => handleClick()}>
        <div className="author-card card">
          <MemberPic user={member} />
          <h3 className="title">{member.title || member.login}</h3>
        </div>
      </button>
    </>
  );
}

export default MemberCard;
