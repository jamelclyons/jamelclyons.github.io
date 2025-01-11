import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MemberKnowledgeComponent from './MemberKnowledgeComponent';
import MemberInfoComponent from './MemberInfoComponent';
var MemberIntroductionComponent = function (_a) {
    var user = _a.user, languages = _a.languages, frameworks = _a.frameworks, technologies = _a.technologies;
    return (_jsxs("div", { className: "author-intro", children: [_jsx(MemberInfoComponent, { user: user }), _jsx(MemberKnowledgeComponent, { languages: languages, frameworks: frameworks, technologies: technologies })] }));
};
export default MemberIntroductionComponent;
