import React from 'react';

import ImageComponent from './ImageComponent';

import ContactMethods from '../../model/ContactMethods';

interface SocialBarProps {
  contactMethods: ContactMethods;
}

const SocialBar: React.FC<SocialBarProps> = ({ contactMethods }) => {

  const mailURL = `mailto:${contactMethods.email}`;

  var github = contactMethods.gitHub;
  var x = contactMethods.x;
  var mail = contactMethods.email;
  var linkedin = contactMethods.linkedIn;
  var instagram = contactMethods.instagram;

  return (
    <div className="social-bar">
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
