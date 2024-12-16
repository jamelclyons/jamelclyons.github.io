import React from 'react';

import MemberKnowledgeComponent from './MemberKnowledgeComponent';

function MemberIntroductionComponent(props) {
  const { user, languages, frameworks, technologies } = props;

  return (
    <>
      <div className="author-intro">
        <div className="author-info">
          {user.bio && (
            <div className="author-bio-card card">
              <h3 className="author-bio">
                <q>{user.bio}</q>
              </h3>
            </div>
          )}

          <div class="author">
            <div class="author-card card">
              <div class="author-pic">
                <img src={user.avatar_url} alt="" />
              </div>
            </div>
            <h2 class="title">{user.title}</h2>
          </div>
        </div>

        <MemberKnowledgeComponent
          languages={languages}
          frameworks={frameworks}
          technologies={technologies}
        />
      </div>
    </>
  );
}

export default MemberIntroductionComponent;
