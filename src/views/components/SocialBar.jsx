import React from 'react';
import ImageComponent from './ImageComponent';

function SocialBar(props) {
  const { socialAccounts, email } = props;

  const mailURL = `mailto:${email}`;

  if (Array.isArray(socialAccounts) && socialAccounts.length > 0) {
    var github = {};
    var x = {};
    var mail = {};
    var linkedin = {};
    var instagram = {};

    socialAccounts.forEach((account) => {
      if (account.id == 'github') {
        github = account;
      }

      if (account.id == 'x') {
        x = account;
      }

      if (account.id == 'email') {
        mail = account;
        mail.url = mailURL;
      }

      if (account.id == 'linkedin') {
        linkedin = account;
      }

      if (account.id == 'instagram') {
        instagram = account;
      }
    });
  }

  return (
    <div class="social-bar">
      <a href={github?.url} target="_blank">
        <ImageComponent image={github} />
      </a>

      <a href={linkedin?.url} target="_blank">
        <ImageComponent image={linkedin} />
      </a>

      <a href={mail?.url} rel="noopener noreferrer">
        <ImageComponent image={mail} />
      </a>

      <a href={x?.url} target="_blank">
        <ImageComponent image={x} />
      </a>

      <a href={instagram?.url} target="_blank">
        <ImageComponent image={instagram} />
      </a>
    </div>
  );
}

export default SocialBar;
