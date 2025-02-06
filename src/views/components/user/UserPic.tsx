import User from '@/model/User'
import React from 'react'

interface MemberPicProps {
    user: User;
}

const MemberPic: React.FC<MemberPicProps> = ({ user }) => {
    return (
        <div className="author-pic">
            <img src={user?.avatarURL} alt="" />
        </div>
    )
}

export default MemberPic