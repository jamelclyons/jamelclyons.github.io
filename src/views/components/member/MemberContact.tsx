import React from 'react'

import ContactMethods from '../../../model/ContactMethods';

import ContactBar from '../ContactBar';

interface MemberContactProps {
    contactMethods: ContactMethods
}

const MemberContact: React.FC<MemberContactProps> = ({ contactMethods }) => {

    return (
        <div className="author-contact">
            <ContactBar contactMethods={contactMethods} />
        </div>)
}

export default MemberContact