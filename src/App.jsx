import { lazy, Suspense, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './views/components/LoadingComponent';
import HeaderComponent from './views/components/HeaderComponent.jsx';
import FooterComponent from './views/components/FooterComponent.jsx';

const Home = lazy(() => import('./views/Home.jsx'));
const About = lazy(() => import('./views/About.jsx'));
const Portfolio = lazy(() => import('./views/Portfolio.jsx'));
const Resume = lazy(() => import('./views/Resume.jsx'));
const Contact = lazy(() => import('./views/Contact.jsx'));

import {
  getUser,
  getOrganizations,
  getRepos,
  getSocialAccounts,
} from './controllers/githubSlice';

function App() {
  const dispatch = useDispatch();

  const { user, socialAccounts } = useSelector((state) => state.github);

  useEffect(() => {
    dispatch(getUser('jamelclyons'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrganizations('jamelclyons'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRepos('jamelclyons'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSocialAccounts('jamelclyons'));
  }, [dispatch]);

  return (
    <>
      <HeaderComponent name={user.name} />
      <Router>
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route exact path="/" element={<Home user={user} />} />
            <Route path="/about" element={<About user={user} />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </Router>
      <FooterComponent socialAccounts={socialAccounts} email={user.email} />
    </>
  );
}

export default App;
