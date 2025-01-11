var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
var GalleryComponent = function (_a) {
    var title = _a.title, gallery = _a.gallery;
    var _b = __read(useState(0), 2), currentPhotoIndex = _b[0], setCurrentPhotoIndex = _b[1];
    var galleryRowRef = useRef(null);
    var previousPhoto = function () {
        if (currentPhotoIndex > 0) {
            setCurrentPhotoIndex(currentPhotoIndex - 1);
        }
    };
    var nextPhoto = function () {
        if (currentPhotoIndex < gallery.length - 1) {
            setCurrentPhotoIndex(currentPhotoIndex + 1);
        }
    };
    var handleTouchStart = function (e) {
        if (galleryRowRef === null || galleryRowRef === void 0 ? void 0 : galleryRowRef.current) {
            var touchStartX = e.touches[0].clientX;
            galleryRowRef.current.setAttribute('data-touch-start', touchStartX.toString());
        }
    };
    var handleTouchEnd = function (e) {
        if (galleryRowRef.current) {
            var touchStartValue = galleryRowRef.current.getAttribute('data-touch-start');
            if (touchStartValue) {
                // Calculate the difference between the starting and ending X coordinates
                var touchStartX = parseInt(touchStartValue, 10);
                var touchEndX = e.changedTouches[0].clientX;
                var deltaX = touchEndX - touchStartX;
                // Determine swipe direction based on deltaX
                if (deltaX > 50) {
                    previousPhoto(); // Swipe right
                }
                else if (deltaX < -50) {
                    nextPhoto(); // Swipe left
                }
            }
        }
    };
    return (_jsx(_Fragment, { children: gallery && gallery.length > 0 ? (_jsxs(_Fragment, { children: [title && _jsx("h5", { className: "title", children: title }), _jsxs("div", { className: "gallery", children: [currentPhotoIndex !== 0 ? (_jsx("button", { className: "arrow-left", onClick: previousPhoto, children: _jsx("h2", { children: "V" }) })) : (''), _jsx("div", { className: "gallery-row", onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd, ref: galleryRowRef, children: Array.isArray(gallery) && (_jsx("span", { className: "gallery-photo", children: _jsx("img", { className: "photo", src: gallery[currentPhotoIndex].url, alt: gallery[currentPhotoIndex].title, title: gallery[currentPhotoIndex].title }) })) }), currentPhotoIndex !== gallery.length - 1 ? (_jsx("button", { className: "arrow-right", onClick: nextPhoto, children: _jsx("h2", { children: "V" }) })) : ('')] })] })) : ('') }));
};
export default GalleryComponent;
