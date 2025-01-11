import { jsx as _jsx } from "react/jsx-runtime";
var ImageComponent = function (_a) {
    var image = _a.image;
    var title = image.title, className = image.className, url = image.url;
    return url ? (_jsx("img", { src: url, alt: title, title: title })) : (className && _jsx("i", { className: className, title: title }));
};
export default ImageComponent;
