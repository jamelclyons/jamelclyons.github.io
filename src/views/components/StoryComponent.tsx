import React from 'react'

import ContentComponent from './content/ContentComponent';

interface StoryComponentProps {
    story: string;
}

const StoryComponent: React.FC<StoryComponentProps> = ({ story }) => {
    return (<>{
        story !== '' &&
        <div className="story" id="story">
            <h2 className="title">story</h2>

            <ContentComponent title={null} url={story} />
        </div>
    }</>)
}

export default StoryComponent