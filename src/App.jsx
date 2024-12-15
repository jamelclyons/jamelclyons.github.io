import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './views/components/LoadingComponent';
import HeaderComponent from './views/components/HeaderComponent.jsx';
import FooterComponent from './views/components/FooterComponent.jsx';

const Home = lazy(() => import('./views/Home.jsx'));
const About = lazy(() => import('./views/About.jsx'));
// const FAQ = lazy(() => import('./views/FAQ.jsx'));
// const Contact = lazy(() => import('./views/Contact.jsx'));
// const Support = lazy(() => import('./views/Support.jsx'));

// const Framework = lazy(() => import('./views/Framework.jsx'));
// const Frameworks = lazy(() => import('./views/Frameworks.jsx'));
// const Skills = lazy(() => import('./views/Skills.jsx'));
// const Skill = lazy(() => import('./views/Skill.jsx'));
// const Technology = lazy(() => import('./views/Technology.jsx'));
// const Technologies = lazy(() => import('./views/Technologies.jsx'));

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

  // useEffect(() => {
  //   dispatch(getSocialAccounts('jamelclyons'));
  // }, [dispatch]);

  return (
    <>
      <HeaderComponent name={user.name} />
      <Router>
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            {/* <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/support" element={<Support />} />
                <Route path='/frameworks/:framework' element={<Framework />} />
                <Route path='/frameworks' element={<Frameworks />} />
                <Route path="/skills/:skill" element={<Skill />} />
                <Route path="/skills" element={<Skills />} />
                <Route path='/technologies/:technology' element={<Technology />}/>
                <Route path='/technologies' element={<Technologies />}/> */}
          </Routes>
        </Suspense>
      </Router>
      <FooterComponent socialAccounts={socialAccounts} email={user.email} />
    </>
  );
}

export default App;
