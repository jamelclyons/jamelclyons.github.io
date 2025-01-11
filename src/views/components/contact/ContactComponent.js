import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageCardComponent from './MessageCardComponent';
import StatusBarComponent from '../StatusBarComponent';
import { getContactPageContent } from '../../../controllers/contactSlice';
import { setMessage, setMessageType } from '../../../controllers/messageSlice';
var ContactComponent = function (_a) {
    var user = _a.user;
    var dispatch = useDispatch();
    var _b = useSelector(function (state) { return state.contact; }), contactErrorMessage = _b.contactErrorMessage, contactSuccessMessage = _b.contactSuccessMessage, contactPage = _b.contactPage;
    useEffect(function () {
        dispatch(getContactPageContent());
    }, [dispatch]);
    useEffect(function () {
        if (contactSuccessMessage) {
            dispatch(setMessageType('success'));
            dispatch(setMessage(contactSuccessMessage));
            setTimeout(function () {
                window.location.href = "/";
            }, 3000);
        }
    }, [contactSuccessMessage]);
    useEffect(function () {
        if (contactErrorMessage) {
            dispatch(setMessageType('error'));
            dispatch(setMessage(contactErrorMessage));
        }
    }, [contactErrorMessage]);
    useEffect(function () {
        if (contactPage === null || contactPage === void 0 ? void 0 : contactPage.message) {
            dispatch(setMessage(contactPage.message));
        }
    }, [contactPage]);
    return (_jsxs("main", { children: [(contactPage === null || contactPage === void 0 ? void 0 : contactPage.title) && _jsx("h2", { className: "title", children: contactPage.title }), _jsx("div", { className: "contact-card card", children: _jsx(MessageCardComponent, { page: '/contact' }) }), _jsx(StatusBarComponent, {})] }));
};
export default ContactComponent;
