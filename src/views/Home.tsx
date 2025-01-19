import React, { useEffect } from 'react';

import PortfolioComponent from './components/portfolio/PortfolioComponent';
import MemberIntroductionComponent from './components/member/MemberComponent';
import ContactComponent from './components/contact/ContactComponent';
import MemberKnowledgeComponent from './components/member/MemberKnowledgeComponent';

import User from '../model/User';
import Portfolio from '../model/Portfolio';
import Skills from '@/model/Skills';

interface HomeProps {
  user: User;
  portfolio: Portfolio;
  skills: Skills;
}

const Home: React.FC<HomeProps> = ({ user, portfolio, skills }) => {

  useEffect(() => {
    document.title = user.name;
  }, []);

  return (
    <>
      <section className="home">
        <MemberIntroductionComponent
          user={user}
        />

        <MemberKnowledgeComponent skills={skills} />

        <PortfolioComponent portfolio={portfolio} skills={skills} />

        <ContactComponent user={user} />
      </section>
    </>
  );
}

export default Home;
