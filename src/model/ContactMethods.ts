import Model from './Model';
import Contact from './Contact';

import packageJson from '../../package.json';
import Image from './Image';

class ContactMethods extends Model {
  gitHub: Contact;
  instagram: Contact;
  linkedIn: Contact;
  x: Contact;
  email: Contact;
  phone: Contact;

  constructor(data: Record<string, any> = {}) {
    super();
    
    const { gitHub, instagram, linkedIn, x, email, phone } =
      packageJson.author.contact;

    this.gitHub = data?.gitHub || this.getContactGitHub(gitHub);
    this.instagram = data?.instagram || this.getContactInstagram(instagram);
    this.linkedIn = data?.linkedIn || this.getContactLinkedIn(linkedIn);
    this.x = data?.x || this.getContactX(x);
    this.email = data?.email || this.getContactEmail(email);
    this.phone = data?.phone || this.getContactPhone(phone);
  }

  getContact(
    id: string,
    title: string,
    url: string,
    image: Record<string, any>,
    value: string
  ) {
    const contact = {
      id: id,
      title: title,
      url: url,
      image: image,
      value: value,
    };

    return new Contact(contact);
  }

  getContactGitHub(url: string) {
    const image = new Image({ class_name: 'fa fa-github fa-fw' }).toObject();
    return this.getContact('gitHub', 'GitHub', url, image, '');
  }

  getContactInstagram(url: string) {
    const image = new Image({ class_name: 'fa fa-instagram fa-fw' }).toObject();
    return this.getContact('instagram', 'Instagram', url, image, '');
  }

  getContactLinkedIn(url: string) {
    const image = new Image({ class_name: 'fa fa-linkedin fa-fw' }).toObject();
    return this.getContact('linkedIn', 'LinkedIn', url, image, '');
  }

  getContactX(url: string) {
    const image = new Image({ class_name: 'fa-brands fa-x-twitter' }).toObject();
    return this.getContact('x', 'X', url, image, '');
  }

  getContactEmail(value: string) {
    const image = new Image({ class_name: 'fa fa-envelope fa-fw' }).toObject();
    return this.getContact('email', 'Email', '', image, value);
  }

  getContactPhone(value: string) {
    const image = new Image({ class_name: 'fa-solid fa-phone' }).toObject();
    return this.getContact('phone', 'Phone', '', image, value);
  }
}

export default ContactMethods;
