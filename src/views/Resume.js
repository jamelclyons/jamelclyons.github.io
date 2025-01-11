import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
var Resume = function (_a) {
    var user = _a.user;
    useEffect(function () {
        document.title = "Resume - ".concat(user === null || user === void 0 ? void 0 : user.name);
    }, []);
    return (_jsx("section", { className: "resume", children: _jsx("main", { children: _jsx("iframe", { id: "pdfViewer", src: "../../Resume.pdf" }) }) }));
};
export default Resume;
