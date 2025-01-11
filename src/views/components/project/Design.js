import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import CheckList from './CheckList';
import Colors from './Colors';
import Gallery from '../Gallery';
import ContentComponent from '../content/ContentComponent';
var Design = function (_a) {
    var design = _a.design;
    var checkList = design.checkList, colorsList = design.colorsList, gallery = design.gallery, content = design.content;
    var logos = gallery.logos, icons = gallery.icons, animations = gallery.animations, umlDiagrams = gallery.umlDiagrams;
    return (_jsx(_Fragment, { children: (checkList.length > 0 ||
            colorsList.length > 0 ||
            logos.length > 0 || icons.length > 0 || animations.length > 0 || umlDiagrams.length > 0 ||
            (typeof content === 'string' && content !== '')) &&
            _jsxs("div", { className: "project-process-design", id: "project_process_design", children: [_jsx("h4", { className: "title", children: "design" }), checkList.length > 0 && _jsx(CheckList, { checkList: checkList }), colorsList.length > 0 && _jsx(Colors, { colors: colorsList }), logos.length > 0 && _jsx(Gallery, { title: 'Logos', gallery: logos }), icons.length > 0 && _jsx(Gallery, { title: 'icons', gallery: icons }), animations.length > 0 && _jsx(Gallery, { title: 'animations', gallery: animations }), umlDiagrams.length > 0 && _jsx(Gallery, { title: 'uml diagrams', gallery: umlDiagrams }), typeof content === 'string' && _jsx(ContentComponent, { html: content })] }) }));
};
export default Design;
