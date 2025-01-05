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
const AddProject = lazy(() => import('./views/ProjectAdd'));
const NotFound = lazy(() => import('./views/NotFound'));

import {
  getUser,
  getOrganizations,
  getRepos
} from './controllers/githubSlice';
import { getPortfolio } from './controllers/portfolioSlice';
import {
  getLanguages,
  getProjectTypes,
  getFrameworks,
  getTechnologies,
} from './controllers/taxonomiesSlice';

import type { AppDispatch, RootState } from './model/store';
import Repo from './model/Repo';
import User from './model/User';
import Project from './model/Project';
import Portfolio from './model/Portfolio';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { userObject, organizations } = useSelector((state: RootState) => state.github);
  const { portfolioObject } = useSelector((state: RootState) => state.portfolio);
  const { projectTypesObject, languagesObject, frameworksObject, technologiesObject } = useSelector(
    (state: RootState) => state.taxonomies
  );

  const [portfolio, setPortfolio] = useState<Portfolio>(new Portfolio);

  const user = new User(userObject);


  useEffect(() => {
    document.title = user?.name;
  }, []);

  useEffect(() => {
    dispatch(getProjectTypes());
  }, []);

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  useEffect(() => {
    dispatch(getFrameworks());
  }, []);

  useEffect(() => {
    dispatch(getTechnologies());
  }, []);

  useEffect(() => {
    if (user.id) {
      dispatch(getUser(user?.id));
    }
  }, [user.id]);

  useEffect(() => {
    if (user.id) {
      dispatch(getOrganizations());
    }
  }, [user.id]);

  // useEffect(() => {
  //   if (organizations) {
  //     userType?.setOrganizations(organizations);
  //   }
  // }, [organizations]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const reposObject = await dispatch(getRepos()).unwrap();

      let repos: Array<Repo> = [];

      if (Array.isArray(reposObject) && reposObject.length > 0) {
        reposObject.forEach((repo) => {
          repos.push(new Repo(repo));
        });
      }

      dispatch(getPortfolio(repos));
    }

    if (user.id) {
      fetchPortfolio();
    }
  }, [dispatch, user.id]);

  useEffect(() => {
    if (
      portfolioObject ||
      projectTypesObject ||
      languagesObject ||
      frameworksObject ||
      technologiesObject
    ) {
      setPortfolio(new Portfolio(
        portfolioObject,
        projectTypesObject,
        languagesObject,
        frameworksObject,
        technologiesObject
      ));
    }
  }, [portfolioObject,
    projectTypesObject,
    languagesObject,
    frameworksObject,
    technologiesObject]);

  return (
    <>
      <HeaderComponent name={user.name} />
      <Router>
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route path="/" element={<Home user={user} portfolio={portfolio} />} />
            <Route path="/about" element={<About user={user} />} />
            <Route path="/portfolio" element={<PortfolioPage user={user} portfolio={portfolio} />} />
            <Route path="/portfolio/:projectID" element={<ProjectPage />} />
            <Route
              path="/projects/project-types/:taxonomy"
              element={<Search />}
            />
            <Route path="/projects/languages/:taxonomy" element={<Search />} />
            <Route path="/projects/frameworks/:taxonomy" element={<Search />} />
            <Route
              path="/projects/technologies/:taxonomy"
              element={<Search />}
            />
            <Route path="/resume" element={<Resume user={user} />} />
            <Route path="/contact" element={<Contact user={user} />} />
            <Route path="/add/project" element={<AddProject />} />
            <Route path="/add/skill" element={<AddSkill />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
      <FooterComponent
        contactMethods={user.contactMethods}
      />
    </>
  );
}

export default App;
