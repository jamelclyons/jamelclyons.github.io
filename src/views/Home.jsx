import React from 'react';

import About from './About';

import PortfolioComponent from './components/PortfolioComponent';

function Home(props) {
  const { user } = props;

  return (
    <>
      <About user={user} />
      <PortfolioComponent />
    </>
  );
}

export default Home;
