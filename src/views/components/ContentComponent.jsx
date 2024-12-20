import React from 'react';

function ContentComponent(props) {
  const { content } = props;

  return (
    <>
      {Array.isArray(content) &&
        content.map((element, index) => (
          <div key={index} className="content">
            {element}
          </div>
        ))}
    </>
  );
}

export default ContentComponent;