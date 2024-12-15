import React from 'react';

function SocialBar(props) {
  const { socialAccounts, email } = props;

  console.log(socialAccounts);
  var twitter = '';
  var linkedin = '';
  var instagram = '';
  var mailto = `mailto:${email}`;

  socialAccounts.forEach((account) => {
    if (account['provider'] === 'twitter') {
      twitter = account['url'];
    }

    if (account['provider'] === 'linkedin') {
      linkedin = account['url'];
    }

    if (account['provider'] === 'instagram') {
      instagram = account['url'];
    }
  });
  return (
    <div class="social-bar">
      <a href={twitter} target="_blank">
        <i class="fa fa-twitter fa-fw"></i>
      </a>

      <a href={mailto} target="_blank">
        <i class="fa fa-envelope fa-fw"></i>
      </a>

      <a href={linkedin} target="_blank">
        <i class="fa fa-linkedin fa-fw"></i>
      </a>

      <a href={instagram} target="_blank">
        <i class="fa fa-instagram fa-fw"></i>
      </a>
    </div>
  );
}

export default SocialBar;
