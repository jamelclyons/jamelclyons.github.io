import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import PortfolioComponent from './components/portfolio/PortfolioComponent';
import MemberIntroductionComponent from './components/member/MemberComponent';
import ContactComponent from './components/contact/ContactComponent';
var Home = function (_a) {
    var user = _a.user, portfolio = _a.portfolio;
    var languages = portfolio.languages, frameworks = portfolio.frameworks, technologies = portfolio.technologies;
    useEffect(function () {
        document.title = user.name;
    }, []);
    return (_jsx(_Fragment, { children: _jsxs("section", { className: "home", children: [_jsx(MemberIntroductionComponent, { user: user, languages: languages, frameworks: frameworks, technologies: technologies }), _jsx(PortfolioComponent, { portfolio: portfolio }), _jsx(ContactComponent, { user: user })] }) }));
};
export default Home;
