import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PortfolioComponent from './components/portfolio/PortfolioComponent';
import MemberIntroductionComponent from './components/member/MemberComponent';
import ContactComponent from './components/contact/ContactComponent';
import MemberKnowledgeComponent from './components/member/MemberKnowledgeComponent';
import LoadingComponent from './components/LoadingComponent';

import type { AppDispatch, RootState } from '@/model/store';
import Account from '@/model/Account';

import { setMessage, setMessageType, setShowStatusBar } from '@/controllers/messageSlice';

interface HomeProps {
  account: Account;
}

const Home: React.FC<HomeProps> = ({ account }) => {
  const { user, skills, portfolio } = account;

  const dispatch = useDispatch<AppDispatch>();

  const { accountLoading } = useSelector((state: RootState) => state.account);

  useEffect(() => {
    document.title = user.name;
  }, []);

  useEffect(() => {
    if (accountLoading) {
      dispatch(setShowStatusBar('show'));
      dispatch(setMessageType('info'));
      dispatch(setMessage('Now loading home page'));
    }
  }, [accountLoading]);

  return (
    <>
      {<section className="home">
        <MemberIntroductionComponent
          user={user}
        />

        <MemberKnowledgeComponent skills={skills} />

        {portfolio.size > 0 ? <PortfolioComponent portfolio={portfolio} /> : <LoadingComponent />}

        <ContactComponent user={user} />
      </section>}
    </>
  );
}

export default Home;
