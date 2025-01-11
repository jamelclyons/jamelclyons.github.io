export var Privacy;
(function (Privacy) {
    Privacy["Private"] = "private";
    Privacy["Public"] = "public";
})(Privacy || (Privacy = {}));
export function privacyFromString(privacy) {
    if (Object.values(Privacy).includes(privacy)) {
        return privacy;
    }
    throw new Error('Invalid privacy value');
}
