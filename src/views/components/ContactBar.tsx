import React from 'react'

import ImageComponent from './ImageComponent';

import ContactMethods from '../../model/ContactMethods'

interface ContactBarProps {
    contactMethods: Record<string, any>;
}

const ContactBar: React.FC<ContactBarProps> = ({ contactMethods }) => {
    const contact = contactMethods as ContactMethods;
    const mailTo = contact?.email.value ? `mailto:${contact.email.value}` : null;
    const callNow = contact?.phone.value ? `tel:+${contact.phone.value}` : null;
    const github = contact?.gitHub;
    const x = contact?.x ? contact.x : null;
    const mail = contact?.email ? contact.email : null;
    const linkedin = contact?.linkedIn ? contact.linkedIn : null;
    const instagram = contact?.instagram ? contact.instagram : null;
    const phone = contact?.phone ? contact.phone : null;

    return (
        <div className="contact-bar">
            {mailTo && mail?.image &&
                <a href={mailTo} target="_blank">
                    <ImageComponent image={mail.image} />
                </a>
            }

            {github && github.image &&
                <a href={github?.url} target="_blank">
                    <ImageComponent image={github.image} />
                </a>
            }

            {linkedin && linkedin?.image &&
                <a href={linkedin?.url} target="_blank">
                    <ImageComponent image={linkedin.image} />
                </a>
            }

            {x && x?.image &&
                <a href={x?.url} target="_blank">
                    <ImageComponent image={x.image} />
                </a>
            }

            {instagram && instagram?.image &&
                <a href={instagram?.url} target="_blank">
                    <ImageComponent image={instagram.image} />
                </a>
            }

            {callNow && phone?.image &&
                <a href={callNow} target="_blank">
                    <ImageComponent image={phone.image} />
                </a>
            }
        </div>)
}

export default ContactBar