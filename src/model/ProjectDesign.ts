class ProjectDesign {
  design: Array<string> = [];
  designCheckList: Array<string> = [];
  designGallery: Array<string> = [];
  colorsList: Array<string> = [];

  constructor(data: Record<string, any> = {}) {
    this.design = data?.design || [];
    this.designCheckList = data?.design_check_list || [];
    this.designGallery = data?.design_gallery || [];
    this.colorsList = data?.colors_list || [];
  }

  toObject(): Record<string, any> {
    return {
      design: this.design,
      design_check_list: this.designCheckList,
      design_gallery: this.designGallery,
      colors_list: this.colorsList
    };
  }
}

export default ProjectDesign;
