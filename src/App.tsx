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

import ProtectedRoute from './ProtectedRoute';

import { getPortfolio, setPortfolioSkills, SkillsObject } from './controllers/portfolioSlice';
import {
  getLanguages,
  getProjectTypes,
  getFrameworks,
  getTechnologies,
} from './controllers/taxonomiesSlice';
import {
  getUser,
} from './controllers/userSlice';

import type { AppDispatch, RootState } from './model/store';
import Repos from './model/Repos';
import User from './model/User';
import Portfolio from './model/Portfolio';
import Skills from './model/Skills';
import Organizations from './model/Organizations';

import OrganizationPage from './views/OrganizationPage';
import Dashboard from './views/Dashboard';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { userObject } = useSelector((state: RootState) => state.user);
  const { portfolioObject, skillsObject } = useSelector((state: RootState) => state.portfolio);
  const { projectTypesObject, languagesObject, frameworksObject, technologiesObject } = useSelector(
    (state: RootState) => state.taxonomies
  );

  const [user, setUser] = useState<User>(new User(userObject));
  const [organizations, setOrganizations] = useState<Organizations>(new Organizations);
  const [repos, setRepos] = useState<Repos>();
  const [portfolio, setPortfolio] = useState<Portfolio>(new Portfolio);
  const [skills, setSkills] = useState<Skills>(new Skills(skillsObject));

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (userObject) {
      setUser(new User(userObject));
    }
  }, [userObject]);

  useEffect(()=>{
    setOrganizations(user.organizations);
  },[user]);

  useEffect(() => {
    if (user) {
      let favicon = document.getElementById("favicon");

      if (!favicon) {
        favicon = document.createElement("link");
        favicon.setAttribute("rel", "icon");
        favicon.setAttribute("type", "image/png");
        favicon.setAttribute("id", "favicon");
        document.head.appendChild(favicon);
      }

      if (user.avatarURL) {
        favicon.setAttribute("href", user.avatarURL);
      }
    }
  }, [user]);

  useEffect(() => {
    dispatch(getProjectTypes());
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getFrameworks());
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getTechnologies());
  }, [dispatch, user]);

  useEffect(() => {
    if (
      projectTypesObject &&
      languagesObject &&
      frameworksObject &&
      technologiesObject
    ) {
      const skillsPayload: SkillsObject = {
        types: projectTypesObject,
        languages: languagesObject,
        frameworks: frameworksObject,
        technologies: technologiesObject
      }

      dispatch(setPortfolioSkills(skillsPayload));
    }
  }, [
    projectTypesObject,
    languagesObject,
    frameworksObject,
    technologiesObject
  ]);

  useEffect(() => {
    if (skillsObject) {
      setSkills(new Skills(skillsObject));
    }
  }, [skillsObject]);

  useEffect(() => {
    if (user) {
      setRepos(user.repos);
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (repos && repos.collection.length > 0) {
      portfolio.getProjectsFromRepos(repos.collection);
      setPortfolio(portfolio);
    }
  }, [repos, dispatch]);

  useEffect(() => {
    if (portfolio.projects.size > 0) {
      dispatch(getPortfolio());
    }
  }, [portfolio, dispatch]);

  useEffect(() => {
    if (portfolioObject &&
      Array.isArray(portfolioObject) &&
      portfolioObject.length > 0) {
      portfolio.getProjectsFromDB(portfolioObject);
      setPortfolio(portfolio);
    }
  }, [portfolioObject]);

  return (
    <>
      <HeaderComponent name={user.name} />
      <Router>
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route path="/" element={<Home user={user} portfolio={portfolio} skills={skills} />} />
            <Route path="/about" element={<About user={user} portfolio={portfolio} skills={skills} />} />
            <Route path="/orgs/:name" element={<OrganizationPage organizations={organizations} portfolio={portfolio} skills={skills} />} />
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
        contactMethods={user.contactMethods}
      />
    </>
  );
}

export default App;
