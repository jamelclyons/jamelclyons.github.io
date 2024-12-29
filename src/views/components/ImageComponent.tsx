import React from 'react';

import Image from '../../model/Image';

interface ImageComponentProps {
  image: Image
}

const ImageComponent: React.FC<ImageComponentProps> = ({ image }) =>{

  return image?.url ? (
    <img src={image?.url} alt={image?.title} title={image?.title} />
  ) : (
    image?.className && <i className={image?.className} title={image?.title}></i>
  );
}

export default ImageComponent;
