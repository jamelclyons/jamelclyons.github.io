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
    const phone = contactMethods.phone;
    
    return (
        <div className="contact-bar">
            {mailTo &&
                <a href={mailTo} target="_blank">
                    <ImageComponent image={mail.image} />
                </a>
            }

            {github &&
                <a href={github?.url} target="_blank">
                    <ImageComponent image={github.image} />
                </a>
            }

            {linkedin &&
                <a href={linkedin?.url} target="_blank">
                    <ImageComponent image={linkedin.image} />
                </a>
            }

            {x &&
                <a href={x?.url} target="_blank">
                    <ImageComponent image={x.image} />
                </a>
            }

            {instagram &&
                <a href={instagram?.url} target="_blank">
                    <ImageComponent image={instagram.image} />
                </a>
            }

            {callNow &&
                <a href={callNow} target="_blank">
                    <ImageComponent image={phone.image} />
                </a>
            }
        </div>)
}

export default ContactBar