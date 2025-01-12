import React from 'react';

import User from '../../../model/User';

import MemberPic from './MemberPic';
import MemberContact from './MemberContact';

interface MemberProps {
  user: User
}

const MemberCard: React.FC<MemberProps> = ({ user }) => {

  return (
    <>
      <div className="author-card card">
        <MemberPic user={user} />

        <h3 className="title">{user?.title}</h3>

        <MemberContact contactMethods={user.contactMethods} />
      </div>
    </>
  );
}

export default MemberCard;
