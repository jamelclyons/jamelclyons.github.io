export function camelCaseToSnakeCase(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}
export function camelCaseToPath(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
export function snakeCaseToPath(input) {
    return input.replace(/_/, '-');
}
