import React from 'react';

function SocialBar(props) {
  const { socialAccounts, email } = props;

  var github = socialAccounts?.github;
  var twitter = socialAccounts?.x;
  var linkedin = socialAccounts?.linkedIn;
  var instagram = socialAccounts?.instagram;
  var mailto = `mailto:${email}`;
  
  return (
    <div class="social-bar">
      <a href={github} target="_blank">
        <i class="fa fa-github fa-fw"></i>
      </a>

      <a href={linkedin} target="_blank">
        <i class="fa fa-linkedin fa-fw"></i>
      </a>

      <a href={mailto} target="_blank">
        <i class="fa fa-envelope fa-fw"></i>
      </a>

      <a href={twitter} target="_blank">
        <i class="fa fa-twitter fa-fw"></i>
      </a>

      <a href={instagram} target="_blank">
        <i class="fa fa-instagram fa-fw"></i>
      </a>
    </div>
  );
}

export default SocialBar;
