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

import type { AppDispatch, RootState } from '@/model/store';
import Skills from './model/Skills';
import User from './model/User';

import OrganizationPage from './views/OrganizationPage';
import Dashboard from './views/Dashboard';

import { getAuthenticatedUserAccount } from '@/controllers/userSlice';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { authenticatedUserObject } = useSelector((state: RootState) => state.user);
  const { skillsObject } = useSelector((state: RootState) => state.taxonomies);

  const [user, setUser] = useState<User>(new User(authenticatedUserObject ?? {}));
  const [skills, setSkills] = useState<Skills>(new Skills());

  const { name, avatarURL, contactMethods } = user;

  useEffect(() => {
    if (authenticatedUserObject === null) {
      dispatch(getAuthenticatedUserAccount());
    }
  }, [authenticatedUserObject, dispatch]);

  useEffect(() => {
    if (authenticatedUserObject) {
      console.log(authenticatedUserObject)
      setUser(new User(authenticatedUserObject));
    }
  }, [authenticatedUserObject]);

  useEffect(() => {
    if (skillsObject) {
      setSkills(new Skills(skillsObject));
    }
  }, [skillsObject]);

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

  return (
    <>
      <HeaderComponent name={name} />
      <Router>
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route path="/" element={<Home user={user} skills={skills} />} />
            <Route path="/about" element={<About user={user} skills={skills} />} />
            <Route path="/organization/:login" element={<OrganizationPage />} />
            <Route path="/user/:login" element={<UserPage />} />
            <Route path="/portfolio" element={<PortfolioPage user={user} />} />
            <Route path="/portfolio/:owner/:projectID" element={<ProjectPage user={user} />} />
            <Route path="/projects/:taxonomy/:term" element={<Search user={user} skills={skills} />} />
            <Route path="/resume" element={<Resume user={user} />} />
            <Route path="/contact" element={<Contact user={user} />} />

            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/update/portfolio" element={
              <ProtectedRoute>
                <ProjectsEditPage user={user} />
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
