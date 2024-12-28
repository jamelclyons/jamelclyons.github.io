import React from 'react';

import MemberBio from './MemberBio';
import Member from './Member';

import User from '../../../model/User';

interface MemberInfoProps {
  user: User;
}

const MemberInfoComponent: React.FC<MemberInfoProps> = ({ user }) => {

  return (
    <>
      <div className="author-info">
        {user.bio && <MemberBio bio={user.bio} />}

        <Member user={user} />
      </div>
    </>
  );
};

export default MemberInfoComponent;
