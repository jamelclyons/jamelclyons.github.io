import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Link, User, Skills, ContactMethods, Portfolio, Organization, Project } from '@the7ofdiamonds/ui-ux';
import { ContactBar } from '@the7ofdiamonds/communications';
import { getAuthenticatedUserAccount } from '@the7ofdiamonds/github-portfolio';

const HeaderComponent = lazy(() => import('@the7ofdiamonds/ui-ux')
  .then(mod => ({ default: mod.HeaderComponent })));
const LoadingComponent = lazy(() => import('@the7ofdiamonds/ui-ux')
  .then(mod => ({ default: mod.LoadingComponent })));
const FooterComponent = lazy(() => import('@the7ofdiamonds/ui-ux')
  .then(mod => ({ default: mod.FooterComponent })));

const Contact = lazy(() => import('@the7ofdiamonds/communications')
  .then(mod => ({ default: mod.ContactPage })));
const Resume = lazy(() => import('@the7ofdiamonds/communications')
  .then(mod => ({ default: mod.ResumePage })));
const UserPage = lazy(() => import('@the7ofdiamonds/communications')
  .then(mod => ({ default: mod.UserPage })));

const Dashboard = lazy(() => import('@the7ofdiamonds/github-portfolio')
  .then(mod => ({ default: mod.DashboardPage })));
const OrganizationPage = lazy(() => import('@the7ofdiamonds/github-portfolio')
  .then(mod => ({ default: mod.OrganizationPage })));
const PortfolioPage = lazy(() => import('@the7ofdiamonds/github-portfolio')
  .then(mod => ({ default: mod.PortfolioPage })));
const ProjectPage = lazy(() => import('@the7ofdiamonds/github-portfolio')
  .then(mod => ({ default: mod.ProjectPage })));
const ProjectsEditPage = lazy(() => import('@the7ofdiamonds/github-portfolio')
  .then(mod => ({ default: mod.PortfolioEditPage })));
const ProjectUpdate = lazy(() => import('@the7ofdiamonds/github-portfolio')
  .then(mod => ({ default: mod.ProjectEditPage })));
const Search = lazy(() => import('@the7ofdiamonds/github-portfolio')
  .then(mod => ({ default: mod.SearchPage })));
const SkillAdd = lazy(() => import('@the7ofdiamonds/github-portfolio')
  .then(mod => ({ default: mod.SkillAddPage })));

const About = lazy(() => import('./views/About'));
const Home = lazy(() => import('./views/Home'));
const NotFound = lazy(() => import('./views/NotFound'));
const LoginPage = lazy(() => import('./views/LoginPage'));

import ProtectedRoute from './ProtectedRoute';

import { useAppSelector, useAppDispatch } from './model/hooks';

import userJson from '../user.json';
import skillsJson from '../skills.json';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { authenticatedUserObject } = useAppSelector((state) => state.user);
  const { skillsObject } = useAppSelector((state) => state.skill);

  const [leftMenu, setLeftMenu] = useState<Link[]>([]);
  const [centerMenu, setCenterMenu] = useState<Link[]>([]);
  const [rightMenu, setRightMenu] = useState<Link[]>([]);

  const [user, setUser] = useState<User>(new User());
  const [avatarURL, setAvatarURL] = useState<string | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [skills, setSkills] = useState<Skills>(new Skills);
  const [contactMethods, setContactMethods] = useState<ContactMethods | null>();

  useEffect(() => {
    const redirect = sessionStorage.redirect;
    if (redirect) {
      sessionStorage.removeItem('redirect');
      window.history.replaceState(null, '', redirect);
    }
  }, []);

  const aboutPage = new Link();
  aboutPage.setHref('/about');
  aboutPage.setText('About');
  const portfolioPage = new Link();
  portfolioPage.setHref('/portfolio');
  portfolioPage.setText('Portfolio');
  const resumePage = new Link();
  resumePage.setHref('/resume');
  resumePage.setText('Resume');
  const contactPage = new Link();
  contactPage.setHref('/contact')
  contactPage.setText('Contact')

  useEffect(() => {
    setLeftMenu([aboutPage, portfolioPage])
  }, []);

  useEffect(() => {
    setCenterMenu([aboutPage, portfolioPage, resumePage, contactPage])
  }, []);

  useEffect(() => {
    setRightMenu([resumePage, contactPage])
  }, []);

  useEffect(() => {
    user.fromJson(userJson);
    user.setSkills(new Skills({ list: skillsJson }));
    setUser(user)
  }, []);

  useEffect(() => {
    if (!authenticatedUserObject) {
      dispatch(getAuthenticatedUserAccount());
    }
  }, [authenticatedUserObject]);

  useEffect(() => {
    if (authenticatedUserObject) {
      const authenticatedUser = new User(authenticatedUserObject);
      authenticatedUser.fromJson(userJson);
      authenticatedUser.setSkills(new Skills({ list: skillsJson }));
      setUser(authenticatedUser);
    }
  }, [authenticatedUserObject]);

  useEffect(() => {
    if (user) {
      setAvatarURL(user.avatarURL)
    }
  }, [user]);

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

  useEffect(() => {
    if (user?.portfolio || user?.organizations) {
      const combinedPortfolio = new Portfolio();

      if (user?.portfolio?.projects) {
        Array.from(user?.portfolio?.projects).map((project) => {
          combinedPortfolio.projects.add(project)
        })
      }

      user?.organizations?.list.map((org: Organization) => {
        if (org?.portfolio?.projects) {
          Array.from(org?.portfolio?.projects).forEach((project) => {
            combinedPortfolio.projects.add(project)
          })
        }
      })

      setPortfolio(combinedPortfolio)
    }
  }, [user.portfolio, user?.organizations]);

  useEffect(() => {
    if (skillsObject) {
      const skillsFromObject = new Skills(skillsObject)
      skills.list.push(...skillsFromObject.list)
      setSkills(skills);
    }
  }, [skillsObject]);

  useEffect(() => {
    setSkills(user.skills);
  }, [user]);

  useEffect(() => {
    if (user.contactMethods) {
      setContactMethods(user.contactMethods)
    }

    if (userJson && userJson.contact_methods) {
      const contacts = new ContactMethods(userJson.contact_methods);
      setContactMethods(contacts)
    }
  }, []);

  useEffect(() => {
    if (userJson && userJson.company) {
      const org = new Organization();
      org.fromJson(userJson.company);
      setOrganization(org)
    }
  }, []);

  return (
    <>
      <HeaderComponent branding={'Jamel C. Lyons'} leftMenu={leftMenu} centerMenu={centerMenu} rightMenu={rightMenu} />
      <BrowserRouter>
        <Suspense fallback={<LoadingComponent page='' />}>
          <Routes>
            <Route path="/" element={<Home user={user} portfolio={portfolio} skills={skills} />} />
            <Route path="/about" element={<About user={user} skills={skills} portfolio={portfolio} />} />
            <Route path={`/user/${user.username}`} element={<About user={user} skills={skills} portfolio={portfolio} />} />
            <Route path="/organization/:login" element={<OrganizationPage skills={skills} organization={organization} />} />
            <Route path="/user/:login" element={<UserPage />} />
            <Route path="/portfolio" element={<PortfolioPage account={user} portfolio={portfolio} skills={skills} />} />
            <Route path="/portfolio/:owner/:projectID" element={<ProjectPage account={user} portfolio={portfolio} skills={skills} />} />
            <Route path="/taxonomy/:taxonomy/:term" element={<Search user={user} skills={skills} />} />
            <Route path="/resume" element={<Resume user={user} />} />
            <Route path="/contact" element={<Contact account={user} />} />

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

            <Route path="/admin/update/project/:login/:projectID" element={
              <ProtectedRoute>
                <ProjectUpdate user={user} />
              </ProtectedRoute>
            } />

            <Route path="/admin/add/skill" element={
              <ProtectedRoute>
                <SkillAdd />
              </ProtectedRoute>
            } />

            <Route path="/login" element={<LoginPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter >
      <FooterComponent name='Jamel C. Lyons'>
        {contactMethods && <ContactBar contactMethods={contactMethods} location={'footer'} />}
      </FooterComponent>
    </>
  );
}

export default App;
