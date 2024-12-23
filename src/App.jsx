import { lazy, Suspense, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './views/components/LoadingComponent';
import HeaderComponent from './views/components/HeaderComponent.jsx';
import FooterComponent from './views/components/FooterComponent.jsx';

const Home = lazy(() => import('./views/Home.jsx'));
const About = lazy(() => import('./views/About.jsx'));
const Portfolio = lazy(() => import('./views/Portfolio.jsx'));
const Project = lazy(() => import('./views/Project.jsx'));
const Search = lazy(() => import('./views/Search.jsx'));
const Resume = lazy(() => import('./views/Resume.jsx'));
const Contact = lazy(() => import('./views/Contact.jsx'));
const AddSkill = lazy(() => import('./views/AddSkill.jsx'));
const AddProject = lazy(() => import('./views/Add.jsx'));
const NotFound = lazy(() => import('./views/NotFound.jsx'));

import { getUser } from './controllers/userSlice';
import {
  getOrganizations,
  getRepos,
  getSocialAccounts,
} from './controllers/githubSlice';

function App() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getOrganizations('jamelclyons'));
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getRepos('jamelclyons'));
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getSocialAccounts('jamelclyons'));
  // }, [dispatch]);

  return (
    <>
      <HeaderComponent name={user.name} />
      <Router>
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route exact path="/" element={<Home user={user} />} />
            <Route path="/about" element={<About user={user} />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:projectID" element={<Project />} />
            <Route
              path="/projects/project-types/:taxonomy"
              element={<Search />}
            />
            <Route path="/projects/languages/:taxonomy" element={<Search />} />
            <Route path="/projects/frameworks/:taxonomy" element={<Search />} />
            <Route path="/projects/technologies/:taxonomy" element={<Search />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/add" element={<AddProject />} />
            <Route path="/skill/add" element={<AddSkill />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
      <FooterComponent
        socialAccounts={user.socialAccounts}
        email={user.email}
      />
    </>
  );
}

export default App;
