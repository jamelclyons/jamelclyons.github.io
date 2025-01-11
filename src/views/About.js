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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { marked } from 'marked';
import MemberInfoComponent from './components/member/MemberInfoComponent';
import ContentComponent from './components/content/ContentComponent';
import { getRepoContents } from '../controllers/githubSlice';
import { loadMarkdown } from '../controllers/contentSlice';
import RepoContent from '../model/RepoContent';
var About = function (_a) {
    var user = _a.user;
    var dispatch = useDispatch();
    var contents = useSelector(function (state) { return state.github; }).contents;
    var _b = __read(useState(), 2), content = _b[0], setContent = _b[1];
    var _c = __read(useState(), 2), markdown = _c[0], setMarkdown = _c[1];
    useEffect(function () {
        document.title = "About - ".concat(user.name);
    }, []);
    useEffect(function () {
        if (user) {
            dispatch(getRepoContents({
                owner: user.id,
                repo: user.id,
                path: ''
            }));
        }
    }, []);
    useEffect(function () {
        console.log(contents);
    }, [contents]);
    useEffect(function () {
        if (Array.isArray(contents) && contents.length > 0) {
            contents.map(function (content) {
                if (content.type === 'file') {
                    if (content.name === 'README.md') {
                        setContent(new RepoContent(content));
                    }
                }
            });
        }
    }, [contents]);
    useEffect(function () {
        if (content) {
            loadMarkdown(content.downloadURL)
                .then(function (markdown) {
                if (typeof markdown === 'string') {
                    setMarkdown(marked(markdown).valueOf());
                }
            });
        }
    }, [contents, content]);
    var handleResume = function () {
        window.location.href = '/#/resume';
    };
    return (_jsx(_Fragment, { children: _jsxs("section", { className: "about", children: [_jsx(MemberInfoComponent, { user: user }), _jsx("button", { onClick: handleResume, children: _jsx("h3", { className: "title", children: "resume" }) }), _jsx("div", { className: "story", children: typeof markdown === 'string' && markdown !== '' && _jsx(ContentComponent, { html: markdown }) }), Array.isArray(user.organizations) && user.organizations.length > 0 && (_jsxs("div", { className: "organizations", children: [_jsx("h2", { className: "title", children: user.organizations.length === 1
                                ? 'Organization'
                                : 'Organizations' }), user.organizations.map(function (organization, index) { return (_jsx("a", { href: organization.url, children: _jsx("img", { src: organization.avatarURL, alt: "".concat(organization.name, " avatar") }) }, index)); })] }))] }) }));
};
export default About;
