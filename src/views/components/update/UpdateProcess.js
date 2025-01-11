import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import UpdateStatus from './UpdateStatus';
import UpdateDesign from '../update/UpdateDesign';
import UpdateDevelopment from '../update/UpdateDevelopment';
import UpdateDelivery from '../update/UpdateDelivery';
var UpdateProcess = function (_a) {
    var projectID = _a.projectID, process = _a.process;
    var status = process.status, design = process.design, development = process.development, delivery = process.delivery;
    return (_jsxs(_Fragment, { children: [_jsx("h1", { className: 'title', children: "process" }), _jsx(UpdateStatus, { projectID: projectID, status: status }), _jsx(UpdateDesign, { projectID: projectID, design: design }), _jsx(UpdateDevelopment, { projectID: projectID, development: development }), _jsx(UpdateDelivery, { projectID: projectID, delivery: delivery })] }));
};
export default UpdateProcess;
