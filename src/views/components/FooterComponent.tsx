import React from 'react';

import SocialBar from './SocialBar';

import ContactMethods from '../../model/ContactMethods';

interface FooterComponentProps {
  contactMethods: ContactMethods;
}

const FooterComponent: React.FC<FooterComponentProps> = ({ contactMethods }) => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <SocialBar contactMethods={contactMethods} />
      <span className="legal">Copyright 2010 - {year}. All Rights Reserved.</span>
    </footer>
  );
}

export default FooterComponent;
