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
const ProjectAdd = lazy(() => import('./views/ProjectAdd'));
const NotFound = lazy(() => import('./views/NotFound'));
const ProjectUpdate = lazy(() => import('./views/ProjectUpdate'));

import {
  getUser,
  getOrganizations,
  getRepos,
  getRepoLanguages
} from './controllers/githubSlice';
import { getPortfolio, setSkills } from './controllers/portfolioSlice';
import {
  getLanguages,
  getProjectTypes,
  getFrameworks,
  getTechnologies,
} from './controllers/taxonomiesSlice';
import {
  getProjectType,
  getFramework,
  getTechnology,
} from './controllers/taxonomiesSlice';
import { getTaxImages } from './controllers/taxonomiesSlice';

import type { AppDispatch, RootState } from './model/store';
import Repo from './model/Repo';
import User from './model/User';
import Portfolio from './model/Portfolio';
import Skills from './model/Skills';
import Taxonomy from './model/Taxonomy';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { userObject, organizations } = useSelector((state: RootState) => state.github);
  const { portfolioObject, skillsObject } = useSelector((state: RootState) => state.portfolio);
  const { projectTypesObject, languagesObject, frameworksObject, technologiesObject } = useSelector(
    (state: RootState) => state.taxonomies
  );
  
  const [gitHubRepos, setGitHubRepos] = useState<Array<Repo>>([new Repo]);
  const [repos, setRepos] = useState<Array<Repo>>();
  const [portfolio, setPortfolio] = useState<Portfolio>(new Portfolio);
  const [user, setUser] = useState<User>(new User);

  useEffect(() => {
    if (user.id) {
      dispatch(getUser(user.id));
    }
  }, [user.id]);

  useEffect(() => {
    if (user.id) {
      dispatch(getOrganizations());
    }
  }, [user.id]);

  useEffect(() => {
    if (userObject) {
      setUser(new User(userObject));
    }
  }, [userObject]);

  useEffect(() => {
    document.title = user.name;
  }, [user]);

  useEffect(() => {
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
  }, [user.avatarURL]);

  useEffect(() => {
    if (organizations) {
      user.setOrganizations(organizations);
    }
  }, [organizations]);

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
    if (
      projectTypesObject ||
      languagesObject ||
      frameworksObject ||
      technologiesObject
    ) {
      dispatch(setSkills({
        types: projectTypesObject,
        languages: languagesObject,
        frameworks: frameworksObject,
        technologies: technologiesObject
      }));
    }
  }, [
    projectTypesObject,
    languagesObject,
    frameworksObject,
    technologiesObject
  ]);

  useEffect(() => {
    const fetchRepos = async () => {
      const reposObject = await dispatch(getRepos()).unwrap();

      let repositories: Array<Repo> = []

      if (Array.isArray(reposObject) && reposObject.length > 0) {
        reposObject.forEach((repo) => {
          repositories.push(new Repo(repo));
        });

        setGitHubRepos(repositories)
      }
    }

    if (user.id) {
      fetchRepos();
    }
  }, [dispatch, user.id]);

  useEffect(() => {
    const fetchRepoSkills = async (repo: Repo): Promise<Repo> => {
      const data = await dispatch(getRepoLanguages(repo)).unwrap();
      return new Repo(data);
    };

    const fetchAllRepoSkills = async () => {
      if (gitHubRepos.length > 0) {
        const fetchedRepos = await Promise.all(
          gitHubRepos.map((repo) => fetchRepoSkills(repo))
        );

        setRepos(fetchedRepos);
      }
    };

    fetchAllRepoSkills();
  }, [gitHubRepos, dispatch]);

  useEffect(() => {
    if (repos && repos.length > 0) {
      dispatch(getPortfolio(repos));
    }
  }, [repos, dispatch]);

  useEffect(() => {
    if (portfolioObject || skillsObject) {
      setPortfolio(new Portfolio(portfolioObject, new Skills(skillsObject)));
    }
  }, [portfolioObject, skillsObject]);

  return (
    <>
      <HeaderComponent name={user.name} />
      <Router>
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route path="/" element={<Home user={user} portfolio={portfolio} />} />
            <Route path="/about" element={<About user={user} />} />
            <Route path="/portfolio" element={<PortfolioPage user={user} portfolio={portfolio} />} />
            <Route path="/portfolio/:projectID" element={<ProjectPage portfolio={portfolio} />} />
            <Route path="/projects/:taxonomy/:term" element={<Search portfolio={portfolio} />} />
            <Route path="/resume" element={<Resume user={user} />} />
            <Route path="/contact" element={<Contact user={user} />} />
            <Route path="/add/project" element={<ProjectAdd />} />
            <Route path="/update/project/:projectID" element={<ProjectUpdate />} />
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
