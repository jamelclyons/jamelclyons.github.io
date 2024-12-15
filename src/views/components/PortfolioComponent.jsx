import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Projects from './Projects';
import TaxList from './TaxList';

import { getPortfolio } from '../../controllers/portfolioSlice';

function PortfolioComponent(props) {
  const dispatch = useDispatch();

  const { portfolio } = useSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(getPortfolio());
  }, []);

  return (
    <>
      {/* {portfolio && ( */}
      <main className="portfolio">
        <h1 class="title">portfolio</h1>

        <Projects projects={portfolio} />

        {/* <TaxList tax={projectTypes} title={'Project Types'} />

        <TaxList tax={skills} title={'Skills'} />

        <TaxList tax={frameworks} title={'Frameworks'} />

        <TaxList tax={technologies} title={'Technologies'} /> */}
      </main>
      {/* )} */}
    </>
  );
}

export default PortfolioComponent;
