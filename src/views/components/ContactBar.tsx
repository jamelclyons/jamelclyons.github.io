import React from 'react'

import ImageComponent from './ImageComponent';

import ContactMethods from '../../model/ContactMethods'

interface ContactBarProps {
    contactMethods: ContactMethods;
}

const ContactBar: React.FC<ContactBarProps> = ({ contactMethods }) => {
    const { email, phone, gitHub, linkedIn, instagram, x } = contactMethods;
    
    const mailTo = `mailto:${email.value}`;
    const callNow = `tel:+${phone.value}`;

    return (
        <div className="contact-bar">
            {mailTo && email.image &&
                <a href={mailTo} target="_blank">
                    <ImageComponent image={email.image} />
                </a>
            }

            {gitHub.image &&
                <a href={gitHub?.url} target="_blank">
                    <ImageComponent image={gitHub.image} />
                </a>
            }

            {linkedIn.image &&
                <a href={linkedIn.url} target="_blank">
                    <ImageComponent image={linkedIn.image} />
                </a>
            }

            {x.image &&
                <a href={x.url} target="_blank">
                    <ImageComponent image={x.image} />
                </a>
            }

            {instagram.image &&
                <a href={instagram.url} target="_blank">
                    <ImageComponent image={instagram.image} />
                </a>
            }

            {callNow && phone.image &&
                <a href={callNow} target="_blank">
                    <ImageComponent image={phone.image} />
                </a>
            }
        </div>)
}

export default ContactBar