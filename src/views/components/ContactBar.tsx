import React from 'react'

import ImageComponent from './ImageComponent';

import ContactMethods from '../../model/ContactMethods'

interface ContactBarProps {
    contactMethods: ContactMethods;
}

const ContactBar: React.FC<ContactBarProps> = ({ contactMethods }) => {
    const mailTo = contactMethods.email.value ? `mailto:${contactMethods.email.value}` : null;
    const callNow = contactMethods.phone.value ? `tel:+${contactMethods.phone.value}` : null;
    const github = contactMethods.gitHub;
    const x = contactMethods.x;
    const mail = contactMethods.email;
    const linkedin = contactMethods.linkedIn;
    const instagram = contactMethods.instagram;

    return (
        <div className="contact-bar">
            {mailTo &&
                <a href={mailTo} target="_blank">
                    <ImageComponent image={contactMethods.email} />
                </a>
            }

            {github &&
                <a href={github?.url} target="_blank">
                    <ImageComponent image={github} />
                </a>
            }

            {linkedin &&
                <a href={linkedin?.url} target="_blank">
                    <ImageComponent image={linkedin} />
                </a>
            }

            {x &&
                <a href={x?.url} target="_blank">
                    <ImageComponent image={x} />
                </a>
            }

            {instagram &&
                <a href={instagram?.url} target="_blank">
                    <ImageComponent image={instagram} />
                </a>
            }

            {callNow &&
                <a href={callNow} target="_blank">
                    <ImageComponent image={contactMethods.phone} />
                </a>
            }
        </div>)
}

export default ContactBar