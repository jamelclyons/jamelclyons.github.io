import Model from './Model';
import Image from './Image';

class Gallery extends Model {
  logos: Array<Image>;
  icons: Array<Image>;
  animations: Array<Image>;
  umlDiagrams: Array<Image>;
  images: Array<Image>;

  constructor(data: Record<string, any> = {}) {
    super();

    this.logos = Array.isArray(data?.logos) ? this.toArrayImage(data.logos) : [];
    this.icons = Array.isArray(data?.icons) ? this.toArrayImage(data.icons) : [];
    this.animations = Array.isArray(data?.animations) ? this.toArrayImage(data.animations) : [];
    this.umlDiagrams = Array.isArray(data?.umlDiagrams) ? this.toArrayImage(data.umlDiagrams) : [];
    this.images = [
      ...this.logos,
      ...this.icons,
      ...this.animations,
      ...this.umlDiagrams,
    ];
  }

  toArrayImage(data: Array<Record<string, any>>) {
    const images: Array<Image> = [];

    data.forEach((image) => {
      images.push(new Image(image));
    });

    return images;
  }
}

export default Gallery;
