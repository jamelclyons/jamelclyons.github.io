var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import IconComponent from '../IconComponent';
var MemberKnowledgeComponent = function (_a) {
    var languages = _a.languages, frameworks = _a.frameworks, technologies = _a.technologies;
    var arrayLang = Array.from(languages);
    var arrayFrame = Array.from(frameworks);
    var arrayTech = Array.from(technologies);
    var knowledge = __spreadArray(__spreadArray(__spreadArray([], __read(arrayLang), false), __read(arrayFrame), false), __read(arrayTech), false);
    var skillsSlideRef = useRef(null);
    useEffect(function () {
        var skillsSlide = skillsSlideRef.current;
        if (skillsSlide) {
            var totalSkills = skillsSlide.children.length;
            if (skillsSlide.dataset.cloned) {
                for (var i = 0; i < totalSkills; i++) {
                    var clonedNode = skillsSlide.children[i].cloneNode(true);
                    skillsSlide.appendChild(clonedNode);
                }
                skillsSlide.dataset.cloned = "true";
                document.documentElement.style.setProperty("--total-skills", "".concat(totalSkills));
            }
        }
    }, [knowledge]);
    return (_jsx(_Fragment, { children: _jsx("div", { className: "author-knowledge", children: _jsx("div", { className: "author-knowledge-slide", ref: skillsSlideRef, children: Array.isArray(knowledge) &&
                    knowledge.length > 0 &&
                    knowledge.map(function (knowledge, index) { return (_jsx(IconComponent, { image: knowledge.image }, index)); }) }) }) }));
};
export default MemberKnowledgeComponent;
