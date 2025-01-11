import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ImageComponent from './ImageComponent';
var ContactBar = function (_a) {
    var contactMethods = _a.contactMethods;
    var email = contactMethods.email, phone = contactMethods.phone, gitHub = contactMethods.gitHub, linkedIn = contactMethods.linkedIn, instagram = contactMethods.instagram, x = contactMethods.x;
    var mailTo = "mailto:".concat(email.value);
    var callNow = "tel:+".concat(phone.value);
    return (_jsxs("div", { className: "contact-bar", children: [mailTo && email.image &&
                _jsx("a", { href: mailTo, target: "_blank", children: _jsx(ImageComponent, { image: email.image }) }), gitHub.image &&
                _jsx("a", { href: gitHub === null || gitHub === void 0 ? void 0 : gitHub.url, target: "_blank", children: _jsx(ImageComponent, { image: gitHub.image }) }), linkedIn.image &&
                _jsx("a", { href: linkedIn.url, target: "_blank", children: _jsx(ImageComponent, { image: linkedIn.image }) }), x.image &&
                _jsx("a", { href: x.url, target: "_blank", children: _jsx(ImageComponent, { image: x.image }) }), instagram.image &&
                _jsx("a", { href: instagram.url, target: "_blank", children: _jsx(ImageComponent, { image: instagram.image }) }), callNow && phone.image &&
                _jsx("a", { href: callNow, target: "_blank", children: _jsx(ImageComponent, { image: phone.image }) })] }));
};
export default ContactBar;
