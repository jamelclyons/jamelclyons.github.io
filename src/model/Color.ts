import Model from './Model';

export type ColorObject = {
  id: string;
  name: string;
  value: string;
};

class Color extends Model {
  id: string;
  name: string;
  value: string;

  constructor(data: Record<string, any> | ColorObject = {}) {
    super();

    this.id = data?.id ?? '';
    this.name = data?.name ?? '';
    this.value = data?.value ?? '#000';
  }

  toColorObject(): ColorObject {
    return {
      id: this.id,
      name: this.name,
      value: this.value,
    };
  }
}

export default Color;

export const existsInSet = (color: Color, set: Set<Color>) => {
  const map = new Map(Array.from(set).map((color) => [color.id, color]));

  return map.has(color.id);
};