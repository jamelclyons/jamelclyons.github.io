import React from 'react';
import SocialBar from './SocialBar';

function FooterComponent(props) {
  const { socialAccounts, email } = props;

  const year = new Date().getFullYear();

  return (
    <footer>
      <SocialBar socialAccounts={socialAccounts} email={email} />
      <span class="legal">Copyright 2010 - {year}. All Rights Reserved.</span>
    </footer>
  );
}

export default FooterComponent;
