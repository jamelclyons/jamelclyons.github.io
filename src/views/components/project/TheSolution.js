import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import FeaturesComponent from './FeaturesComponent';
import PricingComponent from './PricingComponent';
import ProjectURLsComponent from './ProjectURLsComponent';
import GalleryComponent from '../Gallery';
import ContentComponent from '../content/ContentComponent';
var TheSolution = function (_a) {
    var _b, _c, _d;
    var solution = _a.solution;
    var features = solution.features, currency = solution.currency, price = solution.price, urlsList = solution.urlsList, gallery = solution.gallery, content = solution.content;
    return (_jsx(_Fragment, { children: (features.size > 0 ||
            currency ||
            price > 0 ||
            ((_b = urlsList === null || urlsList === void 0 ? void 0 : urlsList.homepage) === null || _b === void 0 ? void 0 : _b.url) === '' || ((_c = urlsList === null || urlsList === void 0 ? void 0 : urlsList.ios) === null || _c === void 0 ? void 0 : _c.url) === '' || ((_d = urlsList === null || urlsList === void 0 ? void 0 : urlsList.android) === null || _d === void 0 ? void 0 : _d.url) === '' ||
            gallery.images.length > 0 ||
            typeof content === 'string') &&
            _jsxs("div", { className: "project-solution", id: "project_solution", children: [gallery.images.length > 0 && _jsx(GalleryComponent, { gallery: gallery.images, title: '' }), features.size > 0 && _jsx(FeaturesComponent, { features: features }), currency && price > 0 && _jsx(PricingComponent, { currency: currency, price: price }), urlsList && _jsx(ProjectURLsComponent, { projectUrls: urlsList }), _jsx("h3", { children: "THE SOLUTION" }), typeof content === 'string' && _jsx(ContentComponent, { html: content })] }) }));
};
export default TheSolution;
