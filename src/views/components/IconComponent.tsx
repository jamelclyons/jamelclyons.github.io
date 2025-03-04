import React from 'react';
import Image from '../../model/Image';

interface IconComponentProps {
  image: Image;
}

const IconComponent: React.FC<IconComponentProps> = ({ image }) => {
  return (
    <>
        {image?.url ? (
          <img className="icon" src={image.url} alt={image.title} title={image.title} />
        ) : (
          image?.className && (
            <i className={image.className} title={image.title}></i>
          )
        )}
    </>
  );
}

export default IconComponent;
