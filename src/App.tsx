import React, { lazy, Suspense, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './views/components/LoadingComponent';
import HeaderComponent from './views/components/HeaderComponent';
import FooterComponent from './views/components/FooterComponent';

const Home = lazy(() => import('./views/Home'));
const About = lazy(() => import('./views/About'));
const PortfolioPage = lazy(() => import('./views/PortfolioPage'));
const ProjectPage = lazy(() => import('./views/ProjectPage'));
const Search = lazy(() => import('./views/Search'));
const Resume = lazy(() => import('./views/Resume'));
const Contact = lazy(() => import('./views/Contact'));
const AddSkill = lazy(() => import('./views/SkillAdd'));
const ProjectsEditPage = lazy(() => import('./views/ProjectsEditPage'));
const NotFound = lazy(() => import('./views/NotFound'));
const ProjectUpdate = lazy(() => import('./views/ProjectUpdate'));
const LoginPage = lazy(() => import('./views/LoginPage'));
const UserPage = lazy(() => import('./views/UserPage'));

import ProtectedRoute from './ProtectedRoute';

import { setPortfolioSkills } from './controllers/portfolioSlice';

import {
  getAccount,
} from './controllers/accountSlice';

import type { AppDispatch, RootState } from './model/store';

import OrganizationPage from './views/OrganizationPage';
import Dashboard from './views/Dashboard';
import Account from './model/Account';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { accountLoading, accountObject } = useSelector((state: RootState) => state.account);

  const [account, setAccount] = useState<Account>(new Account());

  const { user, skills, portfolio } = account;
  const { name, avatarURL, organizations, contactMethods } = user;

  useEffect(() => {
    dispatch(getAccount());
  }, [dispatch]);

  useEffect(() => {
    if (accountObject) {
      setAccount(new Account(accountObject));
    }
  }, [accountObject]);

  useEffect(() => {
    if (skills.count > 0) {
      dispatch(setPortfolioSkills(skills.toObject()))
    }
  }, [skills, dispatch]);

  useEffect(() => {
    if (avatarURL) {
      let favicon = document.getElementById("favicon");

      if (!favicon) {
        favicon = document.createElement("link");
        favicon.setAttribute("rel", "icon");
        favicon.setAttribute("type", "image/png");
        favicon.setAttribute("id", "favicon");
        document.head.appendChild(favicon);
      }

      if (avatarURL) {
        favicon.setAttribute("href", avatarURL);
      }
    }
  }, [avatarURL]);

  if (accountLoading) {
    return (
      <section>
        <>
          <LoadingComponent />
        </>
      </section>
    );
  }

  return (
    <>
      <HeaderComponent name={name} />
      <Router>
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route path="/" element={<Home user={user} portfolio={portfolio} skills={skills} />} />
            <Route path="/about" element={<About user={user} portfolio={portfolio} skills={skills} />} />
            <Route path="/organization/:login" element={<OrganizationPage organizations={organizations} portfolio={portfolio} skills={skills} />} />
            <Route path="/user/:login" element={<UserPage />} />
            <Route path="/portfolio" element={<PortfolioPage user={user} portfolio={portfolio} skills={skills} />} />
            <Route path="/portfolio/:owner/:projectID" element={<ProjectPage portfolio={portfolio} />} />
            <Route path="/projects/:taxonomy/:term" element={<Search portfolio={portfolio} skills={skills} />} />
            <Route path="/resume" element={<Resume user={user} />} />
            <Route path="/contact" element={<Contact user={user} />} />

            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/update/projects" element={
              <ProtectedRoute>
                <ProjectsEditPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/update/project/:owner/:projectID" element={
              <ProtectedRoute>
                <ProjectUpdate />
              </ProtectedRoute>
            } />
            <Route path="/admin/add/skill" element={
              <ProtectedRoute>
                <AddSkill />
              </ProtectedRoute>
            } />

            <Route path="/login" element={<LoginPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router >
      <FooterComponent
        contactMethods={contactMethods}
      />
    </>
  );
}

export default App;
