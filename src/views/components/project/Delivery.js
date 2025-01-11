import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import CheckList from './CheckList';
import Gallery from '../Gallery';
import ContentComponent from '../content/ContentComponent';
var Delivery = function (_a) {
    var delivery = _a.delivery;
    var checkList = delivery.checkList, gallery = delivery.gallery, content = delivery.content;
    return (_jsx(_Fragment, { children: checkList.length > 0 ||
            (typeof content === 'string' && content !== '') ||
            gallery.length > 0 &&
                _jsxs("div", { className: "project-process-delivery", id: "project_process_delivery", children: [_jsx("h4", { className: "title", children: "delivery" }), checkList.length > 0 && _jsx(CheckList, { checkList: checkList }), gallery.length > 0 && _jsx(Gallery, { gallery: gallery, title: '' }), typeof content === 'string' && content !== '' && _jsx(ContentComponent, { html: content })] }) }));
};
export default Delivery;
