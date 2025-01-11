import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import ProjectsComponent from './ProjectsComponent';
import TaxList from '../TaxList';
import TaxListIcon from '../TaxListIcon';
var PortfolioComponent = function (_a) {
    var portfolio = _a.portfolio;
    var projects = portfolio.projects, projectTypes = portfolio.projectTypes, languages = portfolio.languages, frameworks = portfolio.frameworks, technologies = portfolio.technologies;
    return (_jsx(_Fragment, { children: projects.size > 0 && (_jsxs("main", { className: "portfolio", children: [_jsx("h1", { className: "title", children: "portfolio" }), _jsx(ProjectsComponent, { projects: projects }), projectTypes.size > 0 && _jsx(TaxList, { taxonomies: projectTypes, title: 'Project Types' }), languages.size > 0 && _jsx(TaxListIcon, { taxonomies: languages, title: 'Languages' }), frameworks.size > 0 && _jsx(TaxListIcon, { taxonomies: frameworks, title: 'Frameworks' }), technologies.size > 0 && _jsx(TaxListIcon, { taxonomies: technologies, title: 'Technologies' })] })) }));
};
export default PortfolioComponent;
