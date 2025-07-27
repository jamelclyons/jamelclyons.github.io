import React, { useEffect, useState } from 'react';

import { StatusBar, Section, Portfolio } from '@the7ofdiamonds/ui-ux';
import { ContactComponent, UserIntroductionComponent, UserKnowledgeComponent } from '@the7ofdiamonds/communications';
import { PortfolioComponent } from '@the7ofdiamonds/github-portfolio';
import { User, Skills } from '@the7ofdiamonds/ui-ux';

import { useAppSelector } from '@/model/hooks';

interface HomeProps {
  user: User;
  portfolio: Portfolio | null;
  skills: Skills | null;
}

const Home: React.FC<HomeProps> = ({ user, portfolio, skills }) => {
  const { githubLoading, githubLoadingMessage } = useAppSelector((state) => state.github);
  const { userLoading, userLoadingMessage } = useAppSelector((state) => state.user);

  const [title, setTitle] = useState<string | null>(null);

  const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');
  const [messageType, setMessageType] = useState<'info' | 'error' | 'success'>('info');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (user.name) {
      setTitle(`${user.name}`)
    }
  }, [user]);

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  useEffect(() => {
    if (userLoading || githubLoading) {
      setShowStatusBar('show')
      setMessageType('info');
    }
  }, [userLoading, githubLoading]);

  useEffect(() => {
    if (!userLoadingMessage || !githubLoadingMessage) {
      setMessage(null);
    }
  }, [userLoadingMessage, githubLoadingMessage]);

  useEffect(() => {
    if (userLoadingMessage) {
      setMessage(userLoadingMessage);
    }

    if (githubLoadingMessage) {
      setMessage(githubLoadingMessage);
    }
  }, [userLoadingMessage, githubLoadingMessage]);

  return (
    <>
      <Section>
        <UserIntroductionComponent user={user} />

        <UserKnowledgeComponent skills={skills} />

        <PortfolioComponent portfolio={portfolio} skills={skills} />

        <ContactComponent />

        {showStatusBar && message && <StatusBar show={showStatusBar} messageType={messageType} message={message} />}
      </Section>
    </>
  );
}

export default Home;
