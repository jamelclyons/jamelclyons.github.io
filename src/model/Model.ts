import { camelCaseToSnakeCase } from '../utilities/String';

class Model {
  toObject(): Record<string, any> {
    const properties = Object.entries(this);
    let object: Record<string, any> = {};

    properties.forEach(([key, value]) => {
      const capitalLetterRegex = /[A-Z]/;
      let finalKey = key;

      if (capitalLetterRegex.test(key)) {
        finalKey = camelCaseToSnakeCase(key);
      }

      object[finalKey] = value;
    });

    return object;
  }
}

export default Model;
