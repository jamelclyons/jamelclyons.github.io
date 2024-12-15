import React from 'react';
import SocialBar from './SocialBar';

function FooterComponent(props) {
  const { socialAccounts, email } = props;

  return (
    <footer>
      <SocialBar socialAccounts={socialAccounts} email={email} />
      <span class="legal">Copyright . All Rights Reserved.</span>
    </footer>
  );
}

export default FooterComponent;
