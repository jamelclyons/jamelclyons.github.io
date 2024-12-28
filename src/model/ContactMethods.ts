import Contact from './Contact';

import packageJson from '../../package.json';

class ContactMethods {
  gitHub: Contact;
  instagram: Contact;
  linkedIn: Contact;
  x: Contact;
  email: Contact;
  phone: Contact;

  constructor(data: Record<string, any> = {}) {
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
    className: string,
    src: string,
    value: string
  ) {
    const contact = {
      id: id,
      title: title,
      url: url,
      class_name: className,
      src: src,
      value: value,
    };

    return new Contact(contact);
  }

  getContactGitHub(url: string) {
    return this.getContact('gitHub', 'GitHub', url, 'fa fa-github fa-fw', '', '');
  }

  getContactInstagram(url: string) {
    return this.getContact('instagram', 'Instagram', url, 'fa fa-instagram fa-fw', '', '');
  }

  getContactLinkedIn(url: string) {
    return this.getContact('linkedIn', 'LinkedIn', url, 'fa fa-linkedin fa-fw', '', '');
  }

  getContactX(url: string) {
    return this.getContact('x', 'X', url, 'fa-brands fa-x-twitter', '', '');
  }

  getContactEmail(value: string) {
    return this.getContact('email', 'Email', '', 'fa fa-envelope fa-fw', '', value);
  }

  getContactPhone(value: string) {
    return this.getContact('phone', 'Phone', '', 'fa-solid fa-phone', '', value);
  }
}

export default ContactMethods;
