import { jsx as _jsx } from "react/jsx-runtime";
import ContactBar from './ContactBar';
var SocialBar = function (_a) {
    var contactMethods = _a.contactMethods;
    return (_jsx("div", { className: "footer-bar", children: _jsx(ContactBar, { contactMethods: contactMethods }) }));
};
export default SocialBar;
