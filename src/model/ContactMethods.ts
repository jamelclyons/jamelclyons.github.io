import Model from './Model';
import Contact from './Contact';
import Image from './Image';

class ContactMethods extends Model {
  hackerrank: Contact;
  linkedin: Contact;
  x: Contact;
  instagram: Contact;
  github: Contact;
  website: Contact;
  email: Contact;
  phone: Contact;

  constructor(
    hackerrank?: string,
    linkedin?: string,
    x?: string,
    instagram?: string,
    github?: string,
    website?: string,
    email?: string,
    phone?: string
  ) {
    super();

    this.hackerrank = this.setContactHackerRank(hackerrank);
    this.linkedin = this.setContactLinkedIn(linkedin);
    this.instagram = this.setContactInstagram(instagram);
    this.x = this.setContactX(x);
    this.github = this.setContactGitHub(github);
    this.website = this.setContactWebsite(website);
    this.email = this.setContactEmail(email);
    this.phone = this.setContactPhone(phone);
  }

  setContact(data: Record<string, any>) {
    const id = data?.id ?? '';
    const title = data?.title ?? '';
    const url = data?.url ?? '';
    const image = data?.image
      ? new Image(data.image)
      : new Image({
          url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAn8B9oOKlwAAAABJRU5ErkJggg==',
        });
    const value = data?.value ?? '';

    return new Contact(id, title, url, image, value);
  }

  setContactHackerRank(url?: string) {
    const id = 'hackerrank';
    const title = 'Hacker Rank';
    const className = 'fa-brands fa-hackerrank';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      url: url,
    });
  }

  setContactLinkedIn(url?: string) {
    const id = 'linkedIn';
    const title = 'LinkedIn';
    const className = 'fa fa-linkedin fa-fw';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      url: url,
    });
  }

  setContactX(url?: string) {
    const id = 'x';
    const title = 'X';
    const className = 'fa-brands fa-x-twitter';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      url: url,
    });
  }

  setContactInstagram(url?: string) {
    const id = 'instagram';
    const title = 'Instagram';
    const className = 'fa fa-instagram fa-fw';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      url: url,
    });
  }

  setContactGitHub(url?: string) {
    const id = 'gitHub';
    const title = 'GitHub';
    const className = 'fa fa-github fa-fw';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      url: url,
    });
  }

  setContactWebsite(url?: string) {
    const id = 'website';
    const title = 'Website';
    const className = 'fa-solid fa-globe';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      url: url,
    });
  }

  setContactEmail(value?: string) {
    const id = 'email';
    const title = 'Email';
    const className = 'fa fa-envelope fa-fw';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      value: value,
    });
  }

  setContactPhone(value?: string) {
    const id = 'phone';
    const title = 'Phone';
    const className = 'fa-solid fa-phone';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      value: value,
    });
  }
}

export default ContactMethods;
