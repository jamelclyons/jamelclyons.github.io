import Model from './Model';
import Image from "./Image";

class Gallery extends Model {
  logos: Array<Image>;
  icons: Array<Image>;
  animations: Array<Image>;
  umlDiagrams: Array<Image>;

  constructor(data: Record<string, any> = {}) {
    super();

    this.logos = data?.logos || [];
    this.icons = data?.icons || [];
    this.animations = data?.animations || [];
    this.umlDiagrams = data?.umlDiagrams || [];
  }
}

export default Gallery;
