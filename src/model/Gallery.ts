import Image, { ImageObject } from './Image';
import Model from './Model';

export type GalleryObject = {
  logos: Array<ImageObject>;
  icons: Array<ImageObject>;
  animations: Array<ImageObject>;
  uml_diagrams: Array<ImageObject>;
};

class Gallery extends Model {
  logos: Array<Image>;
  icons: Array<Image>;
  animations: Array<Image>;
  umlDiagrams: Array<Image>;
  images: Array<Image>;

  constructor(data: Record<string, any> | GalleryObject = {}) {
    super()
    
    this.logos = Array.isArray(data?.logos)
      ? this.toArrayImage(data.logos)
      : [];
    this.icons = Array.isArray(data?.icons)
      ? this.toArrayImage(data.icons)
      : [];
    this.animations = Array.isArray(data?.animations)
      ? this.toArrayImage(data.animations)
      : [];
    this.umlDiagrams = Array.isArray(data?.uml_diagrams)
      ? this.toArrayImage(data.uml_diagrams)
      : [];
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

  toObject(): Record<string, any> {
    return {
      logos:
        Array.isArray(this.logos) && this.logos.length > 0
          ? this.logos.map((logo) => logo.toObject())
          : [],
      icons:
        Array.isArray(this.icons) && this.icons.length > 0
          ? this.icons.map((icon) => icon.toObject())
          : [],
      animations:
        Array.isArray(this.animations) && this.animations.length > 0
          ? this.animations.map((animation) => animation.toObject())
          : [],
      uml_diagrams:
        Array.isArray(this.umlDiagrams) && this.umlDiagrams.length > 0
          ? this.umlDiagrams.map((umlDiagram) => umlDiagram.toObject())
          : [],
    };
  }
}

export default Gallery;
