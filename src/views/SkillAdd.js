import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import AddFrameworks from './components/add/AddFrameworks';
import AddLanguages from './components/add/AddLanguages';
import AddProjectTypes from './components/add/AddProjectTypes';
import AddTechnologies from './components/add/AddTechnologies';
var AddSkill = function () {
    return (_jsx("section", { className: "add", children: _jsxs(_Fragment, { children: [_jsx(AddLanguages, {}), _jsx(AddFrameworks, {}), _jsx(AddProjectTypes, {}), _jsx(AddTechnologies, {})] }) }));
};
export default AddSkill;
