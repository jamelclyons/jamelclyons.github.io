import React from 'react';

function MemberInfoComponent(props) {
  const { user } = props;

  const handleResume = () => {
    window.location.href = '/#/resume';
  };

  return (
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

        <button onClick={handleResume}>
          <h3 class="title">resume</h3>
        </button>
      </div>
    </div>
  );
}

export default MemberInfoComponent;
