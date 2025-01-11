import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
var IconComponent = function (_a) {
    var image = _a.image;
    return (_jsx(_Fragment, { children: (image === null || image === void 0 ? void 0 : image.url) ? (_jsx("img", { src: image.url, alt: image.title, title: image.title })) : ((image === null || image === void 0 ? void 0 : image.className) && (_jsx("i", { className: image.className, title: image.title }))) }));
};
export default IconComponent;
