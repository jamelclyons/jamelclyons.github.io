import Image from "./Image";

class Gallery {
  logos: Array<Image>;
  icons: Array<Image>;
  animations: Array<Image>;
  umlDiagrams: Array<Image>;

  constructor(data: Record<string, any> = {}) {
    this.logos = data?.logos || [];
    this.icons = data?.icons || [];
    this.animations = data?.animations || [];
    this.umlDiagrams = data?.umlDiagrams || [];
  }

  toObject(): Record<string, any> {
    return {
      logos: this.logos,
      icons: this.icons,
      animations: this.animations,
      uml_diagrams: this.umlDiagrams,
    };
  }
}

export default Gallery;
