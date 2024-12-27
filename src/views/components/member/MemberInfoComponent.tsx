import React from 'react';

import MemberBio from './MemberBio';
import User from '../../../model/User';
import Member from './Member';

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
