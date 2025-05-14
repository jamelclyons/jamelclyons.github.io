import React, { useEffect, useState } from 'react'

import User from '@/model/User'
import Contributor from '@/model/Contributor';

interface MemberPicProps {
    user: User | Contributor;
}

const MemberPic: React.FC<MemberPicProps> = ({ user }) => {
    const [avatarURL, setAvatarURL] = useState<string | null>(null);

    useEffect(() => {
        if (user?.avatarURL) {
            setAvatarURL(user.avatarURL)
        }
    }, [user]);

    return (
        <div className="author-pic">
            {avatarURL && <img src={avatarURL} alt="" />}
        </div>
    )
}

export default MemberPic