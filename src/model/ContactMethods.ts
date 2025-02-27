import Model from './Model';
import Contact, { ContactObject } from './Contact';
import Image from './Image';

import * as user from '../../user.json';

export interface ContactMethodsObject {
  hacker_rank: ContactObject;
  linked_in: ContactObject;
  x: ContactObject;
  instagram: ContactObject;
  github: ContactObject;
  youtube: ContactObject;
  website: ContactObject;
  email: ContactObject;
  phone: ContactObject;
}

class ContactMethods extends Model {
  hackerRank: Contact;
  linkedin: Contact;
  x: Contact;
  instagram: Contact;
  github: Contact;
  youtube: Contact;
  website: Contact;
  email: Contact;
  phone: Contact;

  constructor(data: Record<string, any> | ContactMethodsObject) {
    super();

    this.hackerRank = this.setContactHackerRank(data?.hacker_rank);
    this.linkedin = this.setContactLinkedIn(data?.linked_in);
    this.x = this.setContactX(data?.x);
    this.instagram = this.setContactInstagram(data?.instagram);
    this.github = this.setContactGitHub(data?.github);
    this.youtube = this.setContactYoutube(data?.youtube);
    this.website = this.setContactWebsite(data?.website);
    this.email = this.setContactEmail(data?.email);
    this.phone = this.setContactPhone(data?.phone);
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

  setContactHackerRank(data: Record<string, any>) {
    const id = 'hackerrank';
    const title = 'Hacker Rank';
    const className = data?.class_name
      ? data.class_name
      : 'fa-brands fa-hackerrank';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: data?.image?.url ?? '',
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      url: data?.url ?? '',
      value: data?.value ?? '',
    });
  }

  setContactLinkedIn(data: Record<string, any>) {
    const id = 'linkedIn';
    const title = 'LinkedIn';
    const className = data?.class_name
      ? data.class_name
      : 'fa fa-linkedin fa-fw';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: data?.image?.url ?? '',
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      url: data?.url ?? '',
      value: data?.value ?? '',
    });
  }

  setContactX(data: Record<string, any>) {
    const id = 'x';
    const title = 'X';
    const className = data?.class_name
      ? data.class_name
      : 'fa-brands fa-x-twitter';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: data?.image?.url ?? '',
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      url: data?.url ?? '',
      value: data?.value ?? '',
    });
  }

  setContactInstagram(data: Record<string, any>) {
    const id = 'instagram';
    const title = 'Instagram';
    const className = data?.class_name
      ? data.class_name
      : 'fa fa-instagram fa-fw';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: data?.image?.url ?? '',
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      url: data?.url ?? '',
      value: data?.value ?? '',
    });
  }

  setContactGitHub(data: Record<string, any>) {
    const id = 'gitHub';
    const title = 'GitHub';
    const className = data?.class_name ? data.class_name : 'fa fa-github fa-fw';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: data?.image?.url ?? '',
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      url: data?.url ?? '',
      value: data?.value ?? '',
    });
  }

  setContactYoutube(data: Record<string, any>) {
    const id = 'youtube';
    const title = 'Youtube';
    const className = data?.class_name
      ? data.class_name
      : 'fa-brands fa-youtube';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: data?.image?.url ?? '',
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      url: data?.url ?? '',
      value: data?.value ?? '',
    });
  }

  setContactWebsite(data: Record<string, any>) {
    const id = 'website';
    const title = 'Website';
    const className = data?.class_name ? data.class_name : 'fa-solid fa-globe';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: data?.image?.url ?? '',
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      url: data?.url ?? '',
      value: data?.value ?? '',
    });
  }

  setContactEmail(data: Record<string, any>) {
    const id = 'email';
    const title = 'Email';
    const className = data?.class_name
      ? data.class_name
      : 'fa fa-envelope fa-fw';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: data?.image?.url ?? '',
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      url: data?.url ?? '',
      value: data?.value ?? '',
    });
  }

  setContactPhone(data: Record<string, any>) {
    const id = 'phone';
    const title = 'Phone';
    const className = data?.class_name ? data.class_name : 'fa-solid fa-phone';
    const image = new Image({
      id: id,
      title: title,
      class_name: className,
      url: data?.image?.url ?? '',
    }).toObject();

    return this.setContact({
      id: id,
      title: title,
      image: image,
      url: data?.url ?? '',
      value: data?.value ?? '',
    });
  }

  fromGitHub(data: Array<Record<string, any>>) {
    if (Array.isArray(data) && data.length > 0) {
      const contactMethods: Record<string, any> = {};

      data.forEach((contact) => {
        try {
          if (!contact?.url) return;

          const url = new URL(contact.url);

          if (url.host === 'www.hackerrank.com') {
            contactMethods.hacker_rank = this.setContactHackerRank({
              url: url.href,
            }).toObject();
          }

          if (url.host === 'www.linkedin.com') {
            contactMethods.linkedin = this.setContactLinkedIn({
              url: url.href,
            }).toObject();
          }

          if (url.host === 'x.com') {
            contactMethods.x = this.setContactX({
              url: url.href,
            }).toObject();
          }

          if (url.host === 'www.instagram.com') {
            contactMethods.instagram = this.setContactInstagram({
              url: url.href,
            }).toObject();
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
