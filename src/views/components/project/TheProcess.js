import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import ProjectStatusComponent from '../ProjectStatusComponent';
import Design from './Design';
import Development from './Development';
import Delivery from './Delivery';
var TheProcess = function (_a) {
    var process = _a.process;
    var status = process.status, design = process.design, development = process.development, delivery = process.delivery;
    return (_jsx(_Fragment, { children: (status || design || development || delivery) &&
            _jsxs("div", { className: "project-process", id: "project_process", children: [_jsx("h3", { className: "title", children: "the process" }), _jsx(ProjectStatusComponent, { projectStatus: status }), _jsx(Design, { design: design }), _jsx(Development, { development: development }), _jsx(Delivery, { delivery: delivery })] }) }));
};
export default TheProcess;
