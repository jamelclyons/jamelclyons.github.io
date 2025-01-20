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
  getOrganization,
  getOrganizations,
  getRepos,
  getRepoLanguages
} from './controllers/githubSlice';
import { getPortfolio, setPortfolioSkills, SkillsObject } from './controllers/portfolioSlice';
import {
  getLanguages,
  getProjectTypes,
  getFrameworks,
  getTechnologies,
} from './controllers/taxonomiesSlice';

import type { AppDispatch, RootState } from './model/store';
import Repo from './model/Repo';
import Repos from './model/Repos';
import User from './model/User';
import Portfolio from './model/Portfolio';
import Skills from './model/Skills';

import OrganizationPage from './views/OrganizationPage';
import Organization from './model/Organization';
import Organizations from './model/Organizations';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { userObject, organizationsObject } = useSelector((state: RootState) => state.github);
  const { portfolioObject, skillsObject } = useSelector((state: RootState) => state.portfolio);
  const { projectTypesObject, languagesObject, frameworksObject, technologiesObject } = useSelector(
    (state: RootState) => state.taxonomies
  );

  const [gitHubRepos, setGitHubRepos] = useState<Array<Repo>>();
  const [user, setUser] = useState<User>(new User(userObject));
  const [organizations, setOrganizations] = useState<Array<Organization>>();
  const [repos, setRepos] = useState<Array<Repo>>();
  const [portfolio, setPortfolio] = useState<Portfolio>(new Portfolio);
  const [skills, setSkills] = useState<Skills>(new Skills(skillsObject));

  useEffect(() => {
    if (organizationsObject) {
      const getOragizationsList = async () => {
        let organizations: Array<Record<string, any>> = [];

        if (Array.isArray(organizationsObject) && organizationsObject.length > 0) {
          const organizationPromises = organizationsObject.map(async (organization) => {
            const orgData = await dispatch(
              getOrganization(organization.login)
            ).unwrap();

            return orgData;
          });

          const resolvedOrganizations = await Promise.all(organizationPromises);
          organizations.push(...resolvedOrganizations);
        }

        setOrganizations(new Organizations(organizations).list);
      }

      getOragizationsList();
    }
  }, [organizationsObject]);

  useEffect(() => {
    if (userObject && organizations && organizations.length > 0) {
      const user = new User(userObject)
      user.setOrganizations(organizations);
      setUser(user);
    }
  }, [userObject, organizations]);

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
    if (user) {
      dispatch(getUser(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user.id) {
      dispatch(getOrganizations());
    }
  }, [dispatch, user]);

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
    const fetchRepos = async () => {
      const reposObject = await dispatch(getRepos()).unwrap();

      if (Array.isArray(reposObject) && reposObject.length > 0) {
        const repos = new Repos(reposObject);

        setGitHubRepos(repos.collection)
      }
    }

    if (user.id) {
      fetchRepos();
    }
  }, [dispatch, user.id]);

  useEffect(() => {
    const fetchRepoSkills = async (repo: Repo): Promise<Record<string, any>> => {
      const data = await dispatch(getRepoLanguages(repo)).unwrap();
      repo.setSkills(data);
      return repo.toObject();
    };

    const fetchAllRepoSkills = async () => {
      if (gitHubRepos && gitHubRepos.length > 0) {
        const fetchedRepos = await Promise.all(
          gitHubRepos.map(async (repo) => {
            const updatedRepo = await fetchRepoSkills(repo);
            return new Repo(updatedRepo);
          })
        );

        setRepos(fetchedRepos);
      }
    };

    fetchAllRepoSkills();
  }, [gitHubRepos, dispatch]);

  useEffect(() => {
    if (repos && repos.length > 0) {
      const projects = new Portfolio();
      projects.getProjectsFromRepos(repos);
      setPortfolio(projects);
    }
  }, [repos, dispatch]);

  useEffect(() => {
    if (portfolio.projects.size > 0) {
      dispatch(getPortfolio());
    }
  }, [portfolio, dispatch]);

  useEffect(() => {
    if (portfolioObject.length > 0) {
      const project = new Portfolio();
      project.getProjectsFromDB(portfolioObject);
      setPortfolio(project);
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
            <Route path="/orgs/:name" element={<OrganizationPage organizations={user.organizations} portfolio={portfolio} skills={skills} />} />
            <Route path="/portfolio" element={<PortfolioPage user={user} portfolio={portfolio} skills={skills} />} />
            <Route path="/portfolio/:owner/:projectID" element={<ProjectPage portfolio={portfolio} />} />
            <Route path="/projects/:taxonomy/:term" element={<Search portfolio={portfolio} skills={skills} />} />
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
