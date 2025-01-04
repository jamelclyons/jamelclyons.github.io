import React, { lazy, Suspense, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './views/components/LoadingComponent';
import HeaderComponent from './views/components/HeaderComponent';
import FooterComponent from './views/components/FooterComponent';

const Home = lazy(() => import('./views/Home'));
const About = lazy(() => import('./views/About'));
const Portfolio = lazy(() => import('./views/Portfolio'));
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

import type { AppDispatch, RootState } from './model/store';
import Repo from './model/Repo';
import User from './model/User';
import Project from './model/Project';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, organizations } = useSelector((state: RootState) => state.github);
  const { portfolio } = useSelector((state: RootState) => state.portfolio);

  const userType = user as User;
  const portfolioType = portfolio as Set<Project>;

  useEffect(() => {
    if (user?.id) {
      dispatch(getUser(user?.id));
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      dispatch(getOrganizations());
    }
  }, [user?.id]);

  // useEffect(() => {
  //   if (organizations) {
  //     userType?.setOrganizations(organizations);
  //   }
  // }, [organizations]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const repos = await dispatch(getRepos()).unwrap() as Array<Repo>;

      dispatch(getPortfolio(repos)).unwrap();
    }

    if (user?.id) {
      fetchPortfolio();
    }
  }, [dispatch, user?.id]);

  return (
    <>
      <HeaderComponent name={user?.name} />
      <Router>
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route path="/" element={<Home user={userType} portfolio={portfolioType} />} />
            <Route path="/about" element={<About user={userType} />} />
            <Route path="/portfolio" element={<Portfolio user={userType} portfolio={portfolioType} />} />
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
            <Route path="/resume" element={<Resume user={userType} />} />
            <Route path="/contact" element={<Contact user={userType} />} />
            <Route path="/add/project" element={<AddProject />} />
            <Route path="/add/skill" element={<AddSkill />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
      <FooterComponent
        contactMethods={userType.contactMethods}
      />
    </>
  );
}

export default App;
