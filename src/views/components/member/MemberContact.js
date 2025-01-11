import { jsx as _jsx } from "react/jsx-runtime";
import ContactBar from '../ContactBar';
var MemberContact = function (_a) {
    var contactMethods = _a.contactMethods;
    return (_jsx("div", { className: "author-contact", children: _jsx(ContactBar, { contactMethods: contactMethods }) }));
};
export default MemberContact;
