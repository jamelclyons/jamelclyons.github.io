import { camelCaseToSnakeCase } from '../utilities/String';

class Model {
  isEmpty(): boolean {
    const properties = Object.entries(this);

    for (const [key, value] of properties) {
      if (
        value !== null &&
        value !== undefined &&
        ((typeof value === 'string' && value.trim() !== '') ||
          (Array.isArray(value) && value.length > 0) ||
          (typeof value === 'object' && Object.keys(value).length > 0))
      ) {
        return false;
      }
    }

    return true;
  }

  toObject(): Record<string, any> {
    const properties = Object.entries(this);
    let object: Record<string, any> = {};
  
    properties.forEach(([key, value]) => {
      const capitalLetterRegex = /[A-Z]/;
      let finalKey = key;
  
      if (capitalLetterRegex.test(key)) {
        finalKey = camelCaseToSnakeCase(key);
      }
  
      if (value instanceof Set) {
        object[finalKey] = Array.from(value);
      } else if (value instanceof Model) {
        object[finalKey] = value.toObject();
      } else {
        object[finalKey] = value;
      }
    });
  
    return object;
  }
}

export default Model;
