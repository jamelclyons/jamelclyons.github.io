import React from 'react';

function ImageComponent(props) {
  const { image } = props;

  
  return image?.src ? (
    <img src={image?.src} alt={image?.title} title={image?.title} />
  ) : (
    image?.className && <i className={image?.className} title={image?.title}></i>
  );
}

export default ImageComponent;
