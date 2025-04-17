import React, { useEffect, useState } from 'react';

import FooterBar from './FooterBar';

import User from '@/model/User';
import ContactMethods from '@/model/ContactMethods';

import userJson from '../../../user.json';

interface FooterComponentProps {
  user: User;
}

const FooterComponent: React.FC<FooterComponentProps> = ({ user }) => {
  const [contactMethods, setContactMethods] = useState<ContactMethods | null>(null);
  const [name, setName] = useState<string>(userJson.name);

  useEffect(() => {
    if (user.contactMethods) {
      setContactMethods(user.contactMethods)
    }
  }, [user]);

  useEffect(() => {
    if (user.name) {
      setName(user.name)
    }
  }, [user]);

  const year = new Date().getFullYear();

  return (
    <footer>
      {contactMethods && <FooterBar contactMethods={contactMethods} />}
      <span className="legal">© Copyright 2010 - {year} {name}. All Rights Reserved.</span>
    </footer>
  );
}

export default FooterComponent;
