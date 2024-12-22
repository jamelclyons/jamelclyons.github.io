class Taxonomy {
  id: string;
  type: string;
  title: string;
  iconURL: string;
  className: string;

  constructor(
    id: string,
    type: string,
    title: string,
    iconURL: string,
    className: string
  ) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.iconURL = iconURL;
    this.className = className;
  }

  isValid(): boolean {
    
    if (this.id == '') {
      throw new Error('ID is not valid');
    }

    if (this.type == '') {
      throw new Error('Type is not valid');
    }

    if (this.title == '') {
      throw new Error('Title is not valid');
    }

    return true;
  }

  toObject() {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      icon_url: this.iconURL,
      class_name: this.className,
    };
  }
}

export default Taxonomy;
