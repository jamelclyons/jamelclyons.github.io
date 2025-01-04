import React from 'react';

import ContactBar from './ContactBar';

import ContactMethods from '../../model/ContactMethods';

interface SocialBarProps {
  contactMethods: Record<string, any>;
}

const SocialBar: React.FC<SocialBarProps> = ({ contactMethods }) => {

  return (
    <div className="footer-bar">
      <ContactBar contactMethods={contactMethods} />
    </div>
  );
}

export default SocialBar;
