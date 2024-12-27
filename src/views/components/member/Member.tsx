import React from 'react';

import User from '../../../model/User';

interface MemberProps {
  user: User
}

const Member: React.FC<MemberProps> = ({ user }) => {

  return (
    <>
      <div className="author">
        <div className="author-card card">
          <div className="author-pic">
            <img src={user?.avatarURL} alt="" />
          </div>
        </div>
        <h2 className="title">{user?.title}</h2>
      </div>
    </>
  );
}

export default Member;
