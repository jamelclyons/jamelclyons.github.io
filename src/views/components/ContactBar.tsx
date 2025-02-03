import React from 'react'

import ImageComponent from './ImageComponent';

import ContactMethods from '../../model/ContactMethods'

interface ContactBarProps {
    contactMethods: ContactMethods;
    location: string;
}

const ContactBar: React.FC<ContactBarProps> = ({ contactMethods, location }) => {
    const { hackerrank, email, phone, github, linkedin, instagram, x, website } = contactMethods;

    const mailTo = email.value ? `mailto:${email.value}` : '';
    const callNow = phone.value ? `tel:+${phone.value}` : '';

    return (<div className="contact-bar">
        {mailTo !== '' && email.image &&
            <a href={mailTo} target="_blank">
                <ImageComponent image={email.image} />
            </a>
        }

        {github.image && github.url !== '' &&
            <a href={github.url} target="_blank">
                <ImageComponent image={github.image} />
            </a>
        }

        {linkedin.image && linkedin.url !== '' &&
            <a href={linkedin.url} target="_blank">
                <ImageComponent image={linkedin.image} />
            </a>
        }

        {location !== 'footer' && website.image && website.url !== '' &&
            <a href={website.url} target="_blank">
                <ImageComponent image={website.image} />
            </a>
        }

        {hackerrank.image && hackerrank.url !== '' &&
            <a href={hackerrank.url} target="_blank">
                <ImageComponent image={hackerrank.image} />
            </a>
        }

        {x.image && x.url !== '' &&
            <a href={x.url} target="_blank">
                <ImageComponent image={x.image} />
            </a>
        }

        {instagram.image && instagram.url &&
            <a href={instagram.url} target="_blank">
                <ImageComponent image={instagram.image} />
            </a>
        }

        {callNow !== '' && phone.image &&
            <a href={callNow} target="_blank">
                <ImageComponent image={phone.image} />
            </a>
        }
    </div>)
}

export default ContactBar