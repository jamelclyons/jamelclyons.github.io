class ProjectDelivery {
  delivery: Array<string> = [];
  deliveryGallery: Array<string> = [];
  deliveryCheckList: Array<string> = [];

  constructor(data: Record<string, any> = {}) {
    this.delivery = data?.delivery || [];
    this.deliveryGallery = data?.delivery_gallery || [];
    this.deliveryCheckList = data?.delivery_check_list || [];
  }

  toObject(): Record<string, any> {
    return {
      delivery: this.delivery,
      delivery_gallery: this.deliveryGallery,
      delivery_check_list: this.deliveryCheckList,
    };
  }
}

export default ProjectDelivery;
