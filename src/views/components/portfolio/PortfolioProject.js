import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import ProjectDescription from './ProjectDescription';
var PortfolioProject = function (_a) {
    var project = _a.project;
    var id = project.id, title = project.title, description = project.description, solution = project.solution;
    var navigate = useNavigate();
    var handleClick = function (path) {
        navigate(path, { state: project });
    };
    return (_jsx("button", { className: 'project', onClick: function () { return handleClick("/portfolio/".concat(id)); }, children: _jsxs("div", { className: "project-card card", children: [_jsx("h2", { className: "title", children: title }), Array.isArray(solution.gallery.images) &&
                    solution.gallery.images.length > 0 ? (_jsx("img", { className: "photo", src: solution.gallery.images[0].url, alt: solution.gallery.images[0].title })) : (''), _jsx(ProjectDescription, { description: description })] }) }));
};
export default PortfolioProject;
