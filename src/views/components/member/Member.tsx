import React from 'react';

import User from '../../../model/User';

import MemberContact from './MemberContact';

interface MemberProps {
  user: User
}

const Member: React.FC<MemberProps> = ({ user }) => {

  return (
    <>
      <div className="author-card card">
        <div className="author-pic">
          <img src={user?.avatarURL} alt="" />
        </div>
        <h2 className="title">{user?.title}</h2>

        <MemberContact contactMethods={user.contactMethods} />
      </div>
    </>
  );
}

export default Member;
