import React, { useState, useRef } from 'react';

function Gallery(props) {
  const { title, gallery } = props;

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const galleryRowRef = useRef(null);

  const previousPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const nextPhoto = () => {
    if (currentPhotoIndex < props.gallery.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const handleTouchStart = (e) => {
    // Capture the starting X coordinate when the user touches the gallery
    const touchStartX = e.touches[0].clientX;
    galleryRowRef.current.setAttribute('data-touch-start', touchStartX);
  };

  const handleTouchEnd = (e) => {
    // Calculate the difference between the starting and ending X coordinates
    const touchStartX = parseInt(
      galleryRowRef.current.getAttribute('data-touch-start'),
      10
    );
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    // Determine whether it's a left or right swipe based on deltaX
    if (deltaX > 50) {
      previousPhoto(); // Swipe right
    } else if (deltaX < -50) {
      nextPhoto(); // Swipe left
    }
  };

  return (
    <>
      {gallery && gallery.length > 0 ? (
        <>
          <h5 className='title'>{title}</h5>

          <div className="gallery">
            {currentPhotoIndex !== 0 ? (
              <button className="arrow-left" onClick={previousPhoto}>
                <h2>V</h2>
              </button>
            ) : (
              ''
            )}

            <div
              className="gallery-row"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              ref={galleryRowRef}>
              {Array.isArray(props.gallery) && (
                <span className="gallery-photo">
                  <img
                    className="photo"
                    src={props.gallery[currentPhotoIndex]}
                    alt=""
                  />
                </span>
              )}
            </div>
            
            {currentPhotoIndex !== props.gallery.length - 1 ? (
              <button className="arrow-right" onClick={nextPhoto}>
                <h2>V</h2>
              </button>
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
}

export default Gallery;
