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

    this.logos = data?.logos || [];
    this.icons = data?.icons || [];
    this.animations = data?.animations || [];
    this.umlDiagrams = data?.umlDiagrams || [];
    this.images = [
      ...this.logos,
      ...this.icons,
      ...this.animations,
      ...this.umlDiagrams,
    ];
  }
}

export default Gallery;
