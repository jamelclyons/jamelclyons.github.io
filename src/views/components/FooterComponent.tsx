import React from 'react';

import FooterBar from './FooterBar';

import User from '@/model/User';

interface FooterComponentProps {
  user: User;
}

const FooterComponent: React.FC<FooterComponentProps> = ({ user }) => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <FooterBar contactMethods={user.contactMethods} />
      <span className="legal">© Copyright 2010 - {year} {user.name}. All Rights Reserved.</span>
    </footer>
  );
}

export default FooterComponent;
