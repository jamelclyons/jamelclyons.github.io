import Model from './Model';
import Contact from './Contact';
import Image from './Image';

class ContactMethods extends Model {
  hackerRank: Contact;
  linkedin: Contact;
  x: Contact;
  instagram: Contact;
  github: Contact;
  website: Contact;
  email: Contact;
  phone: Contact;

  constructor(data: Record<string, any>) {
    super();
    
    this.hackerRank = this.setContactHackerRank(data?.hacker_rank?.url);
    this.linkedin = this.setContactLinkedIn(data?.linkedin?.url);
    this.x = this.setContactX(data?.x?.url);
    this.instagram = this.setContactInstagram(data?.instagram?.url);
    this.github = this.setContactGitHub(data?.github?.url);
    this.website = this.setContactWebsite(data?.website?.url);
    this.email = this.setContactEmail(data?.email?.value);
    this.phone = this.setContactPhone(data?.phone?.value);
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

  fromGitHub(data: Array<Record<string, any>>) {
    if (Array.isArray(data) && data.length > 0) {
      const contactMethods: Record<string,any> = {};

      data.forEach((contact) => {
        try {
          if (!contact?.url) return;

          const url = new URL(contact.url);

          if (url.host === 'www.hackerrank.com') {
            contactMethods.hacker_rank = this.setContactHackerRank(url.href).toObject();
          }

          if (url.host === 'www.linkedin.com') {
            contactMethods.linkedin = this.setContactLinkedIn(url.href).toObject();
          }

          if (url.host === 'x.com') {
            contactMethods.x = this.setContactX(url.href).toObject();
          }

          if (url.host === 'www.instagram.com') {
            contactMethods.instagram = this.setContactInstagram(url.href).toObject();
          }
        } catch (error) {
          console.error(`Invalid URL: ${contact.url}`, error);
        }
      });

      return contactMethods;
    }

    return {};
  }

  fromDB(data: Record<string, any>) {
    if (data?.id === 'email') {
      this.email = this.setContactEmail(data.value);
    }

    if (data?.id === 'phone') {
      this.phone = this.setContactPhone(data.value);
    }
  }
}

export default ContactMethods;
