import React from 'react';

import MemberInfoComponent from './MemberInfoComponent';

import User from '@/model/User';

interface MemberIntroductionProps {
  user: User
}

const MemberIntroductionComponent: React.FC<MemberIntroductionProps> = ({ user }) => {

  return (
    <div className="author-intro">
      <MemberInfoComponent user={user} />
    </div>
  );
}

export default MemberIntroductionComponent;
