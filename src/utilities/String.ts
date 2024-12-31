export function camelCaseToSnakeCase(input: string) {
  return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export function camelCaseToPath(input: string) {
  return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function snakeCaseToPath(input: string) {
  return input.replace(/_/, '-');
}
