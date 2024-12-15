import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './model/store.js';

import LoadingComponent from './views/components/LoadingComponent';

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

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Suspense fallback={<LoadingComponent />}>
            <Routes>
              <Route path="/" element={<About />} />
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
      </Provider>
    </>
  );
}

export default App;