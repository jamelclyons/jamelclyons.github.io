import React from 'react';

import MemberKnowledgeComponent from './MemberKnowledgeComponent';
import MemberInfoComponent from './MemberInfoComponent';

import Taxonomy from '../../../model/Taxonomy';
import User from '../../../model/User';

interface MemberIntroductionProps {
  user: User,
  languages: Set<Taxonomy>,
  frameworks: Set<Taxonomy>,
  technologies: Set<Taxonomy>
}

const MemberIntroductionComponent: React.FC<MemberIntroductionProps> = ({ user, languages, frameworks, technologies }) => {

  return (
    <div className="author-intro">

      <MemberInfoComponent user={user} />

      <MemberKnowledgeComponent
        languages={languages}
        frameworks={frameworks}
        technologies={technologies}
      />
    </div>
  );
}

export default MemberIntroductionComponent;
