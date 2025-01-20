import Model from './Model';
import Contact from './Contact';
import Image from './Image';

class ContactMethods extends Model {
  github: Contact;
  instagram: Contact;
  linkedin: Contact;
  website: Contact;
  x: Contact;
  email: Contact;
  phone: Contact;

  constructor(data: Record<string, any> = {}) {
    super();

    this.github = data?.github
      ? this.getContactGitHub(data.github)
      : this.getContactGitHub('');
    this.instagram = data?.instagram
      ? this.getContactInstagram(data?.instagram)
      : this.getContactInstagram('');
    this.linkedin = data?.linkedIn
      ? this.getContactLinkedIn(data.linkedIn)
      : this.getContactLinkedIn('');
    this.website = data?.website
      ? this.getContactWebsite(data.website)
      : this.getContactWebsite('');
    this.x = data?.x ? this.getContactX(data.x) : this.getContactX('');
    this.email = data?.email
      ? this.getContactEmail(data.email)
      : this.getContactEmail('');
    this.phone = data?.phone
      ? this.getContactPhone(data.phone)
      : this.getContactPhone('');
  }

  getContact(data: Record<string, any>) {
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

  getContactGitHub(url: string) {
    const id = 'gitHub';
    const title = 'GitHub';
    const className = 'fa fa-github fa-fw';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
    });

    return new Contact(id, title, url, image, '');
  }

  getContactInstagram(url: string) {
    const id = 'instagram';
    const title = 'Instagram';
    const className = 'fa fa-instagram fa-fw';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
    });

    return new Contact(id, title, url, image, '');
  }

  getContactWebsite(url: string) {
    const id = 'website';
    const title = 'Website';
    const className = 'fa-solid fa-globe';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
    });

    return new Contact(id, title, url, image, '');
  }

  getContactLinkedIn(url: string) {
    const id = 'linkedIn';
    const title = 'LinkedIn';
    const className = 'fa fa-linkedin fa-fw';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
    });

    return new Contact(id, title, url, image, '');
  }

  getContactX(url: string) {
    const id = 'x';
    const title = 'X';
    const className = 'fa-brands fa-x-twitter';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
    });

    return new Contact(id, title, url, image, '');
  }

  getContactEmail(value: string) {
    const id = 'email';
    const title = 'Email';
    const className = 'fa fa-envelope fa-fw';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
    });

    return new Contact(id, title, '', image, value);
  }

  getContactPhone(value: string) {
    const id = 'phone';
    const title = 'Phone';
    const className = 'fa-solid fa-phone';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
    });

    return new Contact(id, title, '', image, value);
  }
}

export default ContactMethods;
