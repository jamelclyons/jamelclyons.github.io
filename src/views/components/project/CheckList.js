import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var CheckList = function (_a) {
    var checkList = _a.checkList;
    return (_jsx(_Fragment, { children: checkList ? (_jsx("div", { className: "checklist", children: Array.isArray(checkList) &&
                checkList.map(function (task, index) { return (_jsxs("span", { children: [_jsx("input", { type: "checkbox", name: "task_".concat(index), id: "task_".concat(index), checked: task.status, disabled: true }), _jsx("h4", { children: task.name })] }, index)); }) })) : ('') }));
};
export default CheckList;
