import React, { useEffect } from 'react';

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found';
  }, []);

  return (
    <section className='not-found'>
      <h2>404 - Page Not Found</h2>
    </section>
  );
}

export default NotFound;
