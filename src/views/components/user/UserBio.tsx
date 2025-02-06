import React from 'react'

interface UserBioProps {
    bio: string;
}

const UserBio: React.FC<UserBioProps> = ({ bio }) => {
    return (
        <>
            {bio !== '' && (
                <div className="user-bio-card card">
                    <h3 className="user-bio">
                        <q>{bio}</q>
                    </h3>
                </div>
            )}
        </>)
}

export default UserBio