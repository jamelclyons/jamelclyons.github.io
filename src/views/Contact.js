import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ContactComponent from './components/contact/ContactComponent';
import { setShowStatusBar } from '../controllers/messageSlice';
var Contact = function (_a) {
    var user = _a.user;
    var dispatch = useDispatch();
    useEffect(function () {
        document.title = "Contact - ".concat(user === null || user === void 0 ? void 0 : user.name);
    }, []);
    useEffect(function () {
        dispatch(setShowStatusBar('show'));
    }, []);
    return (_jsx(_Fragment, { children: _jsx("section", { className: "contact", children: _jsx(ContactComponent, { user: user }) }) }));
};
export default Contact;
