import React, { useEffect } from 'react';

import PortfolioComponent from './components/portfolio/PortfolioComponent';
import MemberIntroductionComponent from './components/member/MemberComponent';
import ContactComponent from './components/contact/ContactComponent';

import User from '../model/User';
import Portfolio from '../model/Portfolio';

interface HomeProps {
  user: User;
  portfolio: Portfolio;
}

const Home: React.FC<HomeProps> = ({ user, portfolio }) => {
  const { skills } = portfolio;
  const { languages, frameworks, technologies } = skills;

  useEffect(() => {
    document.title = user.name;
  }, []);

  return (
    <>
      <section className="home">
        <MemberIntroductionComponent
          user={user}
          languages={languages}
          frameworks={frameworks}
          technologies={technologies}
        />

        <PortfolioComponent portfolio={portfolio} />

        <ContactComponent user={user} />
      </section>
    </>
  );
}

export default Home;
