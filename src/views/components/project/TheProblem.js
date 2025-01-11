import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Gallery from '../Gallery';
import ContentComponent from '../content/ContentComponent';
var TheProblem = function (_a) {
    var problem = _a.problem;
    var gallery = problem.gallery, content = problem.content;
    return (_jsx(_Fragment, { children: (gallery.images.length > 0 || (typeof content === 'string' && content !== '')) &&
            _jsxs("div", { className: "project-problem", id: "project_problem", children: [_jsx("h3", { className: "title", children: "the problem" }), _jsx(Gallery, { title: 'Problem', gallery: gallery.images }), typeof content === 'string' && content !== '' && _jsx(ContentComponent, { html: content })] }) }));
};
export default TheProblem;
