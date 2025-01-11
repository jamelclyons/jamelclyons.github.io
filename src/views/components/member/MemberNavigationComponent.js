import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
var MemberNavigationComponent = function (_a) {
    var resume = _a.resume, portfolioElement = _a.portfolioElement;
    var scrollToSection = function (sectionId) {
        var section = document.getElementById(sectionId);
        if (section) {
            var offsetTopPx = section.getBoundingClientRect().top + window.scrollY;
            var paddingTopPx = 137.5;
            var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            var paddingTopRem = paddingTopPx / 16;
            var paddingTopBackToPx = paddingTopRem * rootFontSize;
            var topPx = offsetTopPx - paddingTopBackToPx;
            window.scrollTo({
                top: topPx,
                behavior: 'smooth',
            });
        }
    };
    var openResumeInNewTab = function () {
        window.open('resume', '_blank');
    };
    return (_jsx(_Fragment, { children: resume != null || portfolioElement != null ? (_jsxs("nav", { className: "author-nav", children: [portfolioElement ? (_jsxs(_Fragment, { children: [_jsx("button", { onClick: function () { return scrollToSection('author_intro'); }, id: "founder_button", children: _jsx("h3", { className: "title", children: "intro" }) }), _jsx("button", { onClick: function () { return scrollToSection('seven_tech_portfolio'); }, id: "portfolio_button", children: _jsx("h3", { className: "title", children: "PORTFOLIO" }) })] })) : (''), resume ? (_jsx("button", { onClick: openResumeInNewTab, children: _jsx("h3", { className: "title", children: "R\u00C9SUM\u00C9" }) })) : ('')] })) : ('') }));
};
export default MemberNavigationComponent;
